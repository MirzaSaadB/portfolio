import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mpqoboez', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <motion.section
      className="contact-section" style={{ minHeight: '100vh', paddingTop: '80px' }}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-subtitle">Available for new opportunities.</h3>
            <p>
              I'm always looking for new challenges and opportunities to build
              great products. Whether you have a question or just want to say hi,
              I'll try my best to get back to you!
            </p>
            <div className="contact-details">
              <div className="detail-item">
                <span className="label">Email:</span>
                <a href="mailto:mirzamohdsaad@gmail.com" className="value text-link">mirzamohdsaad@gmail.com</a>
              </div>
              <div className="detail-item" style={{ marginTop: '15px' }}>
                <span className="label">Phone:</span>
                <a href="tel:8652016818" className="value text-link">+91 8652016818</a>
              </div>
            </div>
            <div className="social-links">
              <a href="https://github.com/MirzaSaadB" className="social-link" target="_blank" rel="noopener noreferrer">Github</a>
              <a href="https://www.linkedin.com/in/mirza-mohammad-saad/" className="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="name" name="name" placeholder=" " required />
              <label htmlFor="name">Name</label>
              <div className="input-border"></div>
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder=" " required />
              <label htmlFor="email">Email</label>
              <div className="input-border"></div>
            </div>
            <div className="form-group">
              <input type="tel" id="phone" name="phone" placeholder=" " />
              <label htmlFor="phone">Phone Number (optional)</label>
              <div className="input-border"></div>
            </div>
            <div className="form-group">
              <textarea id="message" name="message" rows="5" placeholder=" " required></textarea>
              <label htmlFor="message">Message</label>
              <div className="input-border"></div>
            </div>

            {formStatus === 'error' && (
              <p style={{ color: '#ff6b6b', marginBottom: '12px', fontSize: '0.9rem' }}>
                Something went wrong. Please try again or email me directly.
              </p>
            )}

            <button type="submit" className="cyber-button" disabled={formStatus === 'loading'}>
              {formStatus === 'idle'    && 'Send Message →'}
              {formStatus === 'loading' && 'Sending...'}
              {formStatus === 'success' && '✓ Message Sent!'}
              {formStatus === 'error'   && 'Try Again'}
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
