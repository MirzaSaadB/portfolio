import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const milestones = [
    {
      year: "2025",
      title: "Full Stack Engineer (Self-Directed)",
      company: "Advanced Projects Portfolio",
      description: "Successfully designed and deployed 'intalliTask' and 'Rental System' using React and Spring Boot. Specialized in RESTful API architecture and secure database management."
    },
    {
      year: "2024",
      title: "Java Application Developer",
      company: "Enterprise Systems Training",
      description: "Focused on robust backend logic with Hibernate and Spring Core. Built the 'Local Bank System' console application to handle high-concurrency transaction simulations."
    },
    {
      year: "2023",
      title: "Foundations of Computer Science",
      company: "Academic & Certification Track",
      description: "Mastered core algorithms, data structures, and the fundamentals of SQL and relational database design."
    }
  ];

  return (
    <section className="experience-section">
      <div className="container">
        <h2 className="section-title">Professional Journey</h2>
        <div className="timeline">
          {milestones.map((item, index) => (
            <motion.div 
              key={index} 
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <h4 className="timeline-company">{item.company}</h4>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
