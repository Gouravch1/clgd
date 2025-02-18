import { useState } from 'react';
import { 
  Home, 
  Users, 
  Building2, 
  MessageSquare, 
  GitFork, 
  BarChart3, 
  HelpCircle,
  ChevronsRight,
  ChevronsLeft
} from 'lucide-react';
import './Dashboard.css';
import Community from './community/community';

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState('home');

  const menuItems = [
    { title: 'Home', icon: <Home size={20} />, path: 'home' },
    { title: 'Community', icon: <Users size={20} />, path: 'community' },
    { title: 'Organizations', icon: <Building2 size={20} />, path: 'org' },
    { title: 'Channels', icon: <MessageSquare size={20} />, path: 'channels' },
    { title: 'Contributions', icon: <GitFork size={20} />, path: 'contributions' },
    { title: 'Insights', icon: <BarChart3 size={20} />, path: 'insights' },
    { title: 'Help', icon: <HelpCircle size={20} />, path: 'help' }
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              onClick={(e) => {
                e.preventDefault();
                setCurrentSection(item.path);
              }}
              href={`#${item.path}`}
              className={`nav-item ${currentSection === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.title}</span>
            </a>
          ))}
        </nav>
        
        <div className="collapse-toggle">
          <ChevronsRight size={20} />
        </div>
      </aside>

      <main className="main-content">
        <div className="content-body">
          {currentSection === 'community' && <Community />}
          {/* Add other sections here with similar conditional rendering */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;