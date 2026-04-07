import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import profilePic from '../assets/mohammed saad .jpg';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        <motion.div 
          className="about-image-side"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="image-border-decoration" style={{ zIndex: 1 }}></div>
          <img src={profilePic} alt="Mohammed Saad Mirza" className="about-photo" style={{ width: '280px', height: '350px', objectFit: 'cover', position: 'relative', zIndex: 2, borderRadius: '8px' }} />
        </motion.div>
        
        <motion.div 
          className="about-text-side"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">The Professional Behind The Code</h2>
          <p className="about-description">
            I am a results-driven Full Stack Developer with a deep-rooted passion for architecting complex systems. My specialty lies in the Java ecosystem—specifically Spring Boot and Enterprise architecture—where I build secure, scalable, and high-performance backends.
          </p>
          <p className="about-description">
            Beyond the server, I bridge the gap between logic and user experience with React, crafting minimalist interfaces that prioritize clarity and speed. I believe that software should be robust under the hood, yet elegant on the surface.
          </p>
          <div className="about-stats">
            <div className="stat-box">
              <span className="stat-number">3+</span>
              <span className="stat-label">Core Projects</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">10+</span>
              <span className="stat-label">Technologies</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
