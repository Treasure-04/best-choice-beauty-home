import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedClientRoute from './components/ProtectedClientRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Makeup from './pages/Makeup';
import Nails from './pages/Nails';
import GeleStyling from './pages/GeleStyling';
import Braiding from './pages/Braiding';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/makeup"
            element={
              <ProtectedClientRoute>
                <Makeup />
              </ProtectedClientRoute>
            }
          />
          <Route
            path="/services/nails"
            element={
              <ProtectedClientRoute>
                <Nails />
              </ProtectedClientRoute>
            }
          />
          <Route
            path="/services/gele"
            element={
              <ProtectedClientRoute>
                <GeleStyling />
              </ProtectedClientRoute>
            }
          />
          <Route
            path="/services/braiding"
            element={
              <ProtectedClientRoute>
                <Braiding />
              </ProtectedClientRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedClientRoute>
                <Profile />
              </ProtectedClientRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;