import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  AlertTriangle,
  Building,
  Flag,
  Users,
  Mail,
  Phone,
  Upload,
  X,
  AlertCircle,
  Clock,
  Loader,
  Globe,
  UserPlus
} from 'lucide-react';
import styles from './IssueForm.module.css';
import { categories, impactLevels } from '../../../data/mockIssues';

// Mock clubs data (you should fetch this from your backend)
const clubs = [
  { id: 1, name: 'NSS Club' },
  { id: 2, name: 'Rotaract Club' },
  { id: 3, name: 'Social Service Club' },
  { id: 4, name: 'Environmental Club' },
  { id: 5, name: 'Community Outreach Club' },
  { id: 6, name: 'Youth Development Club' }
];

// Mock colleges data (you should fetch this from your backend)
const colleges = [
  { id: 1, name: 'Delhi Technological University' },
  { id: 2, name: 'IIT Delhi' },
  { id: 3, name: 'Netaji Subhas University of Technology' },
  { id: 4, name: 'BITS Pilani' },
  { id: 5, name: 'VIT Vellore' },
  { id: 6, name: 'NIT Trichy' }
];

const IssueForm = ({ onSubmit, currentUser }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isClubMember, setIsClubMember] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: {
      country: '',
      city: '',
      area: ''
    },
    college: '',
    club: '',
    organization: {
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
    },
    category: '',
    impact: '',
    urgencyLevel: '',
    images: []
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHAR_COUNT = 1000;
  
  useEffect(() => {
    setCharCount(formData.description.length);
  }, [formData.description]);

  const urgencyLevels = [
    {
      level: 'critical',
      label: 'Critical Emergency',
      description: 'Immediate action required (within 24 hours)',
      icon: <AlertTriangle className={styles.criticalIcon} />,
      color: '#ef4444'
    },
    {
      level: 'high',
      label: 'High Priority',
      description: 'Urgent attention needed (2-3 days)',
      icon: <AlertCircle className={styles.highIcon} />,
      color: '#f59e0b'
    },
    {
      level: 'medium',
      label: 'Medium Priority',
      description: 'Should be addressed (within a week)',
      icon: <Clock className={styles.mediumIcon} />,
      color: '#20B2AA'
    },
    {
      level: 'low',
      label: 'Low Priority',
      description: 'Can be scheduled (within 2 weeks)',
      icon: <Loader className={styles.lowIcon} />,
      color: '#6366f1'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validations
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.location.country.trim()) newErrors.country = 'Country is required';
    if (!formData.location.city.trim()) newErrors.city = 'City is required';
    if (!formData.location.area.trim()) newErrors.area = 'Area is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.impact) newErrors.impact = 'Impact level is required';
    if (!formData.urgencyLevel) newErrors.urgencyLevel = 'Urgency level is required';

    // Club/Organization validation
    if (isClubMember) {
      if (!formData.college.trim()) newErrors.college = 'Please enter your college name';
      if (!formData.club.trim()) newErrors.club = 'Please enter your club name';
    } else {
      if (!formData.organization.name.trim()) newErrors.organizationName = 'Organization name is required';
      if (!formData.organization.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
      if (!formData.organization.email.trim()) newErrors.email = 'Email is required';
      if (!formData.organization.phone.trim()) newErrors.phone = 'Phone is required';
      
      // Email and phone validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.organization.email && !emailRegex.test(formData.organization.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    return newErrors;
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.target.files || e.dataTransfer.files);
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length + formData.images.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const newImages = validFiles.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5)
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        navigate('/dashboard');
      } catch (error) {
        setErrors({ submit: 'Failed to submit the issue. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(errors);
      // Scroll to first error
      const firstError = document.querySelector(`.${styles.error}`);
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>Report New Issue</h2>
        <button className={styles.closeButton} onClick={() => navigate(-1)}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Submission Type Selection */}
        <div className={styles.formSection}>
          <h3>Submission Type</h3>
          <div className={styles.submissionType}>
            <button
              type="button"
              className={`${styles.typeButton} ${isClubMember ? styles.active : ''}`}
              onClick={() => setIsClubMember(true)}
            >
              <Users size={20} />
              Club Member
            </button>
            <button
              type="button"
              className={`${styles.typeButton} ${!isClubMember ? styles.active : ''}`}
              onClick={() => setIsClubMember(false)}
            >
              <Building size={20} />
              Organization
            </button>
          </div>
        </div>

        {/* College and Club Input or Organization Details */}
        <div className={styles.formSection}>
          <h3>{isClubMember ? 'College & Club Details' : 'Organization Details'}</h3>
          {isClubMember ? (
            <>
              <div className={styles.formGroup}>
                <label>Your College/University Name*</label>
                <div className={styles.inputWithIcon}>
                  <Building size={20} />
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="Enter your college/university name"
                    className={errors.college ? styles.error : ''}
                  />
                </div>
                {errors.college && <span className={styles.errorText}>{errors.college}</span>}
                <span className={styles.helperText}>
                  Enter the full name of your educational institution
                </span>
              </div>

              <div className={styles.formGroup}>
                <label>Your Club Name*</label>
                <div className={styles.inputWithIcon}>
                  <Users size={20} />
                  <input
                    type="text"
                    value={formData.club}
                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                    placeholder="Enter your club name"
                    className={errors.club ? styles.error : ''}
                  />
                </div>
                {errors.club && <span className={styles.errorText}>{errors.club}</span>}
                <span className={styles.helperText}>
                  Enter the official name of your club or student organization
                </span>
              </div>
            </>
          ) : (
            <>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Organization Name*</label>
                  <div className={styles.inputWithIcon}>
                    <Building size={20} />
                    <input
                      type="text"
                      value={formData.organization.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        organization: { ...formData.organization, name: e.target.value }
                      })}
                      placeholder="Enter organization name"
                      className={errors.organizationName ? styles.error : ''}
                    />
                  </div>
                  {errors.organizationName && <span className={styles.errorText}>{errors.organizationName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Contact Person*</label>
                  <div className={styles.inputWithIcon}>
                    <Users size={20} />
                    <input
                      type="text"
                      value={formData.organization.contactPerson}
                      onChange={(e) => setFormData({
                        ...formData,
                        organization: { ...formData.organization, contactPerson: e.target.value }
                      })}
                      placeholder="Enter contact person name"
                      className={errors.contactPerson ? styles.error : ''}
                    />
                  </div>
                  {errors.contactPerson && <span className={styles.errorText}>{errors.contactPerson}</span>}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email*</label>
                  <div className={styles.inputWithIcon}>
                    <Mail size={20} />
                    <input
                      type="email"
                      value={formData.organization.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        organization: { ...formData.organization, email: e.target.value }
                      })}
                      placeholder="Enter email address"
                      className={errors.email ? styles.error : ''}
                    />
                  </div>
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Phone*</label>
                  <div className={styles.inputWithIcon}>
                    <Phone size={20} />
                    <input
                      type="tel"
                      value={formData.organization.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        organization: { ...formData.organization, phone: e.target.value }
                      })}
                      placeholder="Enter phone number with country code"
                      className={errors.phone ? styles.error : ''}
                    />
                  </div>
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Issue Details Section */}
        <div className={styles.formSection}>
          <h3>Issue Details</h3>
          
          <div className={styles.formGroup}>
            <label>Issue Title*</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter a clear title for the issue"
              className={errors.title ? styles.error : ''}
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Description*</label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHAR_COUNT) {
                  setFormData({ ...formData, description: e.target.value });
                }
              }}
              placeholder="Describe the issue in detail, including its impact and required support"
              rows={6}
              className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
            />
            <div className={styles.charCount}>
              {charCount}/{MAX_CHAR_COUNT} characters
            </div>
            {errors.description && <span className={styles.errorText}>{errors.description}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Category*</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={errors.category ? styles.error : ''}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <span className={styles.errorText}>{errors.category}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Impact Level*</label>
              <select
                value={formData.impact}
                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                className={errors.impact ? styles.error : ''}
              >
                <option value="">Select Impact Level</option>
                {impactLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              {errors.impact && <span className={styles.errorText}>{errors.impact}</span>}
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className={styles.formSection}>
          <h3>Location Details</h3>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Country*</label>
              <div className={styles.inputWithIcon}>
                <Globe size={20} />
                <input
                  type="text"
                  value={formData.location.country}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, country: e.target.value }
                  })}
                  placeholder="Enter country"
                  className={errors.country ? styles.error : ''}
                />
              </div>
              {errors.country && <span className={styles.errorText}>{errors.country}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>City*</label>
              <div className={styles.inputWithIcon}>
                <MapPin size={20} />
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value }
                  })}
                  placeholder="Enter city"
                  className={errors.city ? styles.error : ''}
                />
              </div>
              {errors.city && <span className={styles.errorText}>{errors.city}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Area*</label>
              <div className={styles.inputWithIcon}>
                <MapPin size={20} />
                <input
                  type="text"
                  value={formData.location.area}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, area: e.target.value }
                  })}
                  placeholder="Enter area"
                  className={errors.area ? styles.error : ''}
                />
              </div>
              {errors.area && <span className={styles.errorText}>{errors.area}</span>}
            </div>
          </div>
        </div>

        {/* Urgency Level Selection */}
        <div className={styles.formGroup}>
          <label>Urgency Level*</label>
          <div className={styles.urgencyGrid}>
            {urgencyLevels.map(urgency => (
              <div
                key={urgency.level}
                className={`${styles.urgencyCard} ${formData.urgencyLevel === urgency.level ? styles.selected : ''}`}
                onClick={() => setFormData({ ...formData, urgencyLevel: urgency.level })}
                style={{ '--urgency-color': urgency.color }}
              >
                <div className={styles.urgencyIcon}>{urgency.icon}</div>
                <div className={styles.urgencyInfo}>
                  <h4>{urgency.label}</h4>
                  <p>{urgency.description}</p>
                </div>
              </div>
            ))}
          </div>
          {errors.urgencyLevel && <span className={styles.errorText}>{errors.urgencyLevel}</span>}
        </div>

        {/* Image Upload */}
        <div className={styles.formGroup}>
          <label>Upload Images (Max 5)</label>
          <div
            className={`${styles.dropzone} ${dragActive ? styles.dragActive : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className={styles.fileInput}
              style={{ display: 'none' }}
            />
            <div className={styles.dropzoneContent}>
              <Upload size={32} />
              <p>Click to upload or drag & drop</p>
              <span>JPG, PNG, WEBP (max 5MB each)</span>
            </div>
          </div>

          {formData.images.length > 0 && (
            <div className={styles.imagePreviewGrid}>
              {formData.images.map((image, index) => (
                <div key={index} className={styles.imagePreview}>
                  <img src={image.url} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className={styles.removeImage}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {errors.submit && (
          <div className={styles.submitError}>
            {errors.submit}
          </div>
        )}

        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton} 
            onClick={() => {
              const shouldCancel = window.confirm('Are you sure you want to cancel? All progress will be lost.');
              if (shouldCancel) navigate(-1);
            }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className={styles.spinner} />
                Submitting...
              </>
            ) : 'Submit Issue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;