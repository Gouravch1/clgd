import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Clock,
  MapPin,
  Building,
  ChevronRight,
  Users,
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

const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return styles.statusOpen;
    case 'in-progress':
      return styles.statusInProgress;
    case 'resolved':
      return styles.statusResolved;
    default:
      return '';
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
        <div className={`${styles.statusBadge} ${getStatusColor(issue.status)}`}>
          {issue.status}
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
          <Building size={16} />
          <span>{issue.college}</span>
        </div>
        <div className={styles.detailItem}>
          <MapPin size={16} />
          <span>{issue.location}</span>
        </div>
        <div className={styles.detailItem}>
          <Calendar size={16} />
          <span>{new Date(issue.dateReported).toLocaleDateString()}</span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.contactInfo}>
          <Users size={16} />
          <span>{issue.contactPerson}</span>
        </div>
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