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
      <div className={styles.splineWrapper} onWheel={handleWheel}>
        <Spline 
          scene="https://prod.spline.design/2DsKXVAe9BRVOh6u/scene.splinecode"
          onLoad={handleSplineLoad}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={styles.missionContent}>
        <div className={styles.tagWrapper}>
          <span className={styles.tag}>OUR VISION</span>
        </div>
        
        <div className={styles.titleWrapper}>
          <h2>Empowering Student</h2>
          <h2 className={styles.gradientText}>Visionaries</h2>
        </div>
        
        <p className={styles.missionText}>
          We are dedicated to discovering and empowering college students with 
          transformative visions for social change. Our mission is to provide a platform 
          where innovative minds can collaborate, grow, and turn their aspirations for 
          global impact into reality.
        </p>
        
        <div className={styles.missionPoints}>
          <div className={styles.point}>
            <div className={styles.pointNumber}>01</div>
            <div className={styles.pointContent}>
              <h3>Student Empowerment</h3>
              <p>Identifying and nurturing visionary students from colleges who are passionate about social change</p>
            </div>
          </div>
          
          <div className={styles.point}>
            <div className={styles.pointNumber}>02</div>
            <div className={styles.pointContent}>
              <h3>Vision to Reality</h3>
              <p>Supporting students in transforming their innovative ideas into actionable solutions</p>
            </div>
          </div>
          
          <div className={styles.point}>
            <div className={styles.pointNumber}>03</div>
            <div className={styles.pointContent}>
              <h3>Global Impact</h3>
              <p>Creating a network of change-makers who drive meaningful societal transformation worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 