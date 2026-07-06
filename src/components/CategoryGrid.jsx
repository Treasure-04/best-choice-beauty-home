import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';
import makeupImg from '../assets/makeup.jpg.jpeg';
import geleImg from '../assets/gele.jpg.jpeg';
import braidingImg from '../assets/braiding.jpg.jpeg';

const CATEGORIES = [
  {
    label: 'Makeup',
    path: '/makeup',
    image: makeupImg,
    direction: 'top-right',
  },
  {
    label: 'Gele Styling',
    path: '/services/gele',
    image: geleImg,
    direction: 'top-left',
  },
  {
    label: 'Braiding',
    path: '/services/braiding',
    image: braidingImg,
    direction: 'bottom-left',
  },
  {
    label: 'Nails',
    path: '/services/nails',
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',
    direction: 'bottom-right',
  },
];


export default function CategoryGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">What We Offer</h2>
        <p className="section-subtitle">
          Tap a category to see styles, prices &amp; book instantly
        </p>
        <div className="category-grid">
          {CATEGORIES.map((cat, index) => (
            <Link
              to={cat.path}
              key={cat.label}
              className={`category-card from-${cat.direction} ${
                isVisible ? 'in-view' : ''
              }`}
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              <img src={cat.image} alt={cat.label} />
              <div className="category-overlay">
                <span>{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}