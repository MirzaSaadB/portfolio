import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const SkillBar = ({ name, icon, level, delay }) => (
  <motion.div 
    className="skill-item-detailed"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <div className="skill-info-row">
      <div className="skill-label">
        <img src={icon} alt={name} className="skill-icon-small" />
        <span className="skill-name-text">{name}</span>
      </div>
      <span className="skill-percentage">{level}%</span>
    </div>
    <div className="skill-progress-bg">
      <motion.div 
        className="skill-progress-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.2 }}
        viewport={{ once: true }}
      />
    </div>
  </motion.div>
);

const Skills = () => {
  const skillCategories = [
    {
      title: "Backend Core",
      skills: [
        { name: 'Java', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Spring Boot', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { name: 'Hibernate', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg' },
        { name: 'SQL / Databases', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
      ]
    },
    {
      title: "Frontend & UI",
      skills: [
        { name: 'React', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'JavaScript (ES6+)', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Modern CSS', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'HTML5', level: 92, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' }
      ]
    }
  ];

  return (
    <motion.section 
      className="skills-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="container">
        <h2 className="section-title">Technical Mastery</h2>
        <div className="skills-detailed-grid">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="skill-category-block">
              <h3 className="category-subtitle">{category.title}</h3>
              <div className="skill-bars-list">
                {category.skills.map((skill, index) => (
                  <SkillBar 
                    key={index} 
                    {...skill} 
                    delay={catIndex * 0.2 + index * 0.1} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
