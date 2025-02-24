import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  AlertTriangle,
  Users,
  Building,
  Tag,
  Image as ImageIcon,
  Loader,
  Flag,
  RefreshCw
} from 'lucide-react';
import styles from './LocalIssues.module.css';
import IssueForm from './IssueForm';
import IssuesList from './IssuesList';
import IssueDetails from './IssueDetails';
import { mockIssues, categories, impactLevels } from '../../../data/mockIssues';

const LocalIssues = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    college: '',
    club: '',
    category: '',
    status: 'all',
    urgency: 'all',
    impact: 'all'
  });

  // Fetch issues on component mount
  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      // Simulating API call with mockData
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIssues(mockIssues);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter issues based on search and filters
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = searchTerm === '' || 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCollege = !filters.college || 
      issue.organization.toLowerCase().includes(filters.college.toLowerCase());

    const matchesCategory = !filters.category || 
      issue.category === filters.category;

    const matchesStatus = filters.status === 'all' || 
      issue.status === filters.status;

    const matchesUrgency = filters.urgency === 'all' || 
      issue.urgencyLevel === filters.urgency;

    const matchesImpact = filters.impact === 'all' || 
      issue.impact === filters.impact;

    return matchesSearch && matchesCollege && matchesCategory && 
           matchesStatus && matchesUrgency && matchesImpact;
  });

  const handleCreateIssue = async (newIssue) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const issueWithId = {
        ...newIssue,
        id: Date.now(),
        status: 'open',
        dateReported: new Date().toISOString()
      };
      setIssues(prev => [issueWithId, ...prev]);
      navigate('/dashboard/local-issues');
    } catch (error) {
      console.error('Error creating issue:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Routes>
        <Route
          index
          element={
            <>
              <div className={styles.header}>
                <div className={styles.headerContent}>
                  <h1>Local Issues</h1>
                  <p>Track and manage local community issues reported by college clubs</p>
                </div>
                <div className={styles.headerActions}>
                  <button
                    className={styles.refreshButton}
                    onClick={fetchIssues}
                    disabled={loading}
                  >
                    <RefreshCw size={20} className={loading ? styles.spinning : ''} />
                    Refresh
                  </button>
                  <button
                    className={styles.createButton}
                    onClick={() => navigate('new')}
                  >
                    <Plus size={20} />
                    Report New Issue
                  </button>
                </div>
              </div>

              <div className={styles.filters}>
                <div className={styles.searchBar}>
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search issues by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <select
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    value={filters.category}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <select
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    value={filters.status}
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <select
                    onChange={(e) => setFilters(prev => ({ ...prev, urgency: e.target.value }))}
                    value={filters.urgency}
                  >
                    <option value="all">All Urgency</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>

                  <select
                    onChange={(e) => setFilters(prev => ({ ...prev, impact: e.target.value }))}
                    value={filters.impact}
                  >
                    <option value="all">All Impact Levels</option>
                    {impactLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.statsBar}>
                <div className={styles.stat}>
                  <h4>Total Issues</h4>
                  <p>{issues.length}</p>
                </div>
                <div className={styles.stat}>
                  <h4>Open Issues</h4>
                  <p>{issues.filter(i => i.status === 'open').length}</p>
                </div>
                <div className={styles.stat}>
                  <h4>In Progress</h4>
                  <p>{issues.filter(i => i.status === 'in-progress').length}</p>
                </div>
                <div className={styles.stat}>
                  <h4>Resolved</h4>
                  <p>{issues.filter(i => i.status === 'resolved').length}</p>
                </div>
              </div>

              <IssuesList 
                issues={filteredIssues} 
                loading={loading} 
              />
            </>
          }
        />
        <Route
          path="new"
          element={
            <IssueForm 
              onSubmit={handleCreateIssue}
              categories={categories}
              impactLevels={impactLevels}
              loading={loading}
            />
          }
        />
        <Route 
          path=":issueId" 
          element={
            <IssueDetails 
              issues={issues}
              onStatusChange={(id, newStatus) => {
                setIssues(prev => prev.map(issue => 
                  issue.id === id ? { ...issue, status: newStatus } : issue
                ));
              }}
            />
          } 
        />
      </Routes>
    </div>
  );
};

export default LocalIssues; 