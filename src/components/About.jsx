import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import profilePic from '../assets/mohammed saad .jpg';

const About = () => {
  const certifications = [
    {
      title: "Oracle Certified Associate",
      issuer: "Java SE 8 Programmer",
      date: "2024",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    },
    {
      title: "Spring Boot Professional",
      issuer: "Enterprise Frameworks",
      date: "2025",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
    },
    {
      title: "Full Stack Development",
      issuer: "Advanced Web Systems",
      date: "2025",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-container">
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

        {/* New Certification Gallery */}
        <div className="certs-wrapper">
          <h3 className="category-title" style={{ marginBottom: '40px' }}>Digital Credentials</h3>
          <div className="certs-grid">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index} 
                className="cert-card"
                whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(100, 255, 218, 0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="cert-icon-wrapper">
                  <img src={cert.icon} alt={cert.title} />
                </div>
                <div className="cert-info">
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer}</p>
                  <span className="cert-date">{cert.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
