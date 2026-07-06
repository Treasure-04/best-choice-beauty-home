import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Makeup from './pages/Makeup';
import Nails from './pages/Nails';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/services/nails" element={<Nails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;