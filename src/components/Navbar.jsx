import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleTheme, currentTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>Mohammad Saad</Link>
        
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
    </nav>
  );
};

export default Navbar;
