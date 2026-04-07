import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleTheme, currentTheme }) => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">Mohammad Saad</Link>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/skills" className="nav-link">Skills</Link></li>
          <li><Link to="/projects" className="nav-link">Work</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
          <li>
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
