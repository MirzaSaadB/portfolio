import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GithubStats = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) return <div className="container" style={{ padding: '40px 0' }}>Loading Repository Data...</div>;
  if (!repos.length) return null;

  return (
    <section className="github-stats-section" style={{ padding: '80px 0', background: 'var(--bg-color)' }}>
      <div className="container">
        <h2 className="section-title" style={{ fontSize: '2rem' }}>Latest GitHub Repos</h2>
        <div className="github-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
          {repos.map((repo, i) => (
            <motion.a 
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              style={{
                background: 'var(--bg-color-alt)',
                padding: '25px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'inherit',
                display: 'block',
                textDecoration: 'none'
              }}
              whileHover={{ borderColor: 'var(--primary-color)', translateY: -5 }}
            >
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>{repo.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '15px' }}>
                {repo.description || "No description provided."}
              </p>
              <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', color: 'var(--primary-color)' }}>
                <span>★ {repo.stargazers_count}</span>
                <span>⇅ {repo.forks_count}</span>
                {repo.language && <span>● {repo.language}</span>}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GithubStats;
