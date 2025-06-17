import { useEffect, useState } from 'react';
import { fetchProblems, updateProblemStatus } from '../api/problems';
import './headashboard.css';
import '../styles/shared-image.css';

const HeadDashboard = () => {
  const [problems, setProblems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredProblems, setFilteredProblems] = useState([]);

  // Sorting function
  const sortProblems = (problemsToSort, key) => {
    return [...problemsToSort].sort((a, b) => {
      if (key === 'votes') {
        return b.votes - a.votes; // Always sort votes in descending order
      }

      if (key === 'date') {
        return sortConfig.direction === 'ascending' 
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (a[key] < b[key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  };

  // Handle column header click
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedProblems = sortProblems(problems, key);
    setProblems(sortedProblems);
  };

  // Get sort direction indicator
  const getSortIndicator = (columnName) => {
    if (sortConfig.key !== columnName) return '↕';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const loadProblems = async () => {
    try {
      const data = await fetchProblems();
      setProblems(data);
    } catch (err) {
      setError('Failed to load problems');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Optimistic update
      setProblems(currentProblems => 
        currentProblems.map(problem => 
          problem._id === id 
            ? { ...problem, status: newStatus }
            : problem
        )
      );

      // Silent API call in background
      await updateProblemStatus(id, newStatus);
    } catch (err) {
      // Only revert on error
      console.error('Status update failed:', err);
      loadProblems();
    }
  };

  // Add this function to handle filtering
  const handleStatusFilter = (selectedStatus) => {
    setStatusFilter(selectedStatus);
    if (selectedStatus === 'all') {
      setFilteredProblems(problems);
    } else {
      const filtered = problems.filter(problem => problem.status === selectedStatus);
      setFilteredProblems(filtered);
    }
  };

  // Add this useEffect to initialize filtered problems
  useEffect(() => {
    setFilteredProblems(problems);
  }, [problems]);

  useEffect(() => {
    loadProblems();
  }, []);

  return (
    <div className="head-dashboard">
      <div className="dashboard-header">
        <h1>Head Dashboard</h1>
        <div className="welcome-message">
          <h3>Welcome, <strong>Community Leader!</strong> Your innovative decisions can drive positive change. Let's solve problems together and make our community better!</h3>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{problems.length}</div>
          <div className="stat-label">Total Issues</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {problems.filter(p => p.status === 'completed').length}
          </div>
          <div className="stat-label">Resolved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {problems.filter(p => p.status === 'reviewing').length}
          </div>
          <div className="stat-label">In Review</div>
        </div>
      </div>

      <div className="filter-container">
        <select 
          className="status-filter"
          value={statusFilter}
          onChange={(e) => handleStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="reviewing">Reviewing</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="table-container">
        <table className="problems-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th onClick={() => handleSort('date')} className="sortable-header">
                Date {getSortIndicator('date')}
              </th>
              <th onClick={() => handleSort('votes')} className="sortable-header">
                Votes {getSortIndicator('votes')}
              </th>
              <th>Image</th>
              <th onClick={() => handleSort('status')} className="sortable-header">
                Status {getSortIndicator('status')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => (
              <tr key={problem._id}>
                <td>{problem.title}</td>
                <td>
                  <div style={{ 
                    maxHeight: '120px', 
                    overflowY: 'auto', 
                    paddingRight: '8px' 
                  }}>
                    {problem.description}
                  </div>
                </td>
                <td>{problem.location || 'Not specified'}</td>
                <td>{new Date(problem.createdAt).toLocaleDateString()}</td>
                <td>{problem.votes}</td>
                <td>
                  {problem.image && (
                    <div className="problem-image-container">
                      <img 
                        src={problem.image.url} 
                        alt={problem.title}
                        className="problem-image"
                      />
                    </div>
                  )}
                </td>
                <td>
                  <select
                    value={problem.status}
                    onChange={(e) => handleStatusChange(problem._id, e.target.value)}
                    className={`status-select status-${problem.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default HeadDashboard;