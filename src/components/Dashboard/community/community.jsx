import React, { useState } from 'react';
import './Community.css';
import { Search, Plus, UserPlus, Users, MessageSquare, Star, Settings, 
         TrendingUp, Zap, Award, Filter, ArrowUp } from 'lucide-react';
import CreateCommunity from './createcommunity/CreateCommunity';

const Community = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [communities] = useState([
    { 
      id: 1, 
      name: 'Developer Hub', 
      members: 1234,
      description: 'A community for developers to share knowledge and collaborate',
      category: 'Development',
      isVerified: true,
      unreadMessages: 5,
      trending: true,
      activity: '89%',
      posts: 234
    },
    { 
      id: 2, 
      name: 'Design Masters', 
      members: 567,
      description: 'UI/UX designers sharing insights and inspiration',
      category: 'Design',
      isVerified: true,
      unreadMessages: 0,
      trending: false,
      activity: '75%',
      posts: 156
    },
    { 
      id: 3, 
      name: 'AI Innovators', 
      members: 892,
      description: 'Exploring the future of artificial intelligence',
      category: 'Technology',
      isVerified: false,
      unreadMessages: 12,
      trending: true,
      activity: '92%',
      posts: 432
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filters = [
    { id: 'all', label: 'All Communities' },
    { id: 'trending', label: 'Trending' },
    { id: 'verified', label: 'Verified' },
    { id: 'newest', label: 'Newest' }
  ];

  const filteredCommunities = communities.filter(community => {
    if (activeFilter === 'trending') return community.trending;
    if (activeFilter === 'verified') return community.isVerified;
    return true;
  });

  return (
    <div className="community-container">
      <div className="community-header">
        <div className="header-left">
          <h1>Communities</h1>
          <div className="community-stats-summary">
            <div className="stat-item">
              <Users size={16} />
              <span>{communities.length} Communities</span>
            </div>
            <div className="stat-item">
              <MessageSquare size={16} />
              <span>1.2k Discussions</span>
            </div>
            <div className="stat-item">
              <TrendingUp size={16} />
              <span>85% Active</span>
            </div>
          </div>
        </div>
        <div className="community-actions">
          <button className="action-btn join-btn">
            <UserPlus size={20} /> Join Community
          </button>
          <button 
            className="action-btn create-btn" 
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={20} /> Create Community
          </button>
        </div>
      </div>

      <div className="community-toolbar">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search communities..."
            className="search-input"
          />
        </div>
        <div className="filter-tabs">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <button className="filter-btn">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="communities-grid">
        {filteredCommunities.map(community => (
          <div key={community.id} className="community-card">
            <div className="card-header">
              <div className="community-avatar">
                {community.name.charAt(0)}
              </div>
              <div className="card-header-info">
                <div className="name-wrapper">
                  <h3>{community.name}</h3>
                  {community.isVerified && (
                    <Star className="verified-badge" size={16} />
                  )}
                </div>
                <span className="category-tag">{community.category}</span>
              </div>
            </div>
            
            <p className="community-description">{community.description}</p>
            
            <div className="community-metrics">
              <div className="metric">
                <Users size={16} />
                <span>{community.members.toLocaleString()}</span>
                <label>Members</label>
              </div>
              <div className="metric">
                <MessageSquare size={16} />
                <span>{community.posts}</span>
                <label>Posts</label>
              </div>
              <div className="metric">
                <Zap size={16} />
                <span>{community.activity}</span>
                <label>Activity</label>
              </div>
            </div>

            {community.trending && (
              <div className="trending-badge">
                <TrendingUp size={14} /> Trending
              </div>
            )}

            <div className="card-actions">
              <button className="join-community-btn">Join Community</button>
              <button className="view-community-btn">View</button>
            </div>
          </div>
        ))}
      </div>

      <CreateCommunity 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Community; 