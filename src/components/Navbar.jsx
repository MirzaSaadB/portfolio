import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = ({ toggleTheme, currentTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="logo-dot"></span>
          Mohammad Saad
        </Link>
        
        <button className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="hamburger"></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/skills" className="nav-link" onClick={closeMenu}>Skills</Link></li>
          <li><Link to="/projects" className="nav-link" onClick={closeMenu}>Work</Link></li>
          <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
          <li className="nav-action-item">
            <button onClick={toggleTheme} className="theme-toggle">
              {currentTheme === 'dark' ? '☼ Light' : '☾ Dark'}
            </button>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
