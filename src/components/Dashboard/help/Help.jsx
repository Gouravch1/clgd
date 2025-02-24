import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Book,
  MessageCircle,
  Video,
  FileText,
  Search,
  ChevronRight,
  PlayCircle,
  ArrowRight,
  Users,
  Mail,
  Globe,
  Star
} from 'lucide-react';
import styles from './Help.module.css';
import HelpModal from './HelpModal';
import { 
  faqData, 
  videoTutorials, 
  popularArticles, 
  supportChannels, 
  categories 
} from './helpData';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [filteredContent, setFilteredContent] = useState({
    articles: popularArticles,
    videos: videoTutorials,
    faqs: faqData
  });

  useEffect(() => {
    const filtered = {
      articles: popularArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      videos: videoTutorials.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      faqs: faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };
    setFilteredContent(filtered);
  }, [searchQuery]);

  const openModal = (content, type) => {
    setModalContent(content);
    setModalType(type);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>How can we help you?</h1>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search for help articles, tutorials, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.quickLinks}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.quickLink} ${activeCategory === category.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon === 'Book' && <Book size={20} />}
            {category.icon === 'Video' && <Video size={20} />}
            {category.icon === 'HelpCircle' && <HelpCircle size={20} />}
            {category.icon === 'FileText' && <FileText size={20} />}
            {category.icon === 'Users' && <Users size={20} />}
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.mainContent}>
        <div className={styles.popularSection}>
          <h2>Popular Articles</h2>
          <div className={styles.articleGrid}>
            {filteredContent.articles.map((article, index) => (
              <div 
                key={article.id} 
                className={styles.articleCard}
                onClick={() => openModal(article, 'article')}
              >
                <div className={styles.articleHeader}>
                  <span className={styles.articleCategory}>{article.category}</span>
                  <div className={styles.articleRating}>
                    <Star size={16} />
                    <span>{article.rating}</span>
                  </div>
                </div>
                <h3>{article.title}</h3>
                <div className={styles.articleMeta}>
                  <span>{article.views} views</span>
                  <button className={styles.readMore}>
                    Read More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.videoSection}>
          <h2>Video Tutorials</h2>
          <div className={styles.videoGrid}>
            {filteredContent.videos.map((video) => (
              <div 
                key={video.id} 
                className={styles.videoCard}
                onClick={() => openModal(video, 'video')}
              >
                <div className={styles.thumbnailContainer}>
                  <div className={styles.thumbnail} />
                  <button className={styles.playButton}>
                    <PlayCircle size={40} />
                  </button>
                  <span className={styles.duration}>{video.duration}</span>
                </div>
                <h3>{video.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.supportSection}>
          {supportChannels.map((channel) => (
            <div key={channel.id} className={styles.supportCard}>
              <div className={styles.supportIcon}>
                {channel.icon === 'MessageCircle' && <MessageCircle size={24} />}
                {channel.icon === 'Mail' && <Mail size={24} />}
                {channel.icon === 'Users' && <Users size={24} />}
              </div>
              <h3>{channel.title}</h3>
              <p>{channel.description}</p>
              <button className={styles.supportButton}>
                Get Support
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {modalContent && (
        <HelpModal
          content={modalContent}
          type={modalType}
          onClose={() => {
            setModalContent(null);
            setModalType(null);
          }}
        />
      )}
    </div>
  );
};

export default Help; 