import { useState } from 'react';
import PhotoBookingModal from '../components/PhotoBookingModal';
import './PhotoServicePage.css';

export default function GeleStyling() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="photo-service-page">
      <div className="container">
        <h1 className="section-title">Gele Styling</h1>
        <p className="section-subtitle">
          Send us a picture of the gele style you want and we'll bring it to life
        </p>

        <div className="photo-service-info">
          <p className="price-range">₦2,000 – ₦8,000</p>
          <p className="price-note">
            Final price depends on the style — send us your reference photo
            and we'll confirm on WhatsApp
          </p>
          <button className="btn-gold" onClick={() => setShowModal(true)}>
            Book a Gele Session
          </button>
        </div>
      </div>

      {showModal && (
        <PhotoBookingModal
          serviceName="Gele Styling"
          whatsappNumber="2348032772872"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}