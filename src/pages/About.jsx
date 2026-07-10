import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="section-title">About Us</h1>
        <p className="section-subtitle">The story behind Best Choice Beauty Home</p>

        <div className="about-content">
          <p>
            Best Choice Beauty Home is a beauty destination dedicated to
            helping every client look and feel their absolute best. From
            flawless makeup to elegant gele styling, stunning braids, and
            beautifully finished nails — we bring skill, passion, and
            attention to detail to every appointment.
          </p>
          <p>
            Whether you're getting ready for a wedding, a party, or simply
            want to treat yourself, we offer both studio and home service
            options to fit your schedule and comfort.
          </p>
          <p>
            {/* Replace this paragraph with her real story once she sends it — 
                e.g. how she started, her experience, what makes her approach unique */}
            Our goal is simple: quality service, genuine care, and results
            you'll love every single time.
          </p>

<div className="about-cta">
            <Link to="/#what-we-offer" className="btn-gold">
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}