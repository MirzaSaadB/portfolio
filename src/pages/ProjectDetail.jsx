import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProjectDetail.css';
import intalliLandingSnap from '../assets/intallitask_real.png';
import intalliDashSnap from '../assets/intallitask_dashboard.png';
import intalliAdminSnap from '../assets/intallitask_admin.png';
import intalliLoginSnap from '../assets/intallitask_login.png';

import rentalShopSnap from '../assets/rental_system_real.png';
import rentalAdminSnap from '../assets/rental_system_admin.png';
import rentalBookingsSnap from '../assets/rental_system_bookings.png';

const projectData = {
  'intallitask': {
    title: 'intalliTask',
    type: 'Web Application',
    description: 'A robust task management ecosystems designed for collaborative environments. I built this to solve productivity bottlenecks using modern asynchronous architecture.',
    features: ['Dynamic Kanban Interface', 'Secure JWT-based Authentication', 'Real-time Push Notifications', 'Detailed Analytics Engine'],
    challenges: 'The primary challenge was managing state synchronization across multiple users. I implemented a robust polling and optimistic UI updates strategy to ensure zero data-conflicts.',
    tech: ['React', 'Spring Boot', 'SQL', 'PostgreSQL', 'Redux'],
    achievements: 'Optimized API response times by 40% using specialized JPA indexing and query caching strategies.',
    kpis: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Latency', value: '< 200ms' },
      { label: 'Architecture', value: 'Micro-services' }
    ],
    gallery: [
      { title: 'Project Landing', image: intalliLandingSnap },
      { title: 'Task Dashboard', image: intalliDashSnap },
      { title: 'Admin Control', image: intalliAdminSnap },
      { title: 'Security Entry', image: intalliLoginSnap }
    ],
    link: '#'
  },
  'rental-system': {
    title: 'Rental System',
    type: 'Enterprise System',
    description: 'A high-availability rental inventory management system. Built specifically for large-scale equipment tracking and automated financial reporting.',
    features: ['Automated Inventory Lifecycle', 'Electronic Invoicing & Billing', 'Centralized Log Management', 'Multi-tenant Data Isolation'],
    challenges: 'Designing a flexible database schema that could handle diverse rental categories while maintaining referential integrity across millions of records.',
    tech: ['Java', 'Spring', 'Hibernate', 'MariaDB', 'Docker'],
    achievements: 'Scaled the system to support 5x the initial inventory load with minimal impact on latency.',
    kpis: [
      { label: 'Data Hub', value: 'MariaDB' },
      { label: 'Throughput', value: '850 req/sec' },
      { label: 'Scalability', value: 'Kubernetes Ready' }
    ],
    gallery: [
      { title: 'Gear Marketplace', image: rentalShopSnap },
      { title: 'Inventory Hub', image: rentalAdminSnap },
      { title: 'My Bookings', image: rentalBookingsSnap }
    ],
    link: '#'
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectData[id];

  if (!project) return <div className="container" style={{ padding: '150px 0' }}><h2>Project Not Found</h2></div>;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="project-detail-section"
      style={{ padding: '80px 0', minHeight: '100vh' }}
    >
      <div className="container">
        <Link to="/projects" className="back-link">← Back to Projects</Link>
        <span className="project-type-tag">{project.type}</span>
        <h1 className="project-detail-title">{project.title}</h1>
        
        {/* KPI Dashboard */}
        <div className="kpi-grid">
          {project.kpis.map((kpi, index) => (
            <motion.div 
              key={index} 
              className="kpi-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <h4 className="kpi-label">{kpi.label}</h4>
              <p className="kpi-value">{kpi.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Gallery Slider */}
        <div className="gallery-section">
          <h3 className="category-subtitle">Interface Preview</h3>
          <div className="gallery-slider">
            {project.gallery.map((item, index) => (
              <motion.div 
                key={index} 
                className="gallery-item"
                whileHover={{ scale: 1.02 }}
              >
                <img src={item.image} alt={item.title} className="gallery-img" />
                <div className="gallery-overlay">
                  <span>{item.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="detail-content-grid">
          <div className="content-left">
            <h3 className="detail-subtitle">Technical Narrative</h3>
            <p className="detail-text">{project.description}</p>
            
            <h3 className="detail-subtitle" style={{ marginTop: '40px' }}>Key Capabilities</h3>
            <ul className="capabilities-list">
              {project.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
          
          <div className="content-right">
            <h3 className="detail-subtitle">Technical Achievements</h3>
            <p className="achievement-quote">
              {project.achievements}
            </p>

            <h3 className="detail-subtitle">The Engineering Challenge</h3>
            <p className="detail-text">{project.challenges}</p>
            
            <h3 className="detail-subtitle" style={{ marginTop: '40px' }}>Modern Ecosystem</h3>
            <div className="tech-tags-container">
               {project.tech.map((t, i) => (
                 <span key={i} className="tech-badge">{t}</span>
               ))}
            </div>
            

          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetail;
