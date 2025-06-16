import { useEffect, useState } from 'react';
import { fetchProblems, updateProblemStatus } from '../api/problems';
import config from '../config/config';
import './headashboard.css';

const HeadDashboard = () => {
  const [problems, setProblems] = useState([]);
  const [, setError] = useState(null);

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

  useEffect(() => {
    loadProblems();
  }, []);

  return (
    <div className="head-dashboard">
      <div className="dashboard-header">
        <h1>Head Dashboard</h1>
        <p>Manage and update community reported problems</p>
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

      <div className="table-container">
        <table className="problems-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Votes</th>
              <th>Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
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
                    <img 
                      src={`${config.UPLOAD_PATH}/${problem.image}`} 
                      alt="Problem" 
                      className="table-image"
                    />
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
