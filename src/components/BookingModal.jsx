import { useState } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import './BookingModal.css';

// Rough starting prices in Naira — update these anytime, they're just placeholders for now
const PRICES = {
  'Natural Makeup': { studio: 15000, home: 20000 },
  'Soft Glam': { studio: 20000, home: 25000 },
  'Full Glam': { studio: 30000, home: 35000 },
  'Bridal Makeup': { studio: 60000, home: 75000 },
  'Bold Lip Makeup': { studio: 10000, home: 15000 },
};

const STEPS = ['location', 'datetime', 'details'];

export default function BookingModal({ makeupType, onClose }) {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState(null); // 'studio' | 'home'
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const price = location ? PRICES[makeupType]?.[location] : null;

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Firebase save + email confirmation will be wired in here next
    console.log('Booking submitted:', {
      makeupType,
      location,
      date,
      time,
      ...form,
      price,
    });
    setSubmitted(true);
  };

  const canGoNextFromLocation = location !== null;
  const canGoNextFromDatetime = date !== '' && time !== '';
  const canSubmit =
    form.name.trim() !== '' && form.phone.trim() !== '' && form.email.trim() !== '';

  return (
    <div className="booking-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="booking-close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        {submitted ? (
          <div className="booking-success">
            <h3>Booking Received! 🎉</h3>
            <p>
              Thanks for booking <strong>{makeupType}</strong>
              {location ? ` (${location === 'studio' ? 'Studio' : 'Home Service'})` : ''}.
            </p>
            <p>
              We'll reach out shortly to confirm your appointment on{' '}
              <strong>{date}</strong> at <strong>{time}</strong>.
            </p>
            <button className="btn-gold" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="booking-header">
              {step > 0 && (
                <button className="booking-back" onClick={goBack}>
                  <ChevronLeft size={20} />
                </button>
              )}
              <h3>{makeupType}</h3>
            </div>

            {step === 0 && (
              <div className="booking-step">
                <p className="booking-step-label">Studio or Home Service?</p>
                <div className="location-options">
                  <button
                    className={`location-card ${location === 'studio' ? 'selected' : ''}`}
                    onClick={() => setLocation('studio')}
                  >
                    <span className="location-title">Studio Session</span>
                    <span className="location-price">
                      ₦{PRICES[makeupType]?.studio.toLocaleString()}
                    </span>
                  </button>
                  <button
                    className={`location-card ${location === 'home' ? 'selected' : ''}`}
                    onClick={() => setLocation('home')}
                  >
                    <span className="location-title">Home Service</span>
                    <span className="location-price">
                      ₦{PRICES[makeupType]?.home.toLocaleString()}
                    </span>
                  </button>
                </div>
                <button
                  className="btn-gold booking-next"
                  disabled={!canGoNextFromLocation}
                  onClick={goNext}
                >
                  Continue
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="booking-step">
                <p className="booking-step-label">Pick a Date & Time</p>
                <label className="booking-field">
                  Date
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
                <label className="booking-field">
                  Time
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </label>
                <p className="booking-price-preview">
                  Total: <strong>₦{price?.toLocaleString()}</strong>
                </p>
                <button
                  className="btn-gold booking-next"
                  disabled={!canGoNextFromDatetime}
                  onClick={goNext}
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="booking-step">
                <p className="booking-step-label">Your Details</p>
                <label className="booking-field">
                  Full Name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Chioma Okafor"
                  />
                </label>
                <label className="booking-field">
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="e.g. 08012345678"
                  />
                </label>
                <label className="booking-field">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="e.g. chioma@email.com"
                  />
                </label>
                <button
                  className="btn-gold booking-next"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}