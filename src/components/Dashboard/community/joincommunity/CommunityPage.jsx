import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users, MessageSquare, Share2, ThumbsUp, 
  BookmarkPlus, MoreVertical, Send
} from 'lucide-react';
import './CommunityPage.css';

const CommunityPage = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "SC",
      content: "Just shared my notes on Data Structures! Check them out in the resources section 📚",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 5
    },
    {
      id: 2,
      author: "Mike Johnson",
      avatar: "MJ",
      content: "Anyone interested in forming a study group for the upcoming AI workshop? 🤖",
      timestamp: "4 hours ago",
      likes: 15,
      comments: 12,
      shares: 3
    }
  ]);

  useEffect(() => {
    // Here you would fetch community details based on the ID
    // For now using mock data
    setCommunity({
      id,
      name: "Developer Hub",
      members: 1234,
      description: "A community for developers to share knowledge and collaborate",
      category: "Development"
    });
  }, [id]);

  if (!community) return <div>Loading...</div>;

  return (
    <div className="community-page">
      <div className="community-header">
        <div className="community-info">
          <div className="community-avatar">{community.name[0]}</div>
          <div className="community-details">
            <h1>{community.name}</h1>
            <p>{community.description}</p>
            <div className="community-stats">
              <span><Users size={16} /> {community.members} members</span>
              <span><MessageSquare size={16} /> {posts.length} posts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="community-content">
        <div className="create-post">
          <input 
            type="text" 
            placeholder="Share something with the community..."
            className="post-input"
          />
          <button className="post-btn">
            <Send size={20} />
          </button>
        </div>

        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-author">
                  <div className="author-avatar">{post.avatar}</div>
                  <div className="author-info">
                    <h3>{post.author}</h3>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
                <button className="more-btn">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="post-content">
                <p>{post.content}</p>
              </div>

              <div className="post-actions">
                <button>
                  <ThumbsUp size={16} /> {post.likes}
                </button>
                <button>
                  <MessageSquare size={16} /> {post.comments}
                </button>
                <button>
                  <Share2 size={16} /> {post.shares}
                </button>
                <button>
                  <BookmarkPlus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;