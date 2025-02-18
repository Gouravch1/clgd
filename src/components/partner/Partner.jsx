import Spline from '@splinetool/react-spline';
import microsoft from '../../assets/images/partner2.jpeg';
import google from '../../assets/images/partner3.png';
import amazon from '../../assets/images/partner8.png';
import meta from '../../assets/images/partner9.jpeg';
import './Partner.css';

const Partner = () => {
  const partners = [
    {
      id: 1,
      name: "Microsoft",
      logo: microsoft,
      description: "Leading technology solutions provider",
      bgColor: "linear-gradient(135deg, #00a4ef 0%, #0078d4 100%)"
    },
    {
      id: 2,
      name: "Google",
      logo: google,
      description: "Global education innovator",
      bgColor: "linear-gradient(135deg, #4285f4 0%, #34a853 100%)"
    },
    {
      id: 3,
      name: "Amazon",
      logo: amazon,
      description: "Digital transformation expert",
      bgColor: "linear-gradient(135deg, #ff9900 0%, #232f3e 100%)"
    },
    {
      id: 4,
      name: "Meta",
      logo: meta,
      description: "Educational technology pioneer",
      bgColor: "linear-gradient(135deg, #0668E1 0%, #0782D8 100%)"
    }
  ];

  return (
    <div className="partner-container">
      <div className="spline-background">
        <Spline scene="https://prod.spline.design/J0BR8LWVa29XTR-Q/scene.splinecode" />
      </div>
      <div className="partner-content">
        <div className="content-wrapper">
          <div className="text-section">
            <h2 className="partner-title">Our Trusted Partners</h2>
          </div>
          <div className="card-stack-wrapper">
            <div className="card-stack">
              {partners.map((partner, index) => (
                <div 
                  key={partner.id} 
                  className="partner-card"
                  style={{ '--index': index }}
                >
                  <div className="card-inner">
                    <div className="card-front">
                      <div className="logo-container">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                        />
                      </div>
                    </div>
                    <div 
                      className="card-back"
                      style={{ background: partner.bgColor }}
                    >
                      <h3>{partner.name}</h3>
                      <p>{partner.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner; 