import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="not-found-section"
      style={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <div className="container">
        <h1 style={{ fontSize: '8rem', marginBottom: '0', color: 'var(--primary-color)' }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>System Error: Page Not Found</h2>
        <p style={{ maxWidth: '500px', margin: '0 auto 40px auto' }}>
          The coordinates you requested do not exist in this sector. 
          Return to the home base to continue your mission.
        </p>
        <Link to="/" className="cyber-button">Return Home</Link>
      </div>
    </motion.section>
  );
};

export default NotFound;
