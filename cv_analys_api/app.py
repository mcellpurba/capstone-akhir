"""
CV Analyzer — Flask REST API
Gap Analysis berbasis model BiLSTM + Attention (IT Skill Recommender)

Endpoint:
  POST /analyze  → upload PDF, return JSON gap analysis
  GET  /health   → {"status": "ok", "message": "CV Analyzer API is running"}
"""

import os
import sys

# Set environment variables before tensorflow/keras imports
os.environ['TF_USE_LEGACY_KERAS'] = '0'

import logging
import pickle
import re

import fitz  # PyMuPDF
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import joblib
import keras
import numpy as np
from paddleocr import PaddleOCR
import tensorflow as tf


# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)

# Custom class & loss required for loading the model
@keras.saving.register_keras_serializable(package="SkillRec")
class AttentionLayer(keras.layers.Layer):
    def __init__(self, **kwargs):
        super(AttentionLayer, self).__init__(**kwargs)

    def call(self, inputs):
        attention_weights = tf.nn.softmax(inputs, axis=1)
        return tf.reduce_sum(attention_weights * inputs, axis=1)

    def get_config(self):
        return super().get_config()


@tf.keras.utils.register_keras_serializable(package="SkillRec")
def weighted_bce(y_true, y_pred):
    y_true = tf.cast(y_true, tf.float32)
    bce    = tf.keras.backend.binary_crossentropy(y_true, y_pred)
    return tf.reduce_mean((y_true * 8.0 + (1 - y_true)) * bce)


# Load model artifacts
ARTIFACTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "artifacts")

logger.info("Memuat artifacts dari %s ...", ARTIFACTS_DIR)

# Import normalize_job from artifacts/normalize_job_fn.py
sys.path.insert(0, ARTIFACTS_DIR)
from normalize_job_fn import KEYWORDS, KEYWORD_TO_CANONICAL, normalize_job

model = keras.models.load_model(
    os.path.join(ARTIFACTS_DIR, "skill_recommender_v1.keras")
)
mlb = joblib.load(os.path.join(ARTIFACTS_DIR, "mlb_fix.pkl"))

with open(os.path.join(ARTIFACTS_DIR, "vectorizer_fix.pkl"), "rb") as _f:
    vectorizer = pickle.load(_f)

MLB_CLASSES = set(mlb.classes_)
logger.info("Model loaded — %d output labels", len(mlb.classes_))
logger.info("Sample classes: %s", list(mlb.classes_[:5]))


# Alias dictionary mapping abbreviations to full skill names
def build_alias_dict(classes):
    """Generate alias dictionary from classes and manual abbreviation mappings."""
    alias = {}
    for skill in classes:
        s = skill.lower().strip()
        alias[s.replace(" ", "")]  = skill   # machinelearning → machine learning
        alias[s.replace(" ", ".")] = skill   # node.js          → node js
        alias[s.replace(" ", "-")] = skill   # machine-learning → machine learning
        if not s.endswith("js"):
            alias[s.replace(" ", "") + "js"] = skill  # reactjs → react

    manual = {
        "k8s": "kubernetes",
        "tf":  "tensorflow",
        "py":  "python",
        "js":  "javascript",
        "ts":  "typescript",
        "cv":  "computer vision",
        "ml":  "machine learning",
        "dl":  "deep learning",
        "nlp": "natural language processing",
    }
    for abbr, full in manual.items():
        if full in MLB_CLASSES:
            alias[abbr] = full

    return alias


ALIAS_DICT = build_alias_dict(mlb.classes_)
logger.info("Alias dict: %d entri", len(ALIAS_DICT))


# PaddleOCR lazy initialization
_ocr_engine = None


def get_ocr_engine():
    global _ocr_engine
    if _ocr_engine is None:
        logger.info("Inisialisasi PaddleOCR (pertama kali)...")
        _ocr_engine = PaddleOCR(use_angle_cls=True, lang="en", show_log=False)
        logger.info("PaddleOCR siap.")
    return _ocr_engine

def clean_cv_text(text: str) -> str:
    """Clean PDF text artifacts before skill detection."""
    # Remove spaces between single characters (e.g. P y t h o n -> Python)
    text = re.sub(r'\b([a-zA-Z])\s+(?=[a-zA-Z]\b)', r'\1', text)
    # Normalize multiple whitespaces
    text = re.sub(r'[ \t]+', ' ', text)
    # Normalize consecutive newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text


# Skill detection
def detect_skills_from_text(text: str) -> set:
    """Detect skills using exact matching and alias mapping."""
    text_lower = text.lower()
    found = set()

    # Match direct classes
    for skill in mlb.classes_:
        pattern = r"\b" + re.escape(skill.lower()) + r"\b"
        if re.search(pattern, text_lower):
            found.add(skill)

    # Match aliases
    for alias, canonical in ALIAS_DICT.items():
        pattern = r"\b" + re.escape(alias) + r"\b"
        if re.search(pattern, text_lower):
            found.add(canonical)

    return found


# PDF text extraction
def read_pdf(pdf_bytes: bytes) -> str:
    """Extract text from PDF bytes with OCR fallback for scanned pages."""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    all_text = []

    for page in doc:
        text = page.get_text().strip()
        if text:
            all_text.append(text)
        else:
            # If scanned, render page to image and use OCR
            try:
                ocr_engine = get_ocr_engine()
                pix    = page.get_pixmap(dpi=200)
                img    = np.frombuffer(pix.samples, dtype=np.uint8).reshape(
                    pix.h, pix.w, pix.n
                )
                result = ocr_engine.ocr(img, cls=True)
                if result and result[0]:
                    page_text = " ".join([line[1][0] for line in result[0]])
                    all_text.append(page_text)
            except Exception as exc:
                logger.warning("OCR halaman %d: %s", page.number + 1, exc)

    doc.close()
    return "\n".join(all_text)


# Job title detection
def detect_job_title(text: str) -> str:
    lines = [l.strip() for l in text.split("\n") if l.strip()]

    # Patterns to exclude non-job titles (contact info, links, etc.)
    NOISE_PATTERN = re.compile(
        r"@|http|www"
        r"|\+\d{3}"          
        r"|\d{5,}"           
        r"|linkedin\.com|github\.com|gitlab\.com"
        r"|\bemail\s*:|e-mail\s*:"
        r"|^(address|alamat|telp?|phone|fax)\s*:",
        re.IGNORECASE
    )

    # Attempt to extract job title from explicit headers
    header_patterns = [
        r"(?:objective|position applied|applying for|target role|posisi yang dilamar)"
        r"[:\-–]?\s*(.+)",
        r"(?:as a|sebagai)\s+([\w\s/]+(?:engineer|developer|analyst|scientist|"
        r"designer|manager|architect|consultant|administrator|specialist|lead|officer))",
        r"([\w\s/]+(?:engineer|developer|analyst|scientist|designer|manager|architect|"
        r"consultant|administrator|specialist|lead|officer))\s+with\s+\d+",
    ]

    for line in lines[:25]:
        for pat in header_patterns:
            m = re.search(pat, line, re.IGNORECASE)
            if m:
                candidate = m.group(1).strip().rstrip(".,;")
                if 3 < len(candidate) < 60 and not NOISE_PATTERN.search(candidate):
                    norm = normalize_job(candidate)
                    if norm:
                        return norm
                    return candidate

    # Attempt normalization mapping directly on first few lines
    for line in lines[:25]:
        if 3 < len(line) < 70 and not NOISE_PATTERN.search(line):
            norm = normalize_job(line)
            if norm is not None:
                return norm

    # Search for IT keywords directly in early lines
    for line in lines[:30]:
        if NOISE_PATTERN.search(line):
            continue
        for kw in KEYWORDS:
            if re.search(r"\b" + re.escape(kw.lower()) + r"\b", line.lower()):
                return kw

    # Fallback to lines matching general job keywords
    for line in lines[1:10]:
        if 3 < len(line) < 50 and not NOISE_PATTERN.search(line):
            if re.search(r"developer|engineer|analyst|scientist|designer|manager|architect|programmer|tester|support|specialist|admin", line, re.IGNORECASE):
                norm = normalize_job(line)
                if norm:
                    return norm
                return line

    return ""

# Skill prediction
def predict_skills_for_job(job_norm: str, threshold: float = 0.40, top_n: int = 10):
    """Predict skills using the loaded BiLSTM model."""
    canonical_job = KEYWORD_TO_CANONICAL.get(job_norm, job_norm)
    
    pred     = model.predict(tf.constant([canonical_job]), verbose=0)[0]

    p_min, p_max = pred.min(), pred.max()
    pred_cal = (pred - p_min) / (p_max - p_min) if p_max > p_min else pred

    top_idx = np.argsort(pred_cal)[::-1]
    results = [mlb.classes_[i] for i in top_idx if pred_cal[i] >= threshold]

    if len(results) < 5:
        results = [mlb.classes_[i] for i in top_idx[:5]]

    return results[:top_n]


# Gap analysis
def run_gap_analysis(cv_skills: set, model_skills: list) -> dict:
    model_set  = set(model_skills)
    matched    = cv_skills & model_set
    gap        = model_set - cv_skills
    bonus      = cv_skills - model_set
    match_rate = len(matched) / len(model_set) * 100 if model_set else 0.0

    return {
        "matched":              sorted(matched),
        "gap":                  sorted(gap)[:5],
        "bonus":                sorted(bonus),
        "match_rate":           round(match_rate, 1),
        "cv_skills_count":      len(cv_skills),
        "market_skills_count":  len(model_set),
    }

# Flask application setup
app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def index():
    return send_from_directory(".", "index.html")

MAX_UPLOAD_MB = 10
app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_MB * 1024 * 1024


@app.errorhandler(413)
def request_entity_too_large(_error):
    return jsonify({
        "status":  "error",
        "message": f"File terlalu besar. Maksimal {MAX_UPLOAD_MB}MB.",
    }), 413


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "CV Analyzer API is running"})


@app.route("/analyze", methods=["POST"])
def analyze():
    # Validate input file
    if "file" not in request.files:
        return jsonify({
            "status":  "error",
            "message": "Tidak ada file yang diupload. Gunakan field name 'file'.",
        }), 400

    uploaded_file = request.files["file"]

    if not uploaded_file.filename.lower().endswith(".pdf"):
        return jsonify({
            "status":  "error",
            "message": "Hanya file PDF yang didukung.",
        }), 400

    pdf_bytes = uploaded_file.read()
    if len(pdf_bytes) == 0:
        return jsonify({
            "status":  "error",
            "message": "File PDF kosong.",
        }), 400

    try:
        # Read CV text from PDF
        logger.info("Membaca PDF (%d bytes)...", len(pdf_bytes))
        cv_text = read_pdf(pdf_bytes)
        cv_text = clean_cv_text(cv_text)
        logger.info("Teks terbaca: %d karakter", len(cv_text))

        if len(cv_text) < 50:
            return jsonify({
                "status":  "error",
                "message": (
                    "Teks CV sangat pendek atau tidak dapat dibaca. "
                    "Pastikan PDF tidak kosong, rusak, atau terenkripsi."
                ),
            }), 422

        # Detect job title
        job_target = detect_job_title(cv_text)
        logger.info("Job title terdeteksi: '%s'", job_target)

        if not job_target:
            return jsonify({
                "status":  "error",
                "message": "Tidak dapat mendeteksi job title dari CV.",
            }), 422
        job_norm = normalize_job(job_target)
        if job_norm is None:
            return jsonify({
                "status":  "warning",
                "job_target": job_target,
                "message": f"Job title '{job_target}' tidak dikenali sebagai posisi IT. CV Analyzer ini hanya mendukung posisi IT seperti Data Analyst, Backend Developer, DevOps Engineer, dll.",
            }), 200
        # Detect CV skills
        cv_skills = detect_skills_from_text(cv_text)
        logger.info("CV skills (%d): %s", len(cv_skills), sorted(cv_skills)[:10])

        # Predict market skills
        model_skills = predict_skills_for_job(job_norm)
        logger.info("Job normalized: '%s' | Market skills (%d): %s",
                    job_norm, len(model_skills), model_skills[:8])

        # Perform gap analysis
        result = run_gap_analysis(cv_skills, model_skills)

        return jsonify({
            "status":               "success",
            "job_target":           job_target,
            "job_normalized":       job_norm,
            "match_rate":           result["match_rate"],
            "cv_skills_count":      result["cv_skills_count"],
            "market_skills_count":  result["market_skills_count"],
            "matched":              result["matched"],
            "gap":                  result["gap"],
            "bonus":                result["bonus"],
        })

    except Exception as exc:
        logger.exception("Error saat /analyze")
        return jsonify({"status": "error", "message": str(exc)}), 500
    
@app.route("/debug/job", methods=["POST"])
def debug_job():
    data = request.get_json()
    text = data.get("text", "")
    job  = detect_job_title(text)
    norm = normalize_job(job) if job else None
    return jsonify({"detected": job, "normalized": norm, "lines": text.split("\n")[:10]})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    logger.info("Menjalankan Flask di http://0.0.0.0:%d ...", port)
    app.run(host="0.0.0.0", port=port, debug=False)
