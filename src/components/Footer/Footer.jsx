import { 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaGithub,
  FaDiscord,
  FaArrowRight
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <div className="footer-glow"></div>
      
      <div className="footer-main">
        <div className="footer-brand">
          <h2>SYSTEMIC ALTRUISM</h2>
          <p>Building innovative digital experiences.</p>
          <div className="social-bar">
            <a href="#" className="social-icon"><FaLinkedin /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaGithub /></a>
            <a href="#" className="social-icon"><FaDiscord /></a>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-column">
            <h3>Company</h3>
            <a href="#">About Us <FaArrowRight /></a>
            <a href="#">Careers <FaArrowRight /></a>
            <a href="#">News <FaArrowRight /></a>
          </div>

          <div className="link-column">
            <h3>Resources</h3>
            <a href="#">Blog <FaArrowRight /></a>
            <a href="#">Documentation <FaArrowRight /></a>
            <a href="#">Help Center <FaArrowRight /></a>
          </div>

          <div className="link-column">
            <h3>Legal</h3>
            <a href="#">Privacy <FaArrowRight /></a>
            <a href="#">Terms <FaArrowRight /></a>
            <a href="#">Security <FaArrowRight /></a>
          </div>
        </div>

        <div className="footer-newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe for the latest updates.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-line"></div>
        <div className="footer-info">
          <p>&copy; {currentYear} Your Company. All rights reserved.</p>
          <div className="footer-extra-links">
            <a href="#">Privacy</a>
            <span className="divider">•</span>
            <a href="#">Terms</a>
            <span className="divider">•</span>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
