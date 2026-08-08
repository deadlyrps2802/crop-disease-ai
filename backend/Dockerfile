FROM python:3.10-slim

WORKDIR /code

# Install dependencies first for better Docker layer caching.
COPY requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy backend code and the Git-LFS model artifact.
COPY . .

# Hugging Face Spaces / container runtime port.
EXPOSE 7860

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
