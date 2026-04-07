import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-content">
          <p className="copyright">© {new Date().getFullYear()} Mohammed Saad Mirza. All rights reserved.</p>
          <div className="footer-socials">
            <a href="https://github.com/MirzaSaadB" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/mirza-mohammad-saad/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
