import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  const posts = [
    {
      title: "Mastering Spring Boot for Enterprise Applications",
      date: "April 15, 2026",
      excerpt: "A deep dive into why Spring Boot remains the industry standard for robust backend development.",
      category: "Backend"
    },
    {
      title: "The Shift to Minimalist Web Design",
      date: "March 28, 2026",
      excerpt: "Exploring the aesthetic and functional benefits of clean, focused user interfaces in 2026.",
      category: "Design"
    },
    {
      title: "Optimizing SQL Queries: A Developer's Guide",
      date: "March 10, 2026",
      excerpt: "Best practices for writing efficient, scalable database queries in large-scale systems.",
      category: "Database"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section 
      className="blog-section"
      style={{ paddingTop: '140px', minHeight: '100vh' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container">
        <h2 className="section-title">Latest Articles</h2>
        <div className="blog-grid" style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '50px' }}>
          {posts.map((post, index) => (
            <motion.div 
              key={index} 
              variants={postVariants}
              style={{
                background: 'var(--bg-color-alt)',
                padding: '40px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                transition: 'var(--transition-smooth)'
              }}
              whileHover={{ scale: 1.01, borderColor: 'var(--primary-color)' }}
            >
              <span style={{ color: 'var(--primary-color)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{post.category} — {post.date}</span>
              <h3 style={{ fontSize: '1.8rem', margin: '15px 0', color: 'var(--text-secondary)' }}>{post.title}</h3>
              <p style={{ color: 'var(--text-primary)', marginBottom: '25px', fontSize: '1.1rem' }}>{post.excerpt}</p>
              <a href="#" style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Read Article →</a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Blog;
