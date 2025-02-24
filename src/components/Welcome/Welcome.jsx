import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import styles from './Welcome.module.css';

const Welcome = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/auth');
  };

  return (
    <div className={styles.welcomeContainer}>
      {/* Spline Background */}
      <div className={styles.splineWrapper}>
        <Spline
          scene="https://prod.spline.design/x4MXaAyEQCxXIMpn/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Content Overlay */}
      <div className={styles.contentOverlay}>
        <div className={styles.logo}>SYSTEMIC ALTRUISM</div>
        
        <div className={styles.textContent}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.typingText}>
              COLLABORATE FOR IMPACT
            </h1>
            <h1 className={styles.gradientText}>
              BUILD BETTER FUTURES<span className={styles.cursor}>|</span>
            </h1>
          </div>
          
          <p className={styles.quote}>
            "EMPOWERING STUDENT INNOVATORS TO PIONEER SOLUTIONS 
            THAT DRIVE MEANINGFUL AND LASTING SOCIAL CHANGE."
          </p>
          
          <button 
            className={styles.ctaButton} 
            onClick={handleJoinClick}
            style={{ pointerEvents: 'auto' }}
          >
            JOIN US
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;