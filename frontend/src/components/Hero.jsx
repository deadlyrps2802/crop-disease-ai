import React from 'react';
import { useLanguage } from '../context/LanguageContext';

import farmerImg from '../assets/hero-farmer.jpg';

const Hero = ({ onStart }) => {
  // Destructure 'language' as well to check for en/hi
  const { t, language } = useLanguage(); 

  return (
    <section className="hero-section">
      {/* LEFT SIDE: Content */}
      <div className="hero-content">
        
        {/* 1. Animated Gradient Title (Translated) */}
        <div className="typing-wrapper">
          <h1 
            className="typing-text" 
            // FIX: Inline styles to override CSS clipping/animation issues
            style={{ 
              width: 'fit-content', 
              overflow: 'visible', 
              animation: 'none', 
              borderRight: 'none',
              paddingRight: '15px' // Adds spacing so the last letter isn't cut by the gradient box
            }}
          >
            {language === 'en' ? "FasalSathi" : "फसलसाथी"}
          </h1>
        </div>

        {/* 2. Tagline */}
        <p className="tagline">{t.tagline}</p>
        
        {/* 3. Main Headline */}
        <h1 className="main-headline">
          {t.heroTitle} <br/> <span className="highlight">{t.heroHighlight}</span>
        </h1>
        
        {/* 4. Description */}
        <p className="description">
          {t.heroDesc}
        </p>
        
        {/* 5. Buttons */}
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={onStart}>
             {t.btnDetect}
          </button>
          <button className="btn btn-outline-green">
             {t.btnExplore}
          </button>
          <button className="btn btn-outline-blue">
             {t.btnDownload}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Image */}
      <div className="hero-image">
        <img 
          src={farmerImg} 
          alt="Indian Farmer using AI"
          // This style fixes the clipping/cropping issue
          style={{ objectFit: 'contain' }} 
        />
      </div>
    </section>
  );
};

export default Hero;