import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  MapPin,
  Building,
  Calendar,
  Phone,
  Mail,
  Users,
  ArrowLeft,
  Image as ImageIcon,
  Activity,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';
import styles from './IssueDetails.module.css';

const IssueDetails = ({ issues, onStatusChange, currentUser }) => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const issue = issues.find(i => i.id.toString() === issueId);

  // Define user roles and permissions
  const userRoles = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    STUDENT: 'student',
    FACULTY: 'faculty'
  };

  // Check user permissions
  const canUpdateStatus = currentUser && (
    currentUser.role === userRoles.ADMIN ||
    currentUser.role === userRoles.MODERATOR ||
    (currentUser.role === userRoles.FACULTY && issue.organization === currentUser.organization)
  );

  const handleStatusChange = (newStatus) => {
    if (!canUpdateStatus) {
      alert('You do not have permission to change the status');
      return;
    }
    onStatusChange(issue.id, newStatus);
    setShowStatusDropdown(false);
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
      setSelectedImage(issue.images[currentImageIndex - 1]);
    }
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (currentImageIndex < issue.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
      setSelectedImage(issue.images[currentImageIndex + 1]);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  if (!issue) {
    return (
      <div className={styles.notFound}>
        <AlertTriangle size={48} />
        <h2>Issue Not Found</h2>
        <p>The issue you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/dashboard/local-issues')}>
          <ArrowLeft size={16} />
          Back to Issues
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button 
        className={styles.backButton}
        onClick={() => navigate('/dashboard/local-issues')}
      >
        <ArrowLeft size={16} />
        Back to Issues
      </button>

      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <div className={styles.header}>
            <h1>{issue.title}</h1>
            <div className={styles.badges}>
              <span className={`${styles.urgencyBadge} ${styles[issue.urgencyLevel]}`}>
                {issue.urgencyLevel === 'high' && <AlertTriangle size={16} />}
                {issue.urgencyLevel.charAt(0).toUpperCase() + issue.urgencyLevel.slice(1)} Priority
              </span>
              <span className={`${styles.statusBadge} ${styles[issue.status]}`}>
                <Activity size={16} />
                {issue.status.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </div>
          </div>

          <div className={styles.description}>
            <p>{issue.description}</p>
          </div>

          <div className={styles.metadata}>
            <div className={styles.metaItem}>
              <MapPin size={16} />
              <span>{issue.location}</span>
            </div>
            <div className={styles.metaItem}>
              <Building size={16} />
              <span>{issue.organization}</span>
            </div>
            <div className={styles.metaItem}>
              <Calendar size={16} />
              <span>{new Date(issue.dateReported).toLocaleDateString()}</span>
            </div>
          </div>

          {issue.images && issue.images.length > 0 && (
            <div className={styles.images}>
              <h3>
                <ImageIcon size={20} />
                Attached Images
              </h3>
              <div className={styles.imageGrid}>
                {issue.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={styles.imageWrapper}
                    onClick={() => handleImageClick(image, index)}
                  >
                    <img src={image} alt={`Issue ${index + 1}`} />
                    <div className={styles.imageOverlay}>
                      <ZoomIn size={20} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.sidebar}>
          <div className={styles.contactInfo}>
            <h2>Contact Information</h2>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <Users size={16} />
                <span>{issue.contactPerson}</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>{issue.contactEmail}</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>{issue.contactPhone}</span>
              </div>
            </div>
          </div>

          {canUpdateStatus && (
            <div className={styles.statusControl}>
              <button 
                className={styles.statusButton}
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                Change Status
                <ChevronDown size={16} />
              </button>
              {showStatusDropdown && (
                <div className={styles.statusDropdown}>
                  <button onClick={() => handleStatusChange('open')}>
                    Open
                  </button>
                  <button onClick={() => handleStatusChange('in-progress')}>
                    In Progress
                  </button>
                  <button onClick={() => handleStatusChange('resolved')}>
                    Resolved
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className={styles.modalImageWrapper}>
              <img src={selectedImage} alt="Full size" />
            </div>

            <div className={styles.modalControls}>
              <button 
                className={`${styles.navButton} ${currentImageIndex === 0 ? styles.disabled : ''}`}
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
              >
                <ChevronLeft size={24} />
              </button>
              <span className={styles.imageCounter}>
                {currentImageIndex + 1} / {issue.images.length}
              </span>
              <button 
                className={`${styles.navButton} ${currentImageIndex === issue.images.length - 1 ? styles.disabled : ''}`}
                onClick={handleNextImage}
                disabled={currentImageIndex === issue.images.length - 1}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetails; 