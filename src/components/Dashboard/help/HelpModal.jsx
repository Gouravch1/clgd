import React from 'react';
import { X } from 'lucide-react';
import styles from './HelpModal.module.css';

const HelpModal = ({ content, onClose, type }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        
        {type === 'article' && (
          <div className={styles.articleContent}>
            <h2>{content.title}</h2>
            <div className={styles.articleMeta}>
              <span>By {content.author}</span>
              <span>•</span>
              <span>{content.readTime} read</span>
              <span>•</span>
              <span>Last updated: {content.lastUpdated}</span>
            </div>
            <div className={styles.content}>
              {content.content}
            </div>
          </div>
        )}

        {type === 'video' && (
          <div className={styles.videoContent}>
            <h2>{content.title}</h2>
            <div className={styles.videoWrapper}>
              {/* Replace with actual video player */}
              <div className={styles.videoPlaceholder}>
                <span>Video Player</span>
              </div>
            </div>
            <div className={styles.videoMeta}>
              <span>By {content.author}</span>
              <span>•</span>
              <span>{content.views} views</span>
              <span>•</span>
              <span>{content.duration}</span>
            </div>
            <p className={styles.videoDescription}>
              {content.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpModal; 