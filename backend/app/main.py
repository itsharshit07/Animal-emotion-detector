from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as keras_image
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Allow CORS from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1️⃣ Load the Keras model once at startup
MODEL_PATH = "model/emotion_model.keras"
model = load_model(MODEL_PATH)
model.make_predict_function()  # optional, may speed up first inference

# 2️⃣ Labels must match your training order
LABELS = ["Angry", "Other", "Sad", "Happy"]

def preprocess(img: Image.Image) -> np.ndarray:
    """Resize to 224×224, convert to array, normalize, and add batch dim."""
    img = img.resize((224, 224))
    arr = keras_image.img_to_array(img)          # shape: (224,224,3)
    arr = arr / 255.0                            # normalize to [0,1]
    return np.expand_dims(arr, axis=0)           # shape: (1,224,224,3)

@app.post("/predict")
async def predict_emotion(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "File is not an image")
    contents = await file.read()
    try:
        img = Image.open(io.BytesIO(contents)).convert("RGB")
    except:
        raise HTTPException(400, "Invalid image file")
    
    x = preprocess(img)
    preds = model.predict(x)[0]                  # e.g. [0.1,0.7,0.05,0.15]
    idx = int(np.argmax(preds))
    return {
        "emotion": LABELS[idx],
        "confidence": float(preds[idx])
    }
