import { useState } from 'react';
import PhotoBookingModal from '../components/PhotoBookingModal';
import './PhotoServicePage.css';

export default function Braiding() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="photo-service-page">
      <div className="container">
        <h1 className="section-title">Braiding</h1>
        <p className="section-subtitle">
          Send us a picture of the braid style you want and we'll bring it to life
        </p>

        <div className="photo-service-info">
          <p className="price-range">₦5,000 – ₦20,000</p>
          <p className="price-note">
            Final price depends on the style — send us your reference photo
            and we'll confirm on WhatsApp
          </p>
          <button className="btn-gold" onClick={() => setShowModal(true)}>
            Book a Braiding Session
          </button>
        </div>
      </div>

      {showModal && (
        <PhotoBookingModal
          serviceName="Braiding"
          whatsappNumber="2348032772872"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}