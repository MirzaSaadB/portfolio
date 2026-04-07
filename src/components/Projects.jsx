import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GithubStats from './GithubStats';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 'intallitask',
      title: 'intalliTask',
      type: 'Web Application',
      description: 'A full-stack task manager web application designed for high productivity and an intuitive user experience. Engineered with modern responsive principles.',
      tech: ['React', 'Spring Boot', 'SQL'],
      link: '/projects/intallitask'
    },
    {
      id: 'rental-system',
      title: 'Rental System',
      type: 'Enterprise System',
      description: 'A comprehensive rental management architecture to streamline operations, tracking, and billing for various organizational assets.',
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
      className="projects-section" style={{ minHeight: '100vh', paddingTop: '120px' }}
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
        
        <GithubStats username="mirza-mohammad-saad" />
      </div>
    </motion.section>
  );
};

export default Projects;
