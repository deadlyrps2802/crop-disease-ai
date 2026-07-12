import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const CropGrid = () => {
  const { t } = useLanguage();

// Specific list of 12 crops with verified, high-quality image URLs
const CROPS = [
  { name: t.c_apple, img: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=500&q=80" },
  { name: t.c_tomato, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80" },
  { name: t.c_orange, img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=500&q=80" },
  { name: t.c_blueberry, img: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=500&q=80" },
  { name: t.c_strawberry, img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80" },
  // Updated Soybean Image
  { name: t.c_soybean, img: "https://plus.unsplash.com/premium_photo-1661815691473-5efc09a055e4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: t.c_raspberry, img: "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?auto=format&fit=crop&w=500&q=80" },
  { name: t.c_corn, img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=500&q=80" },
  { name: t.c_cherry, img: "https://images.unsplash.com/photo-1528821154947-1aa3d1b74941?auto=format&fit=crop&w=500&q=80" },
  { name: t.c_potato, img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80" },
  // Updated Pepper Image
  { name: t.c_pepper, img: "https://images.unsplash.com/photo-1588853146957-cc7664809c64?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  // Updated Grape Image
  { name: t.c_grape, img: "https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?auto=format&fit=crop&w=500&q=80" },
];


 return (
    <section className="crop-section" style={{ backgroundColor: '#f0fdfa' }}>
      <div className="crop-header-container">
        {/* Dynamic Title and Subtitle */}
        <h2>{t.cropTitle}</h2>
        <div className="crop-underline"></div>
        <p>{t.cropSubtitle}</p>
      </div>

      <div className="crop-grid">
        {CROPS.map((crop, index) => (
          <div key={index} className="crop-card">
            <div className="crop-image-wrapper">
              <img src={crop.img} alt={crop.name} loading="lazy" />
            </div>
            <h4>{crop.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CropGrid;