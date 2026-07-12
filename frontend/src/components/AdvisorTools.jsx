import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AdvisorTools = ({ onDiagnose }) => {
  const { t } = useLanguage();

  return (
    <section className="advisor-section">
      <div className="section-header">
        <h2>{t.advTitle}</h2>
        <p>{t.advSubtitle}</p>
      </div>

      <div className="tools-grid">
        {/* Plant Doctor Card */}
        <div className="tool-card plant-doctor">
          <div className="tool-icon">🌱</div>
          <h3>{t.adv1Title}</h3>
          <p>{t.adv1Desc}</p>
          <button className="tool-btn" onClick={onDiagnose}>
            {t.adv1Btn}
          </button>
        </div>

        {/* Crop Advisor Card */}
        <div className="tool-card crop-advisor">
          <div className="tool-icon">☁️</div>
          <h3>{t.adv2Title}</h3>
          <p>{t.adv2Desc}</p>
          <button className="tool-btn">{t.adv2Btn}</button>
        </div>

        {/* Budget Planner Card */}
        <div className="tool-card budget-planner">
          <div className="tool-icon">📊</div>
          <h3>{t.adv3Title}</h3>
          <p>{t.adv3Desc}</p>
          <button className="tool-btn">{t.adv3Btn}</button>
        </div>
      </div>
    </section>
  );
};

export default AdvisorTools;