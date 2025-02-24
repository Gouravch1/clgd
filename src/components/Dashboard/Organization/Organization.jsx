import React from 'react';
import { Building2 } from 'lucide-react';
import styles from './Organization.module.css';

const Organization = () => {
  return (
    <div className={styles.orgContainer}>
      <div className={styles.joinCard}>
        <Building2 size={48} className={styles.orgIcon} />
        <h2>Join Your Organization</h2>
        <p>Connect with your college or university</p>
        <button className={styles.joinBtn}>
          Join Organization
        </button>
      </div>
    </div>
  );
};

export default Organization;