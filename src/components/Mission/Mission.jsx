import Spline from '@splinetool/react-spline';
import styles from './Mission.module.css';
import { useEffect, useRef } from 'react';

export default function Mission() {
  const splineRef = useRef(null);

  const handleSplineLoad = (splineApp) => {
    if (splineApp) {
      splineRef.current = splineApp;
      
      // Get the main scene object
      const scene = splineApp.scene;
      
      // Set up rotation animation
      const animate = () => {
        if (scene) {
          scene.rotation.y += 0.003;
        }
        requestAnimationFrame(animate);
      };
      
      // Start the animation
      animate();

      // Camera setup
      const camera = splineApp.camera;
      if (camera) {
        camera.position.z = 3;
        camera.position.y = 0.3;
        camera.position.x = -2.8;
        
        camera.fov = 12;
        camera.near = 0.01;
        camera.far = 1000;
        camera.updateProjectionMatrix();
        
        if (camera.controls) {
          camera.controls.enable = true;
          camera.controls.enableZoom = true;
          camera.controls.enablePan = true;
          camera.controls.enableRotate = true;
          camera.controls.minDistance = 1.2;
          camera.controls.maxDistance = 50;
          camera.controls.dampingFactor = 0.01;
          camera.controls.enableDamping = true;
          camera.controls.update();
        }
      }
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      if (splineRef.current) {
        // Stop any ongoing animations when component unmounts
        splineRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.splineWrapper}>
        <Spline 
          scene="https://prod.spline.design/askxNGSE-R2XNbtD/scene.splinecode"
          onLoad={handleSplineLoad}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={styles.missionContent}>
        <div className={styles.tagWrapper}>
          <span className={styles.tag}>OUR MISSION</span>
        </div>
        
        <div className={styles.titleWrapper}>
          <h2>Empowering Change</h2>
          <h2 className={styles.gradientText}>Through Innovation</h2>
        </div>
        
        <p className={styles.missionText}>
          At CLGD, we're dedicated to fostering systemic solutions that create lasting 
          positive impact. Through innovative approaches and collaborative partnerships, 
          we empower the next generation of change-makers.
        </p>
        
        <div className={styles.missionPoints}>
          <div className={styles.point}>
            <div className={styles.pointNumber}>01</div>
            <div className={styles.pointContent}>
              <h3>Systemic Solutions</h3>
              <p>Creating frameworks that address root causes and drive sustainable change</p>
            </div>
          </div>
          
          <div className={styles.point}>
            <div className={styles.pointNumber}>02</div>
            <div className={styles.pointContent}>
              <h3>Student Innovation</h3>
              <p>Empowering students to pioneer breakthrough approaches to social impact</p>
            </div>
          </div>
          
          <div className={styles.point}>
            <div className={styles.pointNumber}>03</div>
            <div className={styles.pointContent}>
              <h3>Global Collaboration</h3>
              <p>Building networks that amplify impact across communities worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 