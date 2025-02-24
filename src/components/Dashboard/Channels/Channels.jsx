import React, { useState } from 'react';
import { 
  Hash, 
  BookOpen, 
  Users, 
  Briefcase, 
  Search,
  Plus,
  Settings,
  MessageSquare,
  Code,
  Globe,
  Zap
} from 'lucide-react';
import styles from './Channels.module.css';

const Channels = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const channelCategories = [
    {
      title: "Academic Channels",
      icon: <BookOpen size={20} />,
      channels: [
        { id: 'cs-dept', name: 'Computer Science', type: 'academic', unread: 3 },
        { id: 'engineering', name: 'Engineering', type: 'academic', unread: 0 },
        { id: 'study-group', name: 'Study Groups', type: 'academic', unread: 5 }
      ]
    },
    {
      title: "Community Channels",
      icon: <Users size={20} />,
      channels: [
        { id: 'general', name: 'General Discussion', type: 'community', unread: 0 },
        { id: 'announcements', name: 'Announcements', type: 'community', unread: 2 },
        { id: 'events', name: 'Events', type: 'community', unread: 1 }
      ]
    },
    {
      title: "Project Channels",
      icon: <Code size={20} />,
      channels: [
        { id: 'hackathon', name: 'Hackathon Projects', type: 'project', unread: 0 },
        { id: 'opensource', name: 'Open Source', type: 'project', unread: 7 },
        { id: 'innovations', name: 'Innovations', type: 'project', unread: 0 }
      ]
    }
  ];

  const filteredCategories = channelCategories.map(category => ({
    ...category,
    channels: category.channels.filter(channel =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.channels.length > 0);

  return (
    <div className={styles.channelsContainer}>
      <div className={styles.channelsHeader}>
        <h1>Channels</h1>
        <div className={styles.headerActions}>
          <button className={styles.newChannelButton}>
            <Plus size={20} />
            New Channel
          </button>
          <button className={styles.settingsButton}>
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <Search size={20} />
        <input
          type="text"
          placeholder="Search channels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.channelsGrid}>
        <div className={styles.categoriesList}>
          {filteredCategories.map((category, index) => (
            <div key={index} className={styles.category}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className={styles.channelsList}>
                {category.channels.map((channel) => (
                  <button
                    key={channel.id}
                    className={`${styles.channelItem} ${activeChannel === channel.id ? styles.active : ''}`}
                    onClick={() => setActiveChannel(channel.id)}
                  >
                    <Hash size={16} />
                    <span>{channel.name}</span>
                    {channel.unread > 0 && (
                      <span className={styles.unreadBadge}>{channel.unread}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.channelContent}>
          <div className={styles.channelHeader}>
            <div className={styles.channelInfo}>
              <Hash size={20} />
              <h2>{channelCategories.flatMap(c => c.channels).find(c => c.id === activeChannel)?.name}</h2>
            </div>
          </div>
          <div className={styles.channelMessages}>
            <div className={styles.emptyState}>
              <MessageSquare size={48} />
              <h3>Welcome to the channel!</h3>
              <p>This is the start of the conversation. Be the first one to say hello!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;