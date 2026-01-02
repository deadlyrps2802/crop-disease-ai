import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const CTASection = ({ onStart }) => {
  const { t } = useLanguage();

  return (
    <section className="cta-section">
      <div className="cta-content">
        {/* Dynamic Title */}
        <h2>{t.ctaTitle} <span className="highlight-green">{t.ctaHighlight}</span> ✨</h2>
        
        {/* Dynamic Description */}
        <p>{t.ctaDesc}</p>
        
        {/* Dynamic Banner Tagline */}
        <div className="cta-banner">
          <span className="banner-text">{t.ctaBanner}</span>
        </div>

        {/* Dynamic Button */}
        <button className="start-now-btn" onClick={onStart}>
          {t.startNow}
        </button>
      </div>
    </section>
  );
};

export default CTASection;