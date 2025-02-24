import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('signin');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSwitchMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className={`${styles.authPage} ${mounted ? styles.mounted : ''}`}>
      <div className={styles.neonGlow}></div>
      
      <button className={styles.backButton} onClick={handleBackToHome}>
        <ArrowLeft size={24} />
      </button>

      <div className={styles.leftPanel}>
        <div className={styles.brandingContent}>
          <div className={styles.brandLogo}>SYSTEMIC ALTRUISM</div>
          <h1>
            Empowering Change
            <span>Through Innovation</span>
          </h1>
          <p className={styles.tagline}>
            Join a community of forward-thinking individuals dedicated to creating
            meaningful impact through collaborative innovation and sustainable solutions.
          </p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>1000+</div>
              <div className={styles.statLabel}>Active Members</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Communities</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>200+</div>
              <div className={styles.statLabel}>Projects</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        {authMode === 'signin' ? (
          <SignIn onSwitchMode={handleSwitchMode} />
        ) : (
          <SignUp onSwitchMode={handleSwitchMode} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;