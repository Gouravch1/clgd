import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Building2, GraduationCap, User } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Auth.module.css';

const SignIn = ({ onSwitchMode }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    studentId: '', // Optional for students
    orgId: '', // Optional for organizations
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/signin/${userType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...(userType === 'student' ? { studentId: formData.studentId } : { orgId: formData.orgId })
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Sign in failed');

      // Store essential information
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userType', userType);
      localStorage.setItem('userEmail', formData.email);
      
      // Store additional user info if provided by the backend
      if (data.userData) {
        localStorage.setItem('userData', JSON.stringify(data.userData));
      }

      toast.success(`Welcome back${data.userData?.name ? `, ${data.userData.name}` : ''}!`);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <ToastContainer theme="dark" />
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>
            {userType === 'student' 
              ? 'Access your academic journey'
              : 'Manage your organization'}
          </p>
        </div>

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

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            <div className={styles.inputGroup}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                className={styles.input}
                type="email"
                placeholder={`${userType === 'student' ? 'University' : 'Corporate'} Email Address`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            {userType === 'student' && (
              <div className={styles.inputGroup}>
                <User className={styles.inputIcon} size={20} />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Student ID (Optional)"
                  value={formData.studentId}
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                />
              </div>
            )}

            {userType === 'organization' && (
              <div className={styles.inputGroup}>
                <Building2 className={styles.inputIcon} size={20} />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Organization ID (Optional)"
                  value={formData.orgId}
                  onChange={(e) => setFormData({...formData, orgId: e.target.value})}
                />
              </div>
            )}

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
              <button
                type="button"
                className={`${styles.passwordToggle} ${showPassword ? styles.visible : ''}`}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              />
            </div>
          </div>

          <div className={styles.options}>
            <label className={styles.rememberMe}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Remember me</span>
            </label>
            <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? (
              <div className={styles.loadingWrapper}>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
                <div className={styles.loadingDot}></div>
              </div>
            ) : (
              <>
                Sign In
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className={styles.switchMode}>
          Don't have an account?{' '}
          <button className={styles.switchButton} onClick={onSwitchMode}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;