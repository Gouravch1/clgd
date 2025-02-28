import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Clock,
  MapPin,
  Building,
  Users,
  User,
  ChevronRight,
  Activity,
  Calendar,
} from 'lucide-react';
import styles from './IssuesList.module.css';

const getUrgencyIcon = (level) => {
  switch (level) {
    case 'high':
      return <AlertTriangle className={styles.urgencyHigh} />;
    case 'medium':
      return <Activity className={styles.urgencyMedium} />;
    case 'low':
      return <Clock className={styles.urgencyLow} />;
    default:
      return null;
  }
};

const IssueCard = ({ issue }) => {
  const navigate = useNavigate();
  
  return (
    <div
      className={styles.issueCard}
      onClick={() => navigate(`/dashboard/local-issues/${issue.id}`)}
    >
      <div className={styles.cardHeader}>
        <div 
          className={styles.urgencyBadge}
          data-urgency={issue.urgencyLevel}
        >
          {getUrgencyIcon(issue.urgencyLevel)}
          <span>{issue.urgencyLevel}</span>
        </div>
      </div>

      <h3 className={styles.issueTitle}>{issue.title}</h3>
      
      <p className={styles.issueDescription}>
        {issue.description.length > 150
          ? `${issue.description.substring(0, 150)}...`
          : issue.description}
      </p>

      <div className={styles.issueDetails}>
        <div className={styles.detailItem}>
          {issue.organization ? (
            <Building size={16} />
          ) : (
            <Users size={16} />
          )}
          <span>{issue.organization || issue.club}</span>
        </div>
        <div className={styles.detailItem}>
          <MapPin size={16} />
          <span>{issue.location}</span>
        </div>
        <div className={styles.detailItem}>
          <Calendar size={16} />
          <span>{new Date(issue.dateReported).toLocaleDateString()}</span>
        </div>
        <div className={styles.detailItem}>
          <User size={16} />
          <span>{issue.contactPerson}</span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button className={styles.viewButton}>
          View Details
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const IssuesList = ({ issues, loading }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const scrollAmount = delta * 1.5; // Adjust scroll speed multiplier as needed
      
      // Smooth scroll animation
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading issues...</p>
      </div>
    );
  }

  if (!issues || issues.length === 0) {
    return (
      <div className={styles.empty}>
        <AlertTriangle size={48} />
        <h3>No Issues Found</h3>
        <p>No local issues have been reported yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.scrollWrapper}>
      <div 
        className={styles.scrollContainer}
        ref={scrollContainerRef}
      >
        <div className={styles.issuesRow}>
          {issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IssuesList; 