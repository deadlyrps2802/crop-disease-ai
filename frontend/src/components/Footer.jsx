import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <p>{t.footerText}</p>
      <div className="social-links">
        <span>{t.socials}</span>
      </div>
    </footer>
  );
};

export default Footer;