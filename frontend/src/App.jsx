import { useState, useRef } from 'react';
import axios from 'axios';
import { LanguageProvider, useLanguage } from './context/LanguageContext'; // Import Context
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdvisorTools from './components/AdvisorTools';
import CropGrid from './components/CropGrid';
import Features from './components/Features';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import CTASection from './components/CTASection';
import DiseaseDetector from './components/DiseaseDetector';
import './App.css';

// Separate content component to use the hook
const AppContent = () => {
  const { t } = useLanguage(); // Get translations
  const [currentPage, setCurrentPage] = useState('home');
  const detectorRef = useRef(null);

  const navigateToDetector = () => {
    setCurrentPage('detector');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  return (
    <div className="main-layout">
      <ParticlesBackground />
      <Navbar onNavigate={navigateToHome} />

      {currentPage === 'home' ? (
        <>
          <Hero onStart={navigateToDetector} />
          <Features />
          <AdvisorTools />
          <CropGrid />
          <CTASection onStart={navigateToDetector} />
        </>
      ) : (
        <DiseaseDetector onBack={navigateToHome} />
      )}

      <Footer />
    </div>
  );
};

// Main App Component wraps everything in LanguageProvider
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;