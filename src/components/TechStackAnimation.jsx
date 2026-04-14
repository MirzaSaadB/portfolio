import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Hibernate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' }
];

const TechStackAnimation = () => {
  const [key, setKey] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    const timer = setInterval(() => {
      setKey(prev => prev + 1);
    }, 18000); 
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  const isMobile = windowWidth < 768;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.8 : 1.2, 
      }
    }
  };

  return (
    <motion.div 
      key={key}
      className="tech-animation-container" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ 
        position: 'relative', 
        width: isMobile ? '100vw' : 'min(900px, 95vw)', 
        height: isMobile ? '450px' : 'min(500px, 90vw)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Central Glow - Flagship Style */}
      <motion.div 
        className="central-glow"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: isMobile ? '250px' : '450px',
          height: isMobile ? '250px' : '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {techStack.map((tech, index) => {
        const side = index % 2 === 0 ? (isMobile ? -150 : -500) : (isMobile ? 150 : 500);
        const finalX = isMobile ? (index % 2 === 0 ? -60 : 60) : (index % 2 === 0 ? -85 : 85); 
        const finalY = (index - (techStack.length - 1) / 2) * (isMobile ? 55 : 70); 

        const iconPathVariants = {
          hidden: { 
            x: side, 
            y: index % 2 === 0 ? -100 : 100, 
            scale: 0, 
            opacity: 0,
            rotate: side > 0 ? 90 : -90
          },
          visible: { 
            x: [side, 0, finalX],
            y: [index % 2 === 0 ? -100 : 100, 0, finalY],
            scale: [0, isMobile ? 2 : 2.8, 1], 
            opacity: [0, 1, 1],
            rotate: [side > 0 ? 90 : -90, 0, 0],
            transition: { 
              duration: 2.8,
              times: [0, 0.45, 1], 
              ease: "circOut"
            }
          }
        };

        return (
          <motion.div
            key={`${tech.name}-${index}-${key}`}
            variants={iconPathVariants}
            style={{
              position: 'absolute',
              width: isMobile ? '65px' : '90px',
              height: isMobile ? '65px' : '90px',
              zIndex: 1
            }}
          >
            {/* Flagship Floating Card */}
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 3, -3, 0] 
              }}
              transition={{ 
                duration: 4 + Math.random() * 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              whileHover={{ 
                scale: 1.15, 
                rotate: index % 2 === 0 ? 5 : -5,
                zIndex: 10 
              }}
              className="flagship-tech-card"
              style={{
                width: '100%',
                height: '100%',
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: isMobile ? '16px' : '22px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                overflow: 'hidden'
              }}
            >
              {/* Subtle Inner Glow */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent)',
                  pointerEvents: 'none'
                }}
              />
              
              <img 
                src={tech.icon} 
                alt={tech.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' 
                }} 
                title={tech.name}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TechStackAnimation;
