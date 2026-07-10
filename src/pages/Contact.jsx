import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const templateParams = {
      to_name: 'Best Choice Beauty Home',
      to_email: 'YOUR_BUSINESS_EMAIL@gmail.com',
      from_name: form.name,
      from_email: form.email,
      message: form.message,
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
        setSent(true);
        setForm({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error('Message failed:', err);
        setSending(false);
        setError(
          'Something went wrong. Please try again or message us on WhatsApp.'
        );
      });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">
          Questions? Reach out and we'll get back to you shortly
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p className="contact-detail">
              <strong>Studio Address:</strong>
              <br />
              Best Choice Beauty Home Studio, [Insert Full Address], Port
              Harcourt
            </p>
            <p className="contact-detail">
              <strong>Phone:</strong>
              <br />
              0803 277 2872
            </p>
            <p className="contact-detail">
              <strong>Email:</strong>
              <br />
              YOUR_BUSINESS_EMAIL@gmail.com
            </p>

            
              <a href="https://wa.me/2348032772872"
              target="_blank"
              rel="noreferrer"
              className="btn-gold contact-whatsapp-btn"
            >
              Chat on WhatsApp
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>

            {sent ? (
              <p className="contact-success">
                Message sent! We'll get back to you soon. 🎉
              </p>
            ) : (
              <>
                <label className="booking-field">
                  Your Name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="booking-field">
                  Your Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="booking-field">
                  Message
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </label>

                {error && <p className="booking-error">{error}</p>}

                <button className="btn-gold" type="submit" disabled={sending}>
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}