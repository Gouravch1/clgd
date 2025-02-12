import Spline from '@splinetool/react-spline';

const Welcome = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      overflow: 'hidden',
      background: '#000000' 
    }}>
      <div style={{ 
        width: '100%', 
        height: '100%',
        transform: 'scale(1.2)',
        transformOrigin: 'center center'
      }}>
        <Spline
          scene="https://prod.spline.design/x4MXaAyEQCxXIMpn/scene.splinecode"
        />
      </div>
    </div>
  );
};

export default Welcome;