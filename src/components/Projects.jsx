import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GithubStats from './GithubStats';
import './Projects.css';

import intalliSnap from '../assets/intallitask_real.png';
import rentalSnap from '../assets/rental_system_real.png';

const Projects = () => {
  const projects = [
    {
      id: 'intallitask',
      title: 'intalliTask',
      type: 'Web Application',
      description: 'Intelligent task management system with automated prioritization and collaborative workflows.',
      image: intalliSnap,
      tech: ['React', 'Spring Boot', 'SQL'],
      link: '/projects/intallitask'
    },
    {
      id: 'rental-system',
      title: 'Rental System',
      type: 'Enterprise System',
      description: 'Scalable equipment rental platform with multi-tenant isolation and automated financial tracking.',
      image: rentalSnap,
      tech: ['Java', 'Spring', 'Hibernate'],
      link: '/projects/rental-system'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section 
      className="projects-section" style={{ minHeight: '100vh', paddingTop: '80px' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Selected Work
        </motion.h2>
        <motion.div className="projects-grid">
          {projects.map((project, index) => (
             <motion.div key={index} className="project-card" variants={cardVariants}>
               <div className="project-content">
                  <span className="project-type">{project.type}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
               </div>
               <div className="project-footer">
                 <Link to={project.link} className="project-link">View Project →</Link>
               </div>
             </motion.div>
          ))}
        </motion.div>
        
        <GithubStats username="MirzaSaadB" />
      </div>
    </motion.section>
  );
};

export default Projects;
