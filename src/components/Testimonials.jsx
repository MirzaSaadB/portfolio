import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const reviews = [
    {
      name: "Dr. A. Sharma",
      role: "Senior Professor",
      text: "Saad's ability to simplify complex backend logic is impressive. His 'Rental System' demonstrated high architectural maturity.",
    },
    {
      name: "Tech Solutions Inc.",
      role: "Industry Mentor",
      text: "The 'intalliTask' app showed great attention to detail. The UI is clean and the user experience is intuitive.",
    }
  ];

  return (
    <section className="testimonials-section" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
      <div className="container">
        <h2 className="section-title" style={{ fontSize: '2rem' }}>Testimonials</h2>
        <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'var(--bg-color-alt)',
                padding: '30px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                fontStyle: 'italic'
              }}
            >
              <p style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>"{rev.text}"</p>
              <div style={{ fontStyle: 'normal' }}>
                <strong style={{ color: 'var(--text-secondary)', display: 'block' }}>{rev.name}</strong>
                <span style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}>{rev.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
