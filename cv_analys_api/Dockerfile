# CV Analyzer — Dockerfile
# Python 3.11.9 | TF 2.20.0 | Keras 3.14.1
# Target: Hugging Face Spaces (Docker Space)

FROM python:3.11.9-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    TF_USE_LEGACY_KERAS=0 \
    TF_ENABLE_ONEDNN_OPTS=0 \
    TF_CPP_MIN_LOG_LEVEL=2 \
    PORT=7860

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    libglib2.0-0 \
    libgl1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Working directory
WORKDIR /app

# Install Python dependencies
# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip

# Install numpy first before TensorFlow (order is important)
RUN pip install --no-cache-dir numpy==1.26.4

# Install TensorFlow CPU
RUN pip install --no-cache-dir tensorflow-cpu==2.20.0

# Install Keras corresponding to the training environment
RUN pip install --no-cache-dir keras==3.14.1 tf_keras==2.20.0

# Install PaddlePaddle
RUN pip install --no-cache-dir paddlepaddle==3.0.0

# Install remaining requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY app.py .
COPY artifacts/ ./artifacts/

# Expose port
EXPOSE 7860

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=3 \
    CMD curl -f http://localhost:7860/health || exit 1

# Entry point
CMD ["python", "app.py"]
