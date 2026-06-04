from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

# ── Load models once at startup ──────────────────────────────────────────────
print("Loading ML models...")

with open(os.path.join(MODEL_DIR, "tfidf_vec.pkl"), "rb") as f:
    tfidf_vec = pickle.load(f)

with open(os.path.join(MODEL_DIR, "mlb_fix.pkl"), "rb") as f:
    mlb = pickle.load(f)

with open(os.path.join(MODEL_DIR, "keywords.pkl"), "rb") as f:
    keywords = pickle.load(f)

with open(os.path.join(MODEL_DIR, "vectorizer_fix.pkl"), "rb") as f:
    vectorizer_fix = pickle.load(f)

# Load Keras model
try:
    import tensorflow as tf
    keras_model = tf.keras.models.load_model(
        os.path.join(MODEL_DIR, "skill_recommender_v1.keras")
    )
    print("Keras model loaded successfully.")
    KERAS_AVAILABLE = True
except Exception as e:
    print(f"Warning: Could not load Keras model: {e}")
    KERAS_AVAILABLE = False

print("All models loaded!")


# ── Helper ────────────────────────────────────────────────────────────────────
def predict_skills(job_description: str, top_n: int = 10):
    """Return a list of recommended skill strings for the given job description."""
    # Vectorize using tfidf_vec
    try:
        X = tfidf_vec.transform([job_description])
    except Exception:
        X = vectorizer_fix.transform([job_description])

    if KERAS_AVAILABLE:
        # Use deep learning model
        proba = keras_model.predict(X.toarray(), verbose=0)[0]
        # Get top-N skill indices
        top_indices = np.argsort(proba)[::-1][:top_n]
        threshold = 0.1
        skills = [
            mlb.classes_[i]
            for i in top_indices
            if proba[i] >= threshold
        ]
        if not skills:
            skills = [mlb.classes_[i] for i in top_indices[:5]]
        confidences = [float(proba[i]) for i in top_indices[:len(skills)]]
    else:
        # Fallback: keyword extraction from description
        desc_lower = job_description.lower()
        kw_list = keywords if isinstance(keywords, list) else list(keywords)
        skills = [kw for kw in kw_list if kw.lower() in desc_lower][:top_n]
        confidences = [1.0] * len(skills)

    return [
        {"skill": s, "confidence": round(c * 100, 1)}
        for s, c in zip(skills, confidences)
    ]


# ── Routes ────────────────────────────────────────────────────────────────────
@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "MyJobTrend ML API is running!", "status": "ok"})


@app.route("/api/predict", methods=["POST"])
def predict():
    """
    Body JSON:
      { "job_description": "...", "top_n": 10 }
    Returns:
      { "skills": [{ "skill": "Python", "confidence": 92.3 }, ...] }
    """
    data = request.get_json(silent=True)
    if not data or "job_description" not in data:
        return jsonify({"error": "Field 'job_description' is required"}), 400

    job_description = data["job_description"].strip()
    if not job_description:
        return jsonify({"error": "job_description cannot be empty"}), 400

    top_n = int(data.get("top_n", 10))

    try:
        skills = predict_skills(job_description, top_n=top_n)
        return jsonify({"skills": skills, "total": len(skills)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/keywords", methods=["GET"])
def get_keywords():
    """Return the list of all known skill keywords."""
    kw_list = keywords if isinstance(keywords, list) else list(keywords)
    return jsonify({"keywords": kw_list, "total": len(kw_list)})


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "keras_model": KERAS_AVAILABLE,
        "models_loaded": True
    })


if __name__ == "__main__":
    port = int(os.environ.get("ML_PORT", 5001))
    print(f"Starting ML API on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=False)
