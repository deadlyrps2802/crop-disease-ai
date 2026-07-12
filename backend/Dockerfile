# Lightweight Python base
FROM python:3.10-slim

WORKDIR /code

# Install dependencies first for better layer caching
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy backend code + model
# IMPORTANT: crop_disease_model.h5 must be placed in this folder before building/deploying
COPY . .

RUN chmod -R 777 /code

# Hugging Face Spaces expects port 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
