import React, { useState } from 'react';
import { 
  GitFork, 
  Star, 
  Award, 
  Target, 
  Calendar,
  Users,
  ArrowUpRight,
  Search,
  Code,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  Globe,
  Heart
} from 'lucide-react';
import styles from './Contributions.module.css';

const Contributions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  const contributionStats = [
    {
      title: "Global Impact",
      value: "2,547",
      change: "+156",
      icon: <Globe size={20} />,
      color: "#4D96FF"
    },
    {
      title: "Lives Impacted",
      value: "892",
      change: "+23%",
      icon: <Heart size={20} />,
      color: "#FF6B6B"
    },
    {
      title: "Projects",
      value: "134",
      change: "+12",
      icon: <Target size={20} />,
      color: "#20B2AA"
    },
    {
      title: "Recognition",
      value: "47",
      icon: <Award size={20} />,
      change: "+5",
      color: "#FFD700"
    }
  ];

  const contributions = [
    {
      id: 1,
      project: "Clean Water Initiative",
      type: "Environmental",
      description: "Implemented sustainable water purification system in rural communities, providing clean water access to over 1,000 families.",
      impact: "High",
      date: "2024-03-15",
      status: "Completed",
      kudos: 156,
      comments: 23,
      category: "Environmental",
      timeToComplete: "3 months",
      collaborators: 4,
      image: "https://images.unsplash.com/photo-1544476915-ed1370594142"
    },
    {
      id: 2,
      project: "Education for All",
      type: "Education",
      description: "Developed digital learning platform for underprivileged students, reaching over 500 children in remote areas.",
      impact: "High",
      date: "2024-03-10",
      status: "In Progress",
      kudos: 98,
      comments: 15,
      category: "Education",
      timeToComplete: "6 months",
      collaborators: 6,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
    },
    {
      id: 3,
      project: "Healthcare Access",
      type: "Healthcare",
      description: "Created mobile medical consultation platform connecting rural patients with urban doctors.",
      impact: "Medium",
      date: "2024-03-05",
      status: "Completed",
      kudos: 124,
      comments: 19,
      category: "Healthcare",
      timeToComplete: "4 months",
      collaborators: 5,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Contributions' },
    { id: 'code', label: 'Code' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'review', label: 'Reviews' },
    { id: 'mentoring', label: 'Mentoring' }
  ];

  const timeframes = [
    { id: 'all', label: 'All Time' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Making a Difference</h1>
          <p>Your contributions towards positive global change</p>
        </div>
        <div className={styles.impactScore}>
          <div className={styles.scoreRing}>
            <span className={styles.scoreLabel}>Impact Score</span>
            <div className={styles.scoreValue}>892</div>
            <div className={styles.scoreTrend}>
              <ArrowUpRight size={16} />
              <span>+23%</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {contributionStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statTitle}>{stat.title}</div>
              <div className={styles.statTrend}>
                <ArrowUpRight size={14} />
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} size={20} />
          <input 
            type="text"
            placeholder="Search your contributions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.contributionsList}>
        {contributions.map(contribution => (
          <div key={contribution.id} className={styles.contributionCard}>
            <div className={styles.cardImage} style={{ backgroundImage: `url(${contribution.image})` }}>
              <div className={styles.cardCategory}>{contribution.type}</div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3>{contribution.project}</h3>
                <div className={`${styles.status} ${styles[contribution.status.toLowerCase()]}`}>
                  <CheckCircle size={16} />
                  {contribution.status}
                </div>
              </div>
              
              <p className={styles.description}>{contribution.description}</p>

              <div className={styles.cardMeta}>
                <div className={styles.metaItem}>
                  <Calendar size={16} />
                  <span>{contribution.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <Clock size={16} />
                  <span>{contribution.timeToComplete}</span>
                </div>
                <div className={styles.metaItem}>
                  <Users size={16} />
                  <span>{contribution.collaborators} collaborators</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.engagement}>
                  <div className={styles.engagementItem}>
                    <Heart size={16} />
                    <span>{contribution.kudos}</span>
                  </div>
                  <div className={styles.engagementItem}>
                    <MessageSquare size={16} />
                    <span>{contribution.comments}</span>
                  </div>
                </div>
                <div className={styles.impact} data-impact={contribution.impact}>
                  {contribution.impact} Impact
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributions; 