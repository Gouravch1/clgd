import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import styles from './Stats.module.css';
import { useEffect, useRef, useState } from 'react';

export default function Stats() {
  const splineRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stats = [
    {
      number: "1000+",
      label: "Student Innovators",
      description: "Passionate minds driving social change"
    },
    {
      number: "50+",
      label: "Impact Projects",
      description: "Addressing critical global challenges"
    },
    {
      number: "20+",
      label: "Partner Organizations",
      description: "Supporting student initiatives"
    },
    {
      number: "15+",
      label: "Focus Areas",
      description: "From education to sustainability"
    }
  ];

  const handleSplineLoad = (splineApp) => {
    if (splineApp) {
      splineRef.current = splineApp;
      
      const camera = splineApp.camera;
      if (camera) {
        camera.position.z = 1200;
        camera.position.y = 0;
        camera.position.x = 0;
        camera.fov = 45;
        camera.updateProjectionMatrix();
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse position (-1 to 1)
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x: normalizedX, y: normalizedY });

      // Update Spline model rotation if available
      if (splineRef.current) {
        const model = splineRef.current.findObjectByName('Scene');
        if (model) {
          model.rotation.y = normalizedX * 0.05;
          model.rotation.x = normalizedY * 0.05;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={styles.statsContainer}>
      <div className={styles.splineWrapper}>
        <Spline 
          scene="https://prod.spline.design/vXT8QMP5m4SeBKfP/scene.splinecode"
          onLoad={handleSplineLoad}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      <div className={styles.statsContent}>
        <motion.div 
          className={styles.tagWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>OUR IMPACT</span>
        </motion.div>
        
        <motion.div 
          className={styles.titleWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Catalyzing Student-Led</h2>
          <h2 className={styles.gradientText}>Social Innovation</h2>
        </motion.div>
        
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + index * 0.1,
                type: "spring"
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <h3 className={styles.statNumber}>{stat.number}</h3>
              <h4 className={styles.statLabel}>{stat.label}</h4>
              <p className={styles.statDescription}>{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 