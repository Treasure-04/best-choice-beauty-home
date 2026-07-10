import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Makeup from './pages/Makeup';
import Nails from './pages/Nails';
import GeleStyling from './pages/GeleStyling';
import Braiding from './pages/Braiding';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/services/nails" element={<Nails />} />
        <Route path="/services/gele" element={<GeleStyling />} />
        <Route path="/services/braiding" element={<Braiding />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;