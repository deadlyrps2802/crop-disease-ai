# 🌾 AI-Powered Crop Disease Prediction System

### **Project Overview**
This project is an end-to-end Deep Learning application designed to help farmers and agronomists identify plant diseases instantly. By uploading an image of a plant leaf, the system uses a **Convolutional Neural Network (CNN)** to diagnose the disease and provide actionable advice. This tool aims to reduce crop loss and promote sustainable farming practices.

### **Key Features**
* **Instant Diagnosis:** High-accuracy disease detection using a custom-trained CNN model (`crop_disease_model.h5`).
* **Multilingual Support:** Localized interface (Hindi/English) to ensure accessibility for farmers in diverse regions.
* **Comprehensive Tool Suite:**
    * **Plant Doctor:** Core AI diagnosis tool for leaf analysis.
    * **Crop Advisor:** General farming tips and best practices.
    * **Budget Planner:** Helps farmers track and manage seasonal expenses.
* **FastAPI Backend:** A high-performance API for seamless model inference.
* **Modern React UI:** Responsive dashboard built with Vite for a fast user experience.

---

### **Tech Stack**
* **Frontend:** React.js, Vite, Tailwind CSS, Context API.
* **Backend:** Python, FastAPI, Uvicorn.
* **AI/ML:** TensorFlow/Keras (CNN), NumPy, OpenCV.
* **Data Storage:** Git LFS (used for versioning the large `.h5` model file).

---

### **Project Structure**
```text
MINI_PROJECT/
├── backend/                # FastAPI Server & AI Model
│   ├── crop_disease_model.h5
│   ├── main.py
│   └── requirements.txt
├── frontend/               # React (Vite) Application
│   ├── src/components/     # AdvisorTools, Navbar, etc.
│   ├── src/context/        # Language & State management
│   └── package.json
└── README.md
