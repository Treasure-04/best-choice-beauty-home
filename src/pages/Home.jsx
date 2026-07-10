import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#what-we-offer') {
      setTimeout(() => {
        const el = document.getElementById('what-we-offer');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        // Clear the hash from the URL after scrolling so a later refresh
        // doesn't auto-scroll again
        window.history.replaceState(null, '', '/');
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