import React, { useState } from 'react';
import { 
  Users, 
  Building2,
  MessageSquare, 
  GitFork, 
  BarChart3,
  ArrowUpRight,
  Activity,
  Globe,
  Heart,
  Star,
  Clock,
  Target,
  TrendingUp,
  Award,
  Zap,
  CheckCircle,
  Calendar,
  ChevronDown
} from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
  const [timeframe, setTimeframe] = useState('week');
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);

  const timeframeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];

  const overallStats = [
    { 
      title: "Total Impact Score", 
      value: "8,547", 
      change: "+12%",
      icon: <Star size={20} />,
      color: "#FFD700"
    },
    { 
      title: "Active Organizations", 
      value: "156", 
      change: "+8",
      icon: <Building2 size={20} />,
      color: "#4D96FF"
    },
    { 
      title: "Community Members", 
      value: "2.3K", 
      change: "+256",
      icon: <Users size={20} />,
      color: "#FF6B6B"
    },
    { 
      title: "Total Contributions", 
      value: "1,892", 
      change: "+143",
      icon: <GitFork size={20} />,
      color: "#20B2AA"
    }
  ];

  const organizationPerformance = [
    {
      name: "Tech for Change",
      contributionsCount: 234,
      membersCount: 45,
      activeProjects: 12,
      impactScore: 892,
      trend: "+23%",
      category: "Technology"
    },
    {
      name: "Green Earth Initiative",
      contributionsCount: 189,
      membersCount: 38,
      activeProjects: 8,
      impactScore: 756,
      trend: "+15%",
      category: "Environmental"
    },
    {
      name: "Education First",
      contributionsCount: 167,
      membersCount: 29,
      activeProjects: 6,
      impactScore: 678,
      trend: "+18%",
      category: "Education"
    }
  ];

  const sectionOverviews = [
    {
      title: "Community Highlights",
      stats: [
        { label: "Active Members", value: "2.3K" },
        { label: "New This Week", value: "156" },
        { label: "Engagement Rate", value: "78%" }
      ],
      icon: <Users size={24} />,
      color: "#FF6B6B"
    },
    {
      title: "Contribution Metrics",
      stats: [
        { label: "Total PRs", value: "1.2K" },
        { label: "Merged", value: "89%" },
        { label: "Impact Score", value: "8.7/10" }
      ],
      icon: <GitFork size={24} />,
      color: "#20B2AA"
    },
    {
      title: "Channel Activity",
      stats: [
        { label: "Active Channels", value: "45" },
        { label: "Messages/Day", value: "2.1K" },
        { label: "Response Rate", value: "92%" }
      ],
      icon: <MessageSquare size={24} />,
      color: "#4D96FF"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.welcomeBadge}>
            <Zap size={16} />
            <span>Welcome back, John!</span>
          </div>
          <h1>Your Impact Dashboard</h1>
          <p>Track your organization's performance and global impact</p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.impactScore}>
            <div className={styles.scoreRing}>
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="54" className={styles.scoreBackground} />
                <circle cx="60" cy="60" r="54" className={styles.scoreProgress} style={{ strokeDashoffset: 100 }} />
              </svg>
              <div className={styles.scoreValue}>
                <span>92</span>
                <small>Impact Score</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {overallStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.glowBg} style={{ background: stat.color }} />
            <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <h3>{stat.title}</h3>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statChange} style={{ color: stat.color }}>
                <ArrowUpRight size={16} />
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.sectionOverviews}>
          <h2 className={styles.sectionTitle}>Section Insights</h2>
          <div className={styles.sectionGrid}>
            {sectionOverviews.map((section, index) => (
              <div key={index} className={styles.sectionCard}>
                <div className={styles.sectionHeader} style={{ color: section.color }}>
                  {section.icon}
                  <h3>{section.title}</h3>
                </div>
                <div className={styles.sectionStats}>
                  {section.stats.map((stat, idx) => (
                    <div key={idx} className={styles.sectionStat}>
                      <span className={styles.statLabel}>{stat.label}</span>
                      <span className={styles.statValue}>{stat.value}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.cardAction}>
                  <span>View Details</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.organizationsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Performing Organizations</h2>
            <div className={styles.dropdownContainer}>
              <button 
                className={styles.dropdownTrigger}
                onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
              >
                <span>{timeframeOptions.find(opt => opt.value === timeframe)?.label}</span>
                <ChevronDown 
                  size={16} 
                  className={`${styles.chevron} ${isTimeframeOpen ? styles.chevronOpen : ''}`}
                />
              </button>
              {isTimeframeOpen && (
                <div className={styles.dropdownMenu}>
                  {timeframeOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`${styles.dropdownItem} ${timeframe === option.value ? styles.active : ''}`}
                      onClick={() => {
                        setTimeframe(option.value);
                        setIsTimeframeOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.orgGrid}>
            {organizationPerformance.map((org, index) => (
              <div key={index} className={styles.orgCard}>
                <div className={styles.orgHeader}>
                  <h3>{org.name}</h3>
                  <span className={styles.orgCategory}>{org.category}</span>
                </div>
                <div className={styles.orgStats}>
                  <div className={styles.orgStat}>
                    <GitFork size={16} />
                    <span>{org.contributionsCount} contributions</span>
                  </div>
                  <div className={styles.orgStat}>
                    <Users size={16} />
                    <span>{org.membersCount} members</span>
                  </div>
                  <div className={styles.orgStat}>
                    <Target size={16} />
                    <span>{org.activeProjects} active projects</span>
                  </div>
                </div>
                <div className={styles.orgProgress}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${(org.impactScore / 1000) * 100}%` }}
                    />
                  </div>
                  <div className={styles.progressLabel}>
                    <span>Impact Score</span>
                    <span>{org.impactScore}</span>
                  </div>
                </div>
                <div className={styles.orgFooter}>
                  <div className={styles.orgTrend}>
                    <TrendingUp size={16} />
                    {org.trend}
                  </div>
                  <button className={styles.viewButton}>
                    View Details
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;