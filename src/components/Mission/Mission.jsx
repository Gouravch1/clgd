import Spline from '@splinetool/react-spline';
import styles from './Mission.module.css';
import { useRef } from 'react';

export default function Mission() {
  const splineRef = useRef(null);

  const handleSplineLoad = (splineApp) => {
    if (splineApp) {
      splineRef.current = splineApp;
      
      // Set up camera
      const camera = splineApp.camera;
      if (camera) {
        camera.position.z = 1200; // Adjusted for new model
        camera.position.y = 0;
        camera.position.x = 0;
        camera.fov = 45;
        camera.updateProjectionMatrix();
        
        // Disable zoom and scroll interactions
        if (camera.controls) {
          camera.controls.enableZoom = false;
          camera.controls.enableScroll = false;
          camera.controls.enableScrollWheel = false;
        }
      }
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.welcomeContainer}>
      <div 
        className={styles.splineWrapper} 
        onWheel={handleWheel}
      >
        <Spline 
          scene="https://prod.spline.design/2DsKXVAe9BRVOh6u/scene.splinecode"
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