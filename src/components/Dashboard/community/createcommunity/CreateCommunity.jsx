import React, { useState } from 'react';
import { X, Upload, Lock, Globe, Users } from 'lucide-react';
import './CreateCommunity.css';
import CommunityPage from '../joincommunity/CommunityPage';

const CreateCommunity = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    privacy: 'public',
    image: null
  });

  const [showJoinCommunity, setShowJoinCommunity] = useState(false);

  const categories = [
    'Development',
    'Design',
    'Technology',
    'AI & ML',
    'Web3',
    'Gaming',
    'Education',
    'Other'
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    onClose();
  };

  const handleJoinClick = () => {
    setShowJoinCommunity(true);
  };

  if (!isOpen) return null;

  return (
    <div className="create-community-container">
      {!showJoinCommunity ? (
        <>
          <div className="create-community-overlay">
            <div className="create-community-modal">
              <div className="modal-header">
                <h2>Create a New Community</h2>
                <button className="close-btn" onClick={onClose}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="community-form">
                <div className="form-section">
                  <div className="image-upload">
                    <input
                      type="file"
                      id="community-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      hidden
                    />
                    <label htmlFor="community-image" className="image-upload-label">
                      {formData.image ? (
                        <img src={formData.image} alt="Community" className="preview-image" />
                      ) : (
                        <>
                          <Upload size={24} />
                          <span>Upload Community Image</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <label>
                    Community Name
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter community name"
                      required
                    />
                  </label>
                </div>

                <div className="form-section">
                  <label>
                    Description
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your community"
                      rows="4"
                      required
                    />
                  </label>
                </div>

                <div className="form-section">
                  <label>
                    Category
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="form-section">
                  <label>Privacy Settings</label>
                  <div className="privacy-options">
                    <label className="privacy-option">
                      <input
                        type="radio"
                        name="privacy"
                        value="public"
                        checked={formData.privacy === 'public'}
                        onChange={(e) => setFormData({ ...formData, privacy: e.target.value })}
                      />
                      <Globe size={20} />
                      <div>
                        <span>Public</span>
                        <small>Anyone can view and join</small>
                      </div>
                    </label>
                    <label className="privacy-option">
                      <input
                        type="radio"
                        name="privacy"
                        value="private"
                        checked={formData.privacy === 'private'}
                        onChange={(e) => setFormData({ ...formData, privacy: e.target.value })}
                      />
                      <Lock size={20} />
                      <div>
                        <span>Private</span>
                        <small>Only approved members can join</small>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="create-btn">
                    Create Community
                  </button>
                </div>
              </form>
            </div>
          </div>
          <button onClick={handleJoinClick} className="join-button">
            Join Community
          </button>
        </>
      ) : (
        <CommunityPage />
      )}
    </div>
  );
};

export default CreateCommunity;