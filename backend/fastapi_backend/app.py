from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import torch
import numpy as np
from utils import EEGClassifier

app = FastAPI()

model_path = './model/cnngru.pt'  
classifier = EEGClassifier(model_path)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        raw_data = np.loadtxt(file.file, delimiter=',')
        if raw_data.shape[1] != 59:
            raw_data = raw_data.T

        predicted_class, probabilities, selected_class = classifier.predict(raw_data)

        prediction = "Parkinson's Detected" if predicted_class == 1 else "Healthy"

        return JSONResponse(content={
            "prediction": prediction,
            "confidence": selected_class
        })

    except Exception as e:
        return JSONResponse(
            content={"error": "Prediction failed", "detail": str(e)},
            status_code=500
        )
