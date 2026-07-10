import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="hero-tagline">Glam. Gleam. Glamour.</p>
        <h1 className="hero-title">
          Your One-Stop <span>Beauty</span> Destination
        </h1>
        <p className="hero-subtitle">
          Makeup, gele styling, braiding, &amp; nails — all
          under one roof.
        </p>
        <div className="hero-buttons">
          <a href="#what-we-offer" className="btn-gold">
            Explore Services
          </a>
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