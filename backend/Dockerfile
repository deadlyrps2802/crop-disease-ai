# Use a lightweight Python version
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /code

# Copy the requirements file first (for caching)
COPY ./requirements.txt /code/requirements.txt

# Install dependencies
# We use --no-cache-dir to keep the image small
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the rest of your backend code and the model
COPY . .

# Set permissions (required for Hugging Face)
RUN chmod -R 777 /code

# Start the server on port 7860 (Hugging Face default)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]