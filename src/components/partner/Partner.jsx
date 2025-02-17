import Spline from '@splinetool/react-spline';
import './Partner.css';

const Partner = () => {
  return (
    <div className="partner-container">
      <div className="spline-background">
        <Spline scene="https://prod.spline.design/J0BR8LWVa29XTR-Q/scene.splinecode" />
      </div>
      <div className="partner-content">
        {/* Add your partner section content here */}
      </div>
    </div>
  );
};

export default Partner; 