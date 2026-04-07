import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';
import profilePic from '../assets/mohammed saad .jpg';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="hero" 
      className="hero-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container hero-container">
        <div className="hero-content">
          <motion.p variants={itemVariants} className="hero-subtitle">Hello, I'm</motion.p>
          <motion.h1 variants={itemVariants} className="hero-title">Mohammed Saad Mirza.</motion.h1>
          <motion.h2 variants={itemVariants} className="hero-role">Full Stack Developer.</motion.h2>
          <motion.p variants={itemVariants} className="hero-description">
            I specialize in building robust enterprise applications, elegant APIs, 
            and seamless interactive web experiences. Focusing on clean code and intuitive design.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-actions">
            <Link to="/projects" className="cyber-button">View Work</Link>
            <a href="Resume.pdf" target="_blank" rel="noopener noreferrer" className="cyber-button secondary">View Resume</a>
          </motion.div>
        </div>
        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
           <img src={profilePic} alt="Mohammed Saad Mirza" className="hero-photo" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
