import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, Mail, Lock, User, Building2, Globe, 
  MapPin, Users, Target, Heart, Award, GraduationCap, Eye, EyeOff 
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Auth.module.css';
import OnboardingPopup from './OnboardingPopup';

const SignUp = ({ onSwitchMode }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('student');
  const [currentStep, setCurrentStep] = useState(1);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [formData, setFormData] = useState({
    // Common fields
    email: '',
    password: '',
    confirmPassword: '',
    
    // Student fields
    fullName: '',
    university: '',
    studentId: '',
    country: '',
    major: '', // Main field of study
    academicYear: '', // Current year of study
    department: '', // Department/Faculty
    graduationYear: '', // Expected graduation year
    
    // Organization fields
    orgName: '',
    orgType: '', // NGO, University, Research Institute, etc.
    website: '',
    location: '',
    registrationNumber: '', // Legal registration number
    establishedYear: '', // Year of establishment
    employeeCount: '', // Number of employees
    industryCategory: '', // Primary industry category
  });

  const handleNext = () => {
    if (currentStep < getTotalSteps()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTotalSteps = () => {
    return userType === 'student' ? 3 : 3; // Adjust based on number of steps
  };

  const renderStudentStepContent = (step) => {
    switch(step) {
      case 1:
        return (
          <>
            <div className={styles.inputGroup}>
              <User className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Building2 className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="University/Institution"
                value={formData.university}
                onChange={(e) => setFormData({...formData, university: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <MapPin className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Award className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles.inputGroup}>
              <GraduationCap className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Major"
                value={formData.major}
                onChange={(e) => setFormData({...formData, major: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Users className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Department/Faculty"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Target className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Academic Year"
                value={formData.academicYear}
                onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Award className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Expected Graduation Year"
                value={formData.graduationYear}
                onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                required
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles.inputGroup}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderOrganizationStepContent = (step) => {
    switch(step) {
      case 1:
        return (
          <>
            <div className={styles.inputGroup}>
              <Building2 className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Organization Name"
                value={formData.orgName}
                onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Users className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Organization Type (NGO, University, etc.)"
                value={formData.orgType}
                onChange={(e) => setFormData({...formData, orgType: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <MapPin className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Globe className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="url"
                placeholder="Website"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles.inputGroup}>
              <Target className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Registration Number"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Building2 className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Year Established"
                value={formData.establishedYear}
                onChange={(e) => setFormData({...formData, establishedYear: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Users className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="number"
                placeholder="Number of Employees"
                value={formData.employeeCount}
                onChange={(e) => setFormData({...formData, employeeCount: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Target className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="text"
                placeholder="Industry Category"
                value={formData.industryCategory}
                onChange={(e) => setFormData({...formData, industryCategory: e.target.value})}
                required
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles.inputGroup}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        toast.error('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Password validation
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Prepare request data
      const requestData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Store user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', formData.fullName);

      toast.success('Welcome to the community!');
      
      // Show onboarding popup instead of redirecting
      setShowOnboarding(true);

    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'An error occurred during sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    navigate('/dashboard');
  };

  return (
    <div className={styles.authContainer}>
      <ToastContainer theme="dark" />
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2 className={styles.title}>Join the Movement</h2>
          <p className={styles.subtitle}>
            Step {currentStep} of {getTotalSteps()}
          </p>
        </div>

        {currentStep === 1 && (
          <div className={styles.userTypeToggle}>
            <button
              className={`${styles.toggleBtn} ${userType === 'student' ? styles.active : ''}`}
              onClick={() => setUserType('student')}
            >
              <GraduationCap size={20} />
              Student
            </button>
            <button
              className={`${styles.toggleBtn} ${userType === 'organization' ? styles.active : ''}`}
              onClick={() => setUserType('organization')}
            >
              <Building2 size={20} />
              Organization
            </button>
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          <div className={styles.formSection}>
            {userType === 'student' 
              ? renderStudentStepContent(currentStep)
              : renderOrganizationStepContent(currentStep)}
          </div>

          <div className={styles.buttonGroup}>
            {currentStep > 1 && (
              <button 
                type="button" 
                className={styles.backButton}
                onClick={handleBack}
              >
                <ArrowLeft size={20} />
                Back
              </button>
            )}
            
            {currentStep < getTotalSteps() ? (
              <button 
                type="button" 
                className={styles.nextButton}
                onClick={handleNext}
              >
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <button 
                type="submit" 
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <div className={styles.loadingWrapper}>
                    <div className={styles.loadingDot}></div>
                    <div className={styles.loadingDot}></div>
                    <div className={styles.loadingDot}></div>
                  </div>
                ) : (
                  <>
                    Join Now
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        <div className={styles.switchMode}>
          Already have an account?{' '}
          <button className={styles.switchButton} onClick={onSwitchMode}>
            Sign In
          </button>
        </div>
      </div>

      {showOnboarding && (
        <OnboardingPopup onClose={handleCloseOnboarding} />
      )}
    </div>
  );
};

export default SignUp;