import Spline from '@splinetool/react-spline';
import styles from './Loading.module.css';

export default function Loading() {
  const handleSplineLoad = (splineApp) => {
    if (splineApp) {
      // Adjust camera settings for a slightly more zoomed out view
      const camera = splineApp.camera;
      if (camera) {
        camera.position.z = 800; // Increased from 500 to 800 for more zoom out
        camera.position.y = 0;
        camera.position.x = 0;
        camera.fov = 45; // Increased from 35 to 45 for wider view
        camera.updateProjectionMatrix();
      }
    }
  };

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.splineWrapper}>
        <Spline 
          scene="https://prod.spline.design/oJdpXVOuuk74icjC/scene.splinecode"
          onLoad={handleSplineLoad}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
} 