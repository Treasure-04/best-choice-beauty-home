import { Link } from 'react-router-dom';
import './CategoryGrid.css';

const CATEGORIES = [
  {
    label: 'Makeup',
    path: '/makeup',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600',
  },
  {
    label: 'Gele Styling',
    path: '/services/gele',
    image:
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=600',
  },
  {
    label: 'Braiding',
    path: '/services/braiding',
    image:
      'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?q=80&w=600',
  },
  {
    label: 'Nails',
    path: '/services/nails',
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',
  },
  {
    label: 'Jewelry',
    path: '/shop/jewelry',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600',
  },
  {
    label: 'Ashoke',
    path: '/shop/ashoke',
    image:
      'https://images.unsplash.com/photo-1610030181087-540f6497a374?q=80&w=600',
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