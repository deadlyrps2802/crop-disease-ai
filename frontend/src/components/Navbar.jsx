import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ onNavigate }) => {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <nav className="navbar">
      {/* Reduced gap between logo icon and text to 6px */}
      <div className="nav-brand" style={{ gap: '6px' }}>
        <span className="logo-icon">🌾</span> 
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Translated Brand Name */}
            <span className="brand-name">
              {language === 'en' ? "FasalSathi" : "फसलसाथी"}
            </span>
            {/* Removed negative margin to maintain a little bit of space between lines */}
            <span style={{ fontSize: '0.75rem', fontWeight: '400', color: '#4b5563', marginTop: '0px' }}>
                {language === 'en' ? "Kisan ka Bharosa" : "किसान का भरोसा"}
            </span>
        </div>
      </div>
      
      <div className="nav-links">
        <a href="#" onClick={() => onNavigate('home')}>{t.home}</a>
        <a href="#" onClick={() => onNavigate('weather')}>{t.weather}</a>
        <a href="#" onClick={() => onNavigate('detect')} className="active-link">{t.detect}</a>
        <a href="#" onClick={() => onNavigate('about')}>{t.about}</a>
      </div>

      <div className="nav-actions">
        {/* Language Toggle Button */}
        <button 
          onClick={toggleLanguage}
          style={{ 
            marginRight: '10px', 
            padding: '8px 16px', 
            borderRadius: '20px', 
            border: '1px solid #10b981', 
            background: 'white', 
            color: '#10b981', 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {language === 'en' ? "🇮🇳 HI" : "🇬🇧 EN"}
        </button>

        <button className="download-btn">{t.download}</button>
      </div>
    </nav>
  );
};

export default Navbar;