import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="hero-tagline">Glam. Gele. Glow.</p>
        <h1 className="hero-title">
          Your One-Stop <span>Beauty</span> Destination
        </h1>
        <p className="hero-subtitle">
          Makeup, gele styling, braiding, nails, jewelry &amp; ashoke — all
          under one roof.
        </p>
        <div className="hero-buttons">
          <Link to="/makeup" className="btn-gold">
            Explore Services
          </Link>
          
            <a href="https://wa.me/2348032772872"
            target="_blank"
            rel="noreferrer"
            className="btn-outline hero-outline"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}