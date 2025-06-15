import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, getUserRole } from '../utils/auth';
import './homemain.css';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = getToken();
  const userRole = getUserRole();
  const [stats, setStats] = useState({
    totalReports: 0,
    resolvedReports: 0,
    activeUsers: 0,
    recentReports: []
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setStats({
      totalReports: 1247,
      resolvedReports: 892,
      activeUsers: 3456,
      recentReports: [
        { id: 1, title: "Broken streetlight on Main St", votes: 23, status: "pending" },
        { id: 2, title: "Pothole near City Park", votes: 45, status: "in-progress" },
        { id: 3, title: "Garbage collection missed", votes: 12, status: "resolved" },
        { id: 4, title: "Water pipe leak", votes: 67, status: "pending" }
      ]
    });
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/report');
    } else {
      navigate('/register');
    }
  };

  return (
    <main className="home-main">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your Voice, <span className="highlight">Your Community</span>
            </h1>
            <p className="hero-description">
              Report local issues, track their progress, and work together to build a better community. 
              Join thousands of citizens making a real difference in their neighborhoods.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleGetStarted}>
                {isLoggedIn ? 'Report an Issue' : 'Get Started'}
              </button>
              <Link to="/problems" className="btn-secondary">
                View Problems
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="floating-card card-1">
                <div className="card-icon">🏠</div>
                <div className="card-text">Infrastructure</div>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">🚯</div>
                <div className="card-text">Environment</div>
              </div>
              <div className="floating-card card-3">
                <div className="card-icon">🚦</div>
                <div className="card-text">Traffic</div>
              </div>
              <div className="floating-card card-4">
                <div className="card-icon">💡</div>
                <div className="card-text">Utilities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">{stats.totalReports.toLocaleString()}</div>
            <div className="stat-label">Total Reports</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.resolvedReports.toLocaleString()}</div>
            <div className="stat-label">Issues Resolved</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.activeUsers.toLocaleString()}</div>
            <div className="stat-label">Active Citizens</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{Math.round((stats.resolvedReports / stats.totalReports) * 100)}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple steps to make your community better</p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">📝</div>
            <h3 className="step-title">Report Issues</h3>
            <p className="step-description">
              Take a photo and describe local problems like potholes, broken streetlights, or waste management issues.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">🗳️</div>
            <h3 className="step-title">Community Votes</h3>
            <p className="step-description">
              Citizens vote on reported issues to prioritize the most important problems that need immediate attention.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">👥</div>
            <h3 className="step-title">Official Review</h3>
            <p className="step-description">
              Local authorities review prioritized issues and update the community on progress and resolution status.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-icon">✅</div>
            <h3 className="step-title">Problem Solved</h3>
            <p className="step-description">
              Track the progress from report to resolution and see the positive impact on your community.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Reports Section */}
      <section className="recent-reports">
        <div className="section-header">
          <h2 className="section-title">Recent Community Reports</h2>
          <Link to="/problems" className="view-all-link">View All →</Link>
        </div>
        <div className="reports-grid">
          {stats.recentReports.map(report => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <h3 className="report-title">{report.title}</h3>
                <span className={`status-badge ${report.status}`}>
                  {report.status.replace('-', ' ')}
                </span>
              </div>
              <div className="report-footer">
                <div className="votes">
                  <span className="vote-icon">👍</span>
                  <span className="vote-count">{report.votes} votes</span>
                </div>
                <button className="report-action">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Community Reporter?</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure & Private</h3>
            <p className="feature-description">
              Your data is protected with JWT authentication and encrypted storage.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Easy to Use</h3>
            <p className="feature-description">
              Simple interface designed for citizens of all ages and technical backgrounds.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Real-time Updates</h3>
            <p className="feature-description">
              Get instant notifications about the status of your reports and community issues.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3 className="feature-title">Proven Results</h3>
            <p className="feature-description">
              Join communities that have successfully resolved thousands of local issues.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Make a Difference?</h2>
          <p className="cta-description">
            Join your community today and help create positive change in your neighborhood.
          </p>
          <div className="cta-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="btn-primary">
                  Join Community
                </Link>
                <Link to="/login" className="btn-secondary">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link to="/report" className="btn-primary">
                  Report New Issue
                </Link>
                {userRole === 'head' && (
                  <Link to="/head" className="btn-secondary">
                    Dashboard
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;