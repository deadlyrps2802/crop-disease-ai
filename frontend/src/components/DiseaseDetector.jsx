import React, { useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

// 1. Hindi Translation Dictionary for Disease Names
const HINDI_DISEASE_NAMES = {
  'Apple___Apple_scab': "सेब - पपड़ी रोग (Apple Scab)",
  'Apple___Black_rot': "सेब - काला सड़न (Black Rot)",
  'Apple___Cedar_apple_rust': "सेब - देवदार रतुआ (Cedar Apple Rust)",
  'Apple___healthy': "सेब - स्वस्थ (Healthy)",
  'Blueberry___healthy': "ब्लूबेरी - स्वस्थ (Healthy)",
  'Cherry_(including_sour)___Powdery_mildew': "चेरी - चूर्णिल आसिता (Powdery Mildew)",
  'Cherry_(including_sour)___healthy': "चेरी - स्वस्थ (Healthy)",
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': "मक्का - ग्रे लीफ स्पॉट (Gray Leaf Spot)",
  'Corn_(maize)___Common_rust_': "मक्का - सामान्य रतुआ (Common Rust)",
  'Corn_(maize)___Northern_Leaf_Blight': "मक्का - उत्तरी झुलसा (Northern Leaf Blight)",
  'Corn_(maize)___healthy': "मक्का - स्वस्थ (Healthy)",
  'Grape___Black_rot': "अंगूर - काला सड़न (Black Rot)",
  'Grape___Esca_(Black_Measles)': "अंगूर - एस्का (Black Measles)",
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': "अंगूर - पत्ती झुलसा (Leaf Blight)",
  'Grape___healthy': "अंगूर - स्वस्थ (Healthy)",
  'Orange___Haunglongbing_(Citrus_greening)': "संतरा - साइट्रस ग्रीनिंग (Citrus Greening)",
  'Peach___Bacterial_spot': "आड़ू - जीवाणु धब्बा (Bacterial Spot)",
  'Peach___healthy': "आड़ू - स्वस्थ (Healthy)",
  'Pepper,_bell___Bacterial_spot': "मिर्च - जीवाणु धब्बा (Bacterial Spot)",
  'Pepper,_bell___healthy': "मिर्च - स्वस्थ (Healthy)",
  'Potato___Early_blight': "आलू - अगेती झुलसा (Early Blight)",
  'Potato___Late_blight': "आलू - पछेती झुलसा (Late Blight)",
  'Potato___healthy': "आलू - स्वस्थ (Healthy)",
  'Raspberry___healthy': "रास्पबेरी - स्वस्थ (Healthy)",
  'Soybean___healthy': "सोयाबीन - स्वस्थ (Healthy)",
  'Squash___Powdery_mildew': "कद्दू - चूर्णिल आसिता (Powdery Mildew)",
  'Strawberry___Leaf_scorch': "स्ट्रॉबेरी - पत्ती झुलसा (Leaf Scorch)",
  'Strawberry___healthy': "स्ट्रॉबेरी - स्वस्थ (Healthy)",
  'Tomato___Bacterial_spot': "टमाटर - जीवाणु धब्बा (Bacterial Spot)",
  'Tomato___Early_blight': "टमाटर - अगेती झुलसा (Early Blight)",
  'Tomato___Late_blight': "टमाटर - पछेती झुलसा (Late Blight)",
  'Tomato___Leaf_Mold': "टमाटर - लीफ मोल्ड (Leaf Mold)",
  'Tomato___Septoria_leaf_spot': "टमाटर - सेप्टोरिया लीफ स्पॉट",
  'Tomato___Spider_mites Two-spotted_spider_mite': "टमाटर - मकड़ी के घुन (Spider Mites)",
  'Tomato___Target_Spot': "टमाटर - टारगेट स्पॉट (Target Spot)",
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus': "टमाटर - पीला पत्ता मरोड़ वायरस",
  'Tomato___Tomato_mosaic_virus': "टमाटर - मोज़ेक वायरस",
  'Tomato___healthy': "टमाटर - स्वस्थ (Healthy)"
};

const DiseaseDetector = ({ onBack }) => {
  const { t, language } = useLanguage(); // Get language state
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:8000/predict";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Backend not connected! Make sure uvicorn is running.");
    } finally {
      setLoading(false);
    }
  };

  // Helper: Returns Hindi name if language is 'hi', otherwise returns formatted English name
  const getDiseaseName = (rawName) => {
    if (language === 'hi' && HINDI_DISEASE_NAMES[rawName]) {
      return HINDI_DISEASE_NAMES[rawName];
    }
    // Default English formatting (removes underscores)
    return rawName.replace(/___/g, " - ").replace(/_/g, " ");
  };

  return (
    <div className="detector-page-container">
      <button className="back-btn" onClick={onBack}>{t.backHome}</button>
      
      <div className="detector-section">
        <div className="section-header">
          <h2>{t.detTitle}</h2>
          <p>{t.detSubtitle}</p>
        </div>

        <div className="detector-card">
          <div className="upload-area">
            <input 
              type="file" 
              id="file-upload" 
              className="file-input" 
              onChange={handleFileChange} 
              accept="image/*" 
            />
            <label htmlFor="file-upload" className="upload-label">
              {preview ? (
                <img src={preview} alt="Preview" className="preview-img" />
              ) : (
                <div className="upload-placeholder">
                  <span className="icon">📷</span>
                  <span>{t.uploadText}</span>
                </div>
              )}
            </label>
          </div>

          {selectedFile && (
            <button className="analyze-btn" onClick={handleUpload} disabled={loading}>
              {loading ? t.analyzing : t.analyzeBtn}
            </button>
          )}

          {result && (
            <div className="result-box">
              <div className="result-header">
                {/* 2. UPDATED DISPLAY LOGIC */}
                <h3>{getDiseaseName(result.class)}</h3>
                
                <span className="confidence">{(result.confidence * 100).toFixed(1)}% Match</span>
              </div>
              <div className="cure-panel">
                <h4>{t.cureLabel}</h4>
                <p>
                  {t.cures[result.class] || "Please consult a local agricultural expert."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetector;