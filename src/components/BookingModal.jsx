import { useState } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import './BookingModal.css';
import { useAuth } from '../context/AuthContext';

// Rough starting prices in Naira — update these anytime, they're just placeholders for now
const PRICES = {
  'Natural Makeup': { studio: 15000, home: 20000 },
  'Soft Glam': { studio: 20000, home: 25000 },
  'Full Glam': { studio: 30000, home: 35000 },
  'Bridal Makeup': { studio: 60000, home: 75000 },
  'Bold Lip Makeup': { studio: 10000, home: 15000 },
};

const STUDIO_ADDRESS =
 'Best Choice Beauty Home Studio, No.12 Alimini road Igwurutali, Port Harcourt, Nigeria';

const STEPS = ['location', 'datetime', 'details'];

export default function BookingModal({ makeupType, onClose }) {
  const [step, setStep] = useState(0);
  const { user } = useAuth();
  const [location, setLocation] = useState(null); // 'studio' | 'home'
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const price = location ? PRICES[makeupType]?.[location] : null;

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSending(true);
    setSendError('');

    const bookingData = {
      userId: user?.uid || null,
      service: 'Makeup',
      type: makeupType,
      location: location === 'studio' ? 'Studio Session' : 'Home Service',
      address: location === 'home' ? form.address : STUDIO_ADDRESS,
      date,
      time,
      price,
      name: form.name,
      phone: form.phone,
      email: form.email,
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    try {
      // Save to Firestore first
      await addDoc(collection(db, 'bookings'), bookingData);

      // Then send confirmation email
      const templateParams = {
        to_name: form.name,
        to_email: form.email,
        makeup_type: makeupType,
        location: bookingData.location,
        appointment_date: date,
        appointment_time: time,
        price: price?.toLocaleString(),
      };

      await emailjs.send(
        'service_pqcjioc',
        'template_37q8pvx',
        templateParams,
        'ZFAZHC99UzQrRCaJR'
      );

      setSending(false);
      setSubmitted(true);
    } catch (error) {
      console.error('Booking failed:', error);
      setSending(false);
      setSendError('Something went wrong. Please try again.');
    }
  };

  const canGoNextFromLocation = location !== null;
  const canGoNextFromDatetime = date !== '' && time !== '';
  const canSubmit =
    form.name.trim() !== '' &&
    form.phone.trim() !== '' &&
    form.email.trim() !== '' &&
    (location !== 'home' || form.address.trim() !== '');

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
            <p className="booking-spam-note">
              📧 Didn't get the confirmation email? Please check your spam or
              junk folder.
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

                {location === 'home' ? (
                  <label className="booking-field">
                    Your Address
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleFormChange}
                      placeholder="e.g. 12 Aba Road, Port Harcourt"
                    />
                  </label>
                ) : (
                  <div className="studio-address-box">
                    <p className="studio-address-label">Studio Location</p>
                    <p className="studio-address-text">{STUDIO_ADDRESS}</p>
                  </div>
                )}

                {sendError && <p className="booking-error">{sendError}</p>}
                <button
                  className="btn-gold booking-next"
                  disabled={!canSubmit || sending}
                  onClick={handleSubmit}
                >
                  {sending ? 'Sending...' : 'Confirm Booking'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}