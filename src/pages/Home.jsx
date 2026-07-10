import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#what-we-offer') {
      // Small delay to let the page fully render first
      setTimeout(() => {
        const el = document.getElementById('what-we-offer');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <CategoryGrid />
    </>
  );
}