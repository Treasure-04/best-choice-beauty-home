import { useState } from 'react';
import ServiceBookingModal from '../components/ServiceBookingModal';
import './Nails.css';

const NAIL_TYPES = ['Gel Polish', 'Acrylic'];

const STYLES = [
  'Long Plain Nails',
  'Long Nails with Design',
  'Short Plain Nails',
  'Short Nails with Design',
];

// Rough starting prices in Naira — update these anytime
const NAIL_PRICES = {
  'Gel Polish': {
    'Long Plain Nails': { studio: 8000, home: 12000 },
    'Long Nails with Design': { studio: 12000, home: 16000 },
    'Short Plain Nails': { studio: 5000, home: 9000 },
    'Short Nails with Design': { studio: 8000, home: 12000 },
  },
  Acrylic: {
    'Long Plain Nails': { studio: 12000, home: 16000 },
    'Long Nails with Design': { studio: 18000, home: 22000 },
    'Short Plain Nails': { studio: 8000, home: 12000 },
    'Short Nails with Design': { studio: 12000, home: 16000 },
  },
};

export default function Nails() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectType = (type) => {
    setSelectedType(type);
    setSelectedStyle(null); // reset style whenever type changes
  };

  const prices =
    selectedType && selectedStyle
      ? NAIL_PRICES[selectedType][selectedStyle]
      : null;

  return (
    <div className="nails-page">
      <div className="container">
        <h1 className="section-title">Nails</h1>
        <p className="section-subtitle">
          Pedicure &amp; Manicure — choose your type and style
        </p>

        {/* Step 1: Choose Type */}
        <div className="nails-step">
          <p className="nails-step-label">1. Choose Type</p>
          <div className="nails-options">
            {NAIL_TYPES.map((type) => (
              <button
                key={type}
                className={`nails-option-card ${
                  selectedType === type ? 'selected' : ''
                }`}
                onClick={() => handleSelectType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Choose Style — only shows after type is picked */}
        {selectedType && (
          <div className="nails-step">
            <p className="nails-step-label">2. Choose Style</p>
            <div className="nails-options">
              {STYLES.map((style) => (
                <button
                  key={style}
                  className={`nails-option-card ${
                    selectedStyle === style ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedStyle(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Booking button — only shows once both are picked */}
        {selectedType && selectedStyle && (
          <div className="nails-cta">
            <p className="nails-summary">
              <strong>{selectedType}</strong> — {selectedStyle}
            </p>
            <button className="btn-gold" onClick={() => setShowModal(true)}>
              Book This Style
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <ServiceBookingModal
          title={`${selectedType} — ${selectedStyle}`}
          priceStudio={prices.studio}
          priceHome={prices.home}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}