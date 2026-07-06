import { useState } from 'react';
import { X, ChevronLeft, Upload } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './BookingModal.css';

export default function PhotoBookingModal({
  serviceName,
  whatsappNumber,
  onClose,
}) {
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const goNext = () => setStep((s) => Math.min(s + 1, 2));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSending(true);
    setSendError('');

    const templateParams = {
      to_name: form.name,
      to_email: form.email,
      makeup_type: serviceName,
      location: 'To be discussed on WhatsApp',
      appointment_date: date,
      appointment_time: time,
      price: 'To be confirmed based on style',
    };

    emailjs
      .send(
        'service_pqcjioc',
        'template_37q8pvx',
        templateParams,
        'ZFAZHC99UzQrRCaJR'
      )
      .then(() => {
        setSending(false);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error('Email send failed:', error);
        setSending(false);
        setSendError(
          'Something went wrong sending your confirmation. Please try again.'
        );
      });
  };

  const handleWhatsappRedirect = () => {
    const message = encodeURIComponent(
      `Hi, I just booked ${serviceName} for ${date} at ${time}. I'll send my reference picture now.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const canGoNextFromPhoto = photo !== null;
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
            <h3>Successfully Booked! 🎉</h3>
            <p>
              Thanks for booking <strong>{serviceName}</strong> for{' '}
              <strong>{date}</strong> at <strong>{time}</strong>.
            </p>
            <p>
              A confirmation email is on its way. Tap below to send your
              reference photo on WhatsApp so we can confirm your final price.
            </p>
            <button className="btn-gold" onClick={handleWhatsappRedirect}>
              Continue to WhatsApp
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
              <h3>{serviceName}</h3>
            </div>

            {step === 0 && (
              <div className="booking-step">
                <p className="booking-step-label">
                  Upload a picture of the style you want
                </p>
                <label className="photo-upload-box">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Selected style"
                      className="photo-preview"
                    />
                  ) : (
                    <>
                      <Upload size={28} />
                      <span>Tap to choose from gallery</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    hidden
                  />
                </label>
                <button
                  className="btn-gold booking-next"
                  disabled={!canGoNextFromPhoto}
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