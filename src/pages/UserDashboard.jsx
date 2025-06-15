import { useEffect, useState } from 'react';
import { fetchProblems, voteProblem } from '../api/problems';
import config from '../config/config';
import './userdashboard.css';

const UserDashboard = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProblems = async () => {
    try {
      setLoading(true);
      const data = await fetchProblems();
      setProblems(data);
      setError(null);
    } catch (err) {
      setError('Failed to load problems');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id) => {
    try {
      // Optimistic update
      setProblems(prevProblems => 
        prevProblems.map(problem => 
          problem._id === id 
            ? { ...problem, votes: problem.votes + 1 }
            : problem
        )
      );

      // Make API call
      await voteProblem(id);
    } catch (err) {
      // Revert on error
      setError('Failed to vote');
      await loadProblems(); // Reload only if there's an error
    }
  };

  useEffect(() => {
    loadProblems();
  }, []);

  // Add error display
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => loadProblems()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      default: return 'status-default';
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Community Dashboard</h1>
        <p className="dashboard-subtitle">Vote on issues that matter to your community</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{problems.length}</div>
          <div className="stat-label">Total Issues</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {problems.filter(p => p.status === 'resolved').length}
          </div>
          <div className="stat-label">Resolved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {problems.reduce((sum, p) => sum + p.votes, 0)}
          </div>
          <div className="stat-label">Total Votes</div>
        </div>
      </div>

      <div className="problems-grid">
        {problems.map((problem) => (
          <div key={problem._id} className="problem-card">
            <div className="problem-header">
              <h3 className="problem-title">{problem.title}</h3>
              <span className={`status-badge ${getStatusClass(problem.status)}`}>
                {problem.status.replace('-', ' ')}
              </span>
            </div>
            <p className="problem-description">{problem.description}</p>
            {problem.image && (
              <div className="problem-image">
                <img 
                  src={`${config.UPLOAD_PATH}/${problem.image}`} 
                  alt="Problem" 
                />
              </div>
            )}
            <div className="problem-meta">
              <div className="meta-item">
                <i className="icon-location"></i>
                <span>{problem.location || 'Location not specified'}</span>
              </div>
              <div className="meta-item">
                <i className="icon-calendar"></i>
                <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="problem-actions">
              <div className="votes-display">
                <i className="icon-thumbs-up"></i>
                <span>{problem.votes} votes</span>
              </div>
              <button 
                className="vote-button" 
                onClick={() => handleVote(problem._id)}
                disabled={loading}
              >
                <i className="icon-vote"></i>
                {loading ? 'Voting...' : 'Vote'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;