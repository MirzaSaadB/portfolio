import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    link: '#'
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectData[id];

  if (!project) return <div className="container" style={{ padding: '150px 0' }}><h2>Project Not Found</h2></div>;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -50 }}
      className="project-detail-section"
      style={{ padding: '150px 0', minHeight: '100vh' }}
    >
      <div className="container">
        <Link to="/projects" style={{ display: 'inline-block', marginBottom: '30px', color: 'var(--primary-color)' }}>← Back to Projects</Link>
        <span style={{ display: 'block', textTransform: 'uppercase', color: 'var(--primary-color)', letterSpacing: '2px', marginBottom: '10px' }}>{project.type}</span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>{project.title}</h1>
        
        {/* KPI Dashboard */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '60px' }}>
          {project.kpis.map((kpi, index) => (
            <motion.div 
              key={index} 
              style={{ background: 'var(--bg-color-alt)', padding: '20px 40px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', flex: '1', minWidth: '200px' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <h4 style={{ fontSize: '0.8rem', color: 'var(--primary-color)', textTransform: 'uppercase', opacity: 0.8, marginBottom: '10px' }}>{kpi.label}</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{kpi.value}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', marginTop: '40px' }}>
          <div>
            <h3 style={{ borderBottom: '1px solid var(--accent-color)', paddingBottom: '10px', marginBottom: '20px' }}>Technical Narrative</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8' }}>{project.description}</p>
            
            <h3 style={{ borderBottom: '1px solid var(--accent-color)', paddingBottom: '10px', marginBottom: '20px', marginTop: '40px' }}>Key Capabilities</h3>
            <ul style={{ listStyle: 'square', paddingLeft: '20px', color: 'var(--text-primary)' }}>
              {project.features.map((f, i) => <li key={i} style={{ marginBottom: '12px', fontSize: '1.1rem' }}>{f}</li>)}
            </ul>
          </div>
          
          <div>
            <h3 style={{ borderBottom: '1px solid var(--accent-color)', paddingBottom: '10px', marginBottom: '20px' }}>Technical Achievements</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--primary-color)', paddingLeft: '20px' }}>
              {project.achievements}
            </p>

            <h3 style={{ borderBottom: '1px solid var(--accent-color)', paddingBottom: '10px', marginBottom: '20px' }}>The Engineering Challenge</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>{project.challenges}</p>
            
            <h3 style={{ borderBottom: '1px solid var(--accent-color)', paddingBottom: '10px', marginBottom: '20px', marginTop: '40px' }}>Modern Ecosystem</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
               {project.tech.map((t, i) => (
                 <span key={i} className="tech-tag" style={{ background: 'var(--bg-color-alt)', padding: '6px 18px', color: 'var(--primary-color)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                   {t}
                 </span>
               ))}
            </div>
            
            <div style={{ marginTop: '50px' }}>
               <a href={project.link} className="cyber-button">Open Case Study</a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetail;
