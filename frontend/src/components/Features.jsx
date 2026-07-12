import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  // Define features inside the component to access 't'
  const features = [
    { title: t.f1Title, desc: t.f1Desc, color: "green", icon: "📷" },
    { title: t.f2Title, desc: t.f2Desc, color: "blue", icon: "🌤️" },
    { title: t.f3Title, desc: t.f3Desc, color: "purple", icon: "📊" },
    { title: t.f4Title, desc: t.f4Desc, color: "yellow", icon: "🌱" },
    { title: t.f5Title, desc: t.f5Desc, color: "orange", icon: "⚡" },
    { title: t.f6Title, desc: t.f6Desc, color: "red", icon: "🛡️" },
    { title: t.f7Title, desc: t.f7Desc, color: "teal", icon: "🌐" },
    { title: t.f8Title, desc: t.f8Desc, color: "indigo", icon: "👥" }
  ];

  return (
    <section className="features-section">
      <div className="section-header">
        <h2>{t.featTitle}</h2>
        <div className="header-underline"></div>
        <p>{t.featSubtitle}</p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className={`feature-card ${feature.color}-bg`}>
            <div className="f-icon-box">
              <span className="f-icon">{feature.icon}</span>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
            <div className="card-line"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;