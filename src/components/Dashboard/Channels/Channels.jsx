import React, { useState } from 'react';
import { 
  Hash, 
  BookOpen, 
  Users, 
  Briefcase, 
  Search,
  Plus,
  Settings
} from 'lucide-react';
import styles from './Channels.module.css';

const Channels = () => {
  const [activeChannel, setActiveChannel] = useState('general');

  const channelCategories = [
    {
      title: "Academic Channels",
      icon: <BookOpen size={20} />,
      channels: [
        { id: 'cs-dept', name: 'Computer Science', type: 'academic' },
        { id: 'engineering', name: 'Engineering', type: 'academic' },
        { id: 'study-group', name: 'Study Groups', type: 'academic' }
      ]
    },
    {
      title: "Campus Life",
      icon: <Users size={20} />,
      channels: [
        { id: 'events', name: 'Events & Announcements', type: 'campus' },
        { id: 'clubs', name: 'Club Activities', type: 'campus' },
        { id: 'student-council', name: 'Student Council', type: 'campus' }
      ]
    },
    {
      title: "Career & Opportunities",
      icon: <Briefcase size={20} />,
      channels: [
        { id: 'internships', name: 'Internship Updates', type: 'career' },
        { id: 'placements', name: 'Placement Cell', type: 'career' },
        { id: 'alumni', name: 'Alumni Network', type: 'career' }
      ]
    }
  ];

  return (
    <div className={styles.channelsContainer}>
      {/* Channels Header */}
      <div className={styles.channelsHeader}>
        <h1>Channels</h1>
        <div className={styles.headerActions}>
          <button className={styles.createBtn}>
            <Plus size={20} />
            Create Channel
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <Search size={16} />
        <input type="text" placeholder="Search channels..." />
      </div>

      {/* Channels Grid */}
      <div className={styles.channelsGrid}>
        {/* Categories List */}
        <div className={styles.categoriesList}>
          {channelCategories.map((category, index) => (
            <div key={index} className={styles.category}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className={styles.channelsList}>
                {category.channels.map((channel) => (
                  <button
                    key={channel.id}
                    className={`${styles.channelItem} ${
                      activeChannel === channel.id ? styles.active : ''
                    }`}
                    onClick={() => setActiveChannel(channel.id)}
                  >
                    <Hash size={16} />
                    <span>{channel.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Channel Content Area */}
        <div className={styles.channelContent}>
          <div className={styles.channelHeader}>
            <div className={styles.channelInfo}>
              <Hash size={20} />
              <h2>{channelCategories
                .flatMap(cat => cat.channels)
                .find(ch => ch.id === activeChannel)?.name}</h2>
            </div>
            <button className={styles.settingsBtn}>
              <Settings size={20} />
            </button>
          </div>
          {/* Channel content will go here */}
          <div className={styles.channelMessages}>
            {/* Messages and interactions will be implemented here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;