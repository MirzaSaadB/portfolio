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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setKey(prev => prev + 1);
    }, 18000); // 10s animation + 8s pause
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.2, // One by one focus
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -90 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.6, 
        type: "spring",
        stiffness: 100 
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
      style={{ position: 'relative', width: 'min(900px, 95vw)', height: 'min(500px, 90vw)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {/* Central Glow */}
      <motion.div 
        className="central-glow"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />

      {techStack.map((tech, index) => {
        const side = index % 2 === 0 ? -450 : 450;
        const finalX = index % 2 === 0 ? -80 : 80; // Even tighter zig-zag
        const finalY = (index - (techStack.length - 1) / 2) * 65; // Very compact stack

        const iconPathVariants = {
          hidden: { 
            x: side, 
            y: 0, 
            scale: 0, 
            opacity: 0,
            rotate: side > 0 ? 180 : -180
          },
          visible: { 
            x: [side, 0, finalX],
            y: [0, 0, finalY],
            scale: [0, 2.5, 1], // Thoda bada honga in middle
            opacity: [0, 1, 1],
            rotate: [side > 0 ? 180 : -180, 0, 0],
            transition: { 
              duration: 2.5,
              times: [0, 0.4, 1], // Spend 40% time fly-in/zoom
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
              width: '85px',
              height: '85px',
              zIndex: 1
            }}
          >
            {/* Inner div for continuous floating effect */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0] 
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              style={{
                width: '100%',
                height: '100%',
                padding: '15px',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
                border: 'var(--glass-border)',
                borderRadius: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 'var(--soft-shadow)',
              }}
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
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
