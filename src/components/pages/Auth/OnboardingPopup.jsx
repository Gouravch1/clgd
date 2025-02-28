import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Flag, MessageSquare, Users, 
  ChevronRight, ChevronLeft, X,
  Lightbulb, Target, Handshake, Rocket
} from 'lucide-react';
import styles from './OnboardingPopup.module.css';

const OnboardingPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const quickLinks = [
    {
      title: "Report & Track",
      links: [
        {
          icon: <Flag />,
          label: "Local Issues",
          path: "/dashboard/local-issues",
          description: "Report and track local community issues"
        }
      ]
    },
    {
      title: "Connect & Collaborate",
      links: [
        {
          icon: <MessageSquare />,
          label: "Channels",
          path: "/dashboard/Channels",
          description: "Join topic-specific discussion channels"
        },
        {
          icon: <Users />,
          label: "Community",
          path: "/dashboard/community",
          description: "Connect with other change-makers"
        }
      ]
    }
  ];

  const onboardingPages = [
    {
      title: "Welcome to Systemic Altruism",
      description: "Your platform for creating meaningful impact through collaborative innovation",
      features: [
        {
          icon: <Lightbulb />,
          title: "Innovative Solutions",
          description: "Share and develop ideas that address real-world challenges"
        },
        {
          icon: <Target />,
          title: "Focused Impact",
          description: "Work on projects that align with sustainable development goals"
        },
        {
          icon: <Handshake />,
          title: "Collaborative Network",
          description: "Connect with experts, mentors, and like-minded innovators"
        }
      ]
    },
    {
      title: "Quick Access",
      description: "Everything you need, just a click away",
      isQuickLinks: true,
      sections: quickLinks
    },
    {
      title: "Ways to Contribute",
      description: "Multiple pathways to make a difference in your community",
      features: [
        {
          icon: <Rocket />,
          title: "Lead Projects",
          description: "Initiate and manage your own impact projects"
        },
        {
          icon: <Users />,
          title: "Join Teams",
          description: "Collaborate on existing initiatives and contribute your skills"
        },
        {
          icon: <MessageSquare />,
          title: "Share Knowledge",
          description: "Participate in discussions and provide valuable insights"
        }
      ]
    },
    {
      title: "Ready to Begin Your Journey?",
      description: "Your path to creating positive change starts here",
      isLast: true
    }
  ];

  const handleNext = () => {
    if (currentPage === onboardingPages.length - 1) {
      navigate('/dashboard');
      if (onClose) onClose();
    } else {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
    if (onClose) onClose();
  };

  const handleClose = () => {
    if (onClose) onClose();
    navigate('/dashboard');
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleQuickLink = (path) => {
    if (onClose) onClose();
    
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  // Render the popup in a portal
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={handleClose}>
          <X size={20} />
        </button>

        <div className={styles.content}>
          {!onboardingPages[currentPage].isLast ? (
            <>
              <h2>{onboardingPages[currentPage].title}</h2>
              <p className={styles.description}>
                {onboardingPages[currentPage].description}
              </p>

              {onboardingPages[currentPage].isQuickLinks ? (
                <div className={styles.quickLinksContainer}>
                  {onboardingPages[currentPage].sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className={styles.quickLinksSection}>
                      <h3>{section.title}</h3>
                      <div className={styles.quickLinks}>
                        {section.links.map((link, linkIndex) => (
                          <button
                            key={linkIndex}
                            className={styles.quickLink}
                            onClick={() => handleQuickLink(link.path)}
                          >
                            <div className={styles.quickLinkIcon}>
                              {link.icon}
                            </div>
                            <div className={styles.quickLinkContent}>
                              <span className={styles.quickLinkLabel}>{link.label}</span>
                              <span className={styles.quickLinkDescription}>{link.description}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.featuresGrid}>
                  {onboardingPages[currentPage].features.map((feature, index) => (
                    <div key={index} className={styles.featureCard}>
                      <div className={styles.iconWrapper}>
                        {feature.icon}
                      </div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className={styles.finalPage}>
              <h2>{onboardingPages[currentPage].title}</h2>
              <p className={styles.description}>{onboardingPages[currentPage].description}</p>
              <div className={styles.celebration}>
                🎉
              </div>
            </div>
          )}
        </div>

        <div className={styles.navigation}>
          <div className={styles.dots}>
            {onboardingPages.map((_, index) => (
              <span 
                key={index} 
                className={`${styles.dot} ${currentPage === index ? styles.active : ''}`}
              />
            ))}
          </div>

          <div className={styles.buttons}>
            {currentPage > 0 && (
              <button 
                className={styles.backButton}
                onClick={handleBack}
              >
                <ChevronLeft size={20} />
                Back
              </button>
            )}
            
            <button 
              className={styles.skipButton}
              onClick={handleSkip}
            >
              Skip
            </button>

            <button 
              className={styles.nextButton}
              onClick={handleNext}
            >
              {currentPage === onboardingPages.length - 1 ? 'Get Started' : 'Next'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default OnboardingPopup; 