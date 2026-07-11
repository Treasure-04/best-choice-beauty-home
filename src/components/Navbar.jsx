import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  {
    label: 'Makeup',
    path: '/makeup',
  },
  {
    label: 'Services',
    children: [
      { label: 'Gele Styling', path: '/services/gele' },
      { label: 'Braiding', path: '/services/braiding' },
      { label: 'Nails (Pedicure/Manicure)', path: '/services/nails' },
    ],
  },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };
  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const authLink = user
    ? { label: 'My Profile', path: '/profile' }
    : { label: 'Login / Sign Up', path: '/login' };

  const allLinks = [...NAV_LINKS, authLink];

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Best Choice <span>Beauty Home</span>
        </Link>

        <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <nav className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <ul>
            {allLinks.map((link) => (
              <li key={link.label} className={link.children ? 'has-children' : ''}>
                {link.children ? (
                  <>
                    <button
                      className="submenu-toggle"
                      onClick={() => toggleSubmenu(link.label)}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={openSubmenu === link.label ? 'rotated' : ''}
                      />
                    </button>
                    <ul className={`submenu ${openSubmenu === link.label ? 'open' : ''}`}>
                      {link.children.map((child) => (
                        <li key={child.path}>
                          <Link to={child.path} onClick={closeMenu}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={link.path} onClick={closeMenu}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}