import { Link } from 'react-router-dom';
import './CategoryGrid.css';
import './CategoryGrid.css';
import makeupImg from '../assets/makeup.jpg';
import geleImg from '../assets/gele.jpg';
import braidingImg from '../assets/braiding.jpg';

const CATEGORIES = [
  {
    label: 'Makeup',
    path: '/makeup',
    image: makeupImg,
  },
  {
    label: 'Gele Styling',
    path: '/services/gele',
    image: geleImg,
  },
  {
    label: 'Braiding',
    path: '/services/braiding',
    image: braidingImg,
  },
  {
    label: 'Nails',
    path: '/services/nails',
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',
  },
];


export default function CategoryGrid() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">What We Offer</h2>
        <p className="section-subtitle">
          Tap a category to see styles, prices &amp; book instantly
        </p>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link to={cat.path} key={cat.label} className="category-card">
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