import { useState } from 'react';
import './Makeup.css';

const MAKEUP_TYPES = [
  {
    emoji: '💄',
    name: 'Natural Makeup',
    description:
      'A soft, fresh look that enhances your natural beauty without looking like you\u2019re wearing much.',
    bestFor: 'School, casual outings, everyday wear',
  },
  {
    emoji: '✨',
    name: 'Soft Glam',
    description:
      'A step up from natural makeup — still soft but more polished and glam.',
    bestFor: 'Dates, birthdays, casual events',
  },
  {
    emoji: '🔥',
    name: 'Full Glam',
    description: 'Bold, dramatic makeup that stands out.',
    bestFor: 'Parties, weddings, photoshoots',
  },
  {
    emoji: '💍',
    name: 'Bridal Makeup',
    description: 'Elegant, long-lasting makeup designed for weddings.',
    bestFor: 'Weddings (bride or guest)',
  },
  {
    emoji: '💋',
    name: 'Bold Lip Makeup',
    description: 'Simple makeup with focus on the lips.',
    bestFor: 'Quick glam, classy looks',
  },
];

export default function Makeup() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="makeup-page">
      <div className="container">
        <h1 className="section-title">Makeup Services</h1>
        <p className="section-subtitle">
          Choose the look that fits your moment
        </p>

        <div className="makeup-grid">
          {MAKEUP_TYPES.map((type) => (
            <div className="makeup-card" key={type.name}>
              <div className="makeup-card-emoji">{type.emoji}</div>
              <h3>{type.name}</h3>

              <p className="makeup-label">What it is:</p>
              <p className="makeup-description">{type.description}</p>

              <p className="makeup-bestfor">
                <strong>Best for:</strong> {type.bestFor}
              </p>

              <button
                className="btn-gold makeup-book-btn"
                onClick={() => setSelectedType(type.name)}
              >
                Book This Look
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedType && (
        <div
          className="booking-placeholder-overlay"
          onClick={() => setSelectedType(null)}
        >
          <div
            className="booking-placeholder"
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              Booking flow for <strong>{selectedType}</strong> coming next 👀
            </p>
            <button
              className="btn-outline"
              onClick={() => setSelectedType(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}