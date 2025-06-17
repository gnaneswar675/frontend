import { useEffect, useState } from 'react';
import { fetchProblems } from '../api/problems';
import './headproblemslist.css';

const HeadProblemsList = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    loadProblems();
  }, []);

  const loadProblems = async () => {
    const data = await fetchProblems();
    setProblems(data);
  };


  return (
    <div className="head-problems-container">
      <div className="dashboard-header">
        <h1>Community Problems Overview</h1>
        <p>Monitor and track community reported issues</p>
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
            {problems.filter(p => p.status === 'pending').length}
          </div>
          <div className="stat-label">Pending</div>
        </div>
      </div>

      <div className="problems-grid">
        {problems.map((problem) => (
          <div key={problem._id} className="problem-card">
            <div className="problem-header">
              <h3 className="problem-title">{problem.title}</h3>
              <span className={`status-badge ${problem.status.toLowerCase()}`}>
                {problem.status}
              </span>
            </div>

            {problem.image && (
              <div className="problem-card-image">
                <img src={problem.image.url} alt={problem.title} />
              </div>
            )}

            <p className="problem-description">{problem.description}</p>
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
            <div className="votes-info">
              <i className="icon-thumbs-up"></i>
              <span>{problem.votes} community votes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadProblemsList;