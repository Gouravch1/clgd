import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Users, 
  Building2, 
  MessageSquare, 
  GitFork, 
  BarChart3, 
  HelpCircle,
  MapPin,
  ChevronsRight,
  ChevronsLeft,
  LogOut
} from 'lucide-react';
import './Dashboard.css';
import HomeSection from './home/Home';
import Community from './Community/Community';
import Contributions from './contributions/Contributions';
import Help from './help/Help';
import LocalIssues from './localIssues/LocalIssues';
import Channels from './Channels/Channels'

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { title: 'Dashboard', icon: <HomeIcon size={20} />, path: '/dashboard' },
    { title: 'Community', icon: <Users size={20} />, path: '/dashboard/community' },
    { title: 'Organizations', icon: <Building2 size={20} />, path: '/dashboard/organizations' },
    { title: 'Local Issues', icon: <MapPin size={20} />, path: '/dashboard/local-issues' },
    { title: 'Channels', icon: <MessageSquare size={20} />, path: '/dashboard/Channels' },
    { title: 'Contributions', icon: <GitFork size={20} />, path: '/dashboard/contributions' },
    { title: 'Insights', icon: <BarChart3 size={20} />, path: '/dashboard/insights' },
    { title: 'Help', icon: <HelpCircle size={20} />, path: '/dashboard/help' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/signin');
  };

  const handleLogoutClick = (e) => {
    // Create ripple effect
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('logout-button-ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);

    // Handle logout
    handleLogout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <div className="nav-items">
            {menuItems.map((item, index) => (
              <a 
                key={index} 
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                href={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.title}</span>
              </a>
            ))}
          </div>
          <div className="logout-section">
            <button 
              className="logout-button"
              onClick={handleLogoutClick}
              title="Logout"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
        
        <div className="collapse-toggle">
          <ChevronsRight size={20} />
        </div>
      </aside>

      <main className="main-content">
        <div className="content-body">
          <Routes>
            <Route index element={<HomeSection />} />
            <Route path="community" element={<Community />} />
            <Route path="contributions" element={<Contributions />} />
            <Route path="local-issues/*" element={<LocalIssues />} />
            <Route path="organizations" element={<div>Organizations Section</div>} />
            <Route path="Channels" element={<Channels />} />
            <Route path="insights" element={<div>Insights Section</div>} />
            <Route path="help" element={<Help />} />
            <Route path="*" element={<HomeSection />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;