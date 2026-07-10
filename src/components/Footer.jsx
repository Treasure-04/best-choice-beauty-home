import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <h3>Best Choice Beauty Home</h3>
          <p>Makeup, gele styling, braiding &amp; nails — all under one roof.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/makeup">Makeup</Link></li>
            <li><Link to="/services/gele">Gele Styling</Link></li>
            <li><Link to="/services/braiding">Braiding</Link></li>
            <li><Link to="/services/nails">Nails</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <p>0803 277 2872</p>
          <p>Best Choice Beauty Home Studio, No.12 Alimini road Igwurutali, Port Harcourt, Nigeria</p>
          
           <a href="https://wa.me/2348032772872"
            target="_blank"
            rel="noreferrer"
            className="footer-whatsapp"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Best Choice Beauty Home. All rights reserved.</p>
      </div>
    </footer>
  );
}