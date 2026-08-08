import logging
import os
from io import BytesIO

import numpy as np
import tensorflow as tf
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("fasalsathi")

app = FastAPI(title="FasalSathi API", version="2.0")

# Configure the deployed frontend origin through ALLOWED_ORIGINS.
# A wildcard keeps local development simple; production deployments should set
# this environment variable to the actual frontend origin(s).
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

CLASS_NAMES = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy",
    "Grape___Black_rot", "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy",
    "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
    "Raspberry___healthy", "Soybean___healthy", "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite", "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy",
]

MODEL_PATH = os.getenv("MODEL_PATH", "crop_disease_model.h5")
IMAGE_SIZE = (128, 128)
LOW_CONFIDENCE_THRESHOLD = 0.55
MAX_SIZE_MB = 8

MODEL = None


@app.on_event("startup")
async def load_model():
    global MODEL
    if not os.path.exists(MODEL_PATH):
        logger.error("Model file not found at %s", MODEL_PATH)
        return
    try:
        MODEL = tf.keras.models.load_model(MODEL_PATH)
        logger.info("Model loaded successfully")
    except Exception:
        logger.exception("Failed to load model")


@app.get("/")
async def root():
    return {"status": "ok", "service": "FasalSathi API", "model_loaded": MODEL is not None}


@app.get("/health")
async def health():
    return {
        "status": "healthy" if MODEL is not None else "degraded",
        "model_loaded": MODEL is not None,
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if MODEL is None:
        raise HTTPException(status_code=503, detail="Model is not loaded on the server yet.")

    allowed_types = {"image/jpeg", "image/png", "image/jpg", "image/webp"}
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Please upload a JPG, PNG, or WEBP image.")

    contents = await file.read()
    if len(contents) > MAX_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=400, detail=f"Image too large. Max size is {MAX_SIZE_MB}MB.")

    try:
        image = Image.open(BytesIO(contents)).convert("RGB")
    except UnidentifiedImageError as exc:
        raise HTTPException(status_code=400, detail="Could not read this file as an image.") from exc

    try:
        image = image.resize(IMAGE_SIZE)
        # The training pipeline expects raw 0-255 pixel values, so no /255 scaling here.
        image_batch = np.expand_dims(np.array(image), axis=0)

        predictions = MODEL.predict(image_batch, verbose=0)[0]
        top_idx = int(np.argmax(predictions))
        confidence = float(predictions[top_idx])
        predicted_class = CLASS_NAMES[top_idx]

        top3_idx = np.argsort(predictions)[-3:][::-1]
        top3 = [
            {"class": CLASS_NAMES[i], "confidence": float(predictions[i])}
            for i in top3_idx
        ]

        return {
            "class": predicted_class,
            "confidence": confidence,
            "low_confidence": confidence < LOW_CONFIDENCE_THRESHOLD,
            "top3": top3,
        }
    except Exception as exc:
        logger.exception("Prediction failed")
        raise HTTPException(status_code=500, detail="Prediction failed") from exc


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 7860))
    uvicorn.run(app, host="0.0.0.0", port=port)
