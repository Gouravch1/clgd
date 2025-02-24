import React from 'react';
import { 
  Users, Building2, Activity, Bell, Zap, ArrowRight, 
  TrendingUp, MessageSquare, Star, Award,
  Trophy, Target, ThumbsUp, Share2
} from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
  // Add sample data
  const recentActivities = [
    {
      type: 'join',
      user: 'Sarah Chen',
      community: 'Computer Science Club',
      time: '2 minutes ago'
    },
    {
      type: 'org',
      user: 'Mike Johnson',
      action: 'created a new organization',
      time: '15 minutes ago'
    },
    {
      type: 'welcome',
      user: 'Alex Thompson',
      joined: 'joined the platform',
      time: '1 hour ago'
    },
    {
      type: 'event',
      user: 'Tech Club',
      title: 'Hackathon 2024',
      time: '2 hours ago'
    }
  ];

  const recommendedCommunities = [
    {
      name: 'Computer Science Club',
      category: 'Technology',
      members: 1234
    },
    {
      name: 'Debate Society',
      category: 'Academic',
      members: 567
    },
    {
      name: 'Photography Club',
      category: 'Arts',
      members: 890
    }
  ];

  const achievements = [
    {
      user: "Sarah Chen",
      avatar: "SC",
      completedTasks: 15,
      badge: "Rising Star",
      points: 450
    },
    {
      user: "Mike Johnson",
      avatar: "MJ",
      completedTasks: 12,
      badge: "Quick Learner",
      points: 380
    },
    {
      user: "Alex Thompson",
      avatar: "AT",
      completedTasks: 10,
      badge: "Team Player",
      points: 320
    }
  ];

  const communityPosts = [
    {
      user: "David Kim",
      avatar: "DK",
      department: "Computer Science",
      content: "Just shared my notes on Data Structures! Check them out in the resources section 📚",
      time: "2 hours ago",
      likes: 24,
      shares: 8
    },
    {
      user: "Emma Wilson",
      avatar: "EW",
      department: "Engineering",
      content: "Created a new study group for Advanced Mathematics. Join us! 🧮",
      time: "4 hours ago",
      likes: 18,
      shares: 5
    }
  ];

  return (
    <div className={styles.homeContainer}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <h3 className={styles.logoText}>SYSTEMIC ALTRUISM</h3>
      </div>

      {/* Welcome Section with Stats */}
      <div className={styles.welcomeHeader}>
        <div className={styles.headerLeft}>
          <h1>Welcome Buddy! 🚀</h1>
          <p className={`${styles.welcomeSubtitle} ${styles.withMargin}`}>
            You are onboarded successfully 😉
          </p>
          <div className={styles.statsOverview}>
            <div className={styles.statItem}>
              <Users size={16} />
              <span>1.2k Active Users</span>
            </div>
            <div className={styles.statItem}>
              <MessageSquare size={16} />
              <span>856 Discussions</span>
            </div>
            <div className={styles.statItem}>
              <TrendingUp size={16} />
              <span>92% Engagement</span>
            </div>
          </div>
        </div>
        
        <div className={styles.quickActions}>
          <button className={`${styles.actionBtn} ${styles.primaryBtn}`}>
            <Building2 size={20} />
            <span>Join Your College</span>
            <ArrowRight size={16} />
          </button>
          <button className={`${styles.actionBtn} ${styles.secondaryBtn}`}>
            <Users size={20} />
            <span>Find Communities</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.mainSection}>
          {/* Achievements Section */}
          <div className={styles.achievementsSection}>
            <div className={styles.sectionHeader}>
              <Trophy size={24} className={styles.headerIcon} />
              <h2>Top Achievers</h2>
            </div>
            <div className={styles.achievementsGrid}>
              {achievements.map((achievement, index) => (
                <div key={index} className={styles.achievementCard}>
                  <div className={styles.achievementHeader}>
                    <div className={styles.userAvatar}>{achievement.avatar}</div>
                    <div className={styles.userInfo}>
                      <h3>{achievement.user}</h3>
                      <span className={styles.badge}>
                        <Award size={14} />
                        {achievement.badge}
                      </span>
                    </div>
                  </div>
                  <div className={styles.achievementStats}>
                    <div className={styles.statItem}>
                      <Target size={16} />
                      <span>{achievement.completedTasks} Tasks</span>
                    </div>
                    <div className={styles.statItem}>
                      <Star size={16} />
                      <span>{achievement.points} Points</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Posts Section */}
          <div className={styles.communitySection}>
            <div className={styles.sectionHeader}>
              <MessageSquare size={24} className={styles.headerIcon} />
              <h2>Community Updates</h2>
            </div>
            <div className={styles.postsList}>
              {communityPosts.map((post, index) => (
                <div key={index} className={styles.postCard}>
                  <div className={styles.postHeader}>
                    <div className={styles.userAvatar}>{post.avatar}</div>
                    <div className={styles.postInfo}>
                      <h3>{post.user}</h3>
                      <span className={styles.department}>{post.department}</span>
                      <span className={styles.postTime}>{post.time}</span>
                    </div>
                  </div>
                  <p className={styles.postContent}>{post.content}</p>
                  <div className={styles.postActions}>
                    <button className={styles.actionBtn}>
                      <ThumbsUp size={16} />
                      <span>{post.likes}</span>
                    </button>
                    <button className={styles.actionBtn}>
                      <Share2 size={16} />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Communities - Now on the left */}
        <div className={styles.recommendationsSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerIcon}>
              <Users size={20} />
            </div>
            <h2>Recommended Communities</h2>
          </div>
          <div className={styles.communitiesList}>
            {recommendedCommunities.map((community, index) => (
              <div key={index} className={styles.communityCard}>
                <div className={styles.communityAvatar}>
                  {community.name.charAt(0)}
                </div>
                <div className={styles.communityInfo}>
                  <div className={styles.communityHeader}>
                    <h3>{community.name}</h3>
                    <Award className={styles.verifiedBadge} size={16} />
                  </div>
                  <span className={styles.categoryTag}>{community.category}</span>
                  <div className={styles.communityStats}>
                    <span>{community.members} members</span>
                    <button className={styles.joinBtn}>Join Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed Section - Now on the right and smaller */}
        <div className={styles.feedSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerIcon}>
              <Activity size={20} />
            </div>
            <h2>Live Feed</h2>
          </div>
          <div className={styles.activityFeed}>
            {recentActivities.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  {activity.type === 'join' && <Users size={16} />}
                  {activity.type === 'org' && <Building2 size={16} />}
                  {activity.type === 'welcome' && <Bell size={16} />}
                  {activity.type === 'event' && <Zap size={16} />}
                </div>
                <div className={styles.activityContent}>
                  <p>
                    <strong>{activity.user}</strong>
                    {activity.type === 'join' && ` joined ${activity.community}`}
                    {activity.type === 'org' && ` ${activity.action}`}
                    {activity.type === 'welcome' && ` ${activity.joined}`}
                  </p>
                  <span className={styles.activityTime}>{activity.time}</span>
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