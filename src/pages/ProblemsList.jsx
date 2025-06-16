import { useEffect, useState, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { voteProblem } from '../api/problems';
import { getToken } from '../utils/auth';
import config from '../config/config';
import './problemslist.css';

const ProblemsList = ({ showLandingPage = true }) => {
  const [problems, setProblems] = useState([]);
  const isLoggedIn = !!getToken();
  const navigate = useNavigate();
  const location = useLocation();
  const problemsRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const mounted = useRef(false);

  const handleClick = (type) => {
    switch (type) {
      case 'privacy':
        navigate('/privacy');
        break;
      case 'terms':
        navigate('/terms');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    loadProblems();
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionRefs = {
        problems: problemsRef,
        features: featuresRef,
        howItWorks: howItWorksRef
      };

      const targetRef = sectionRefs[location.state.scrollTo];
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      
      // Handle initial navigation
      const { scrollTo } = location.state || {};
      if (scrollTo) {
        setTimeout(() => {
          const element = document.getElementById(scrollTo);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [location]);

  const loadProblems = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/problems`);
      const data = await response.json();
      setProblems(data);
    } catch (error) {
      console.error('Error loading problems:', error);
    }
  };

  const handleVote = async (id) => {
    await voteProblem(id);
    loadProblems();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      default: return 'status-default';
    }
  };

  // Get top 4 pending/reviewing problems by votes
  const topProblems = useMemo(() => {
    return [...problems]
      .filter(problem => ['pending', 'reviewing'].includes(problem.status))
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 3);
  }, [problems]);

  const handleVoteOrLogin = (problemId) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { returnTo: '/', action: 'vote', problemId } });
      return;
    }
    handleVote(problemId);
  };

  const handleReportOrLogin = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { returnTo: '/report', action: 'report' } });
      return;
    }
    // Handle report logic for logged in users
  };

  return (
    <div className="landing-page">
      {!isLoggedIn ? (
        // Show these sections only for non-logged in users
        <>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-background"></div>
            <div className="container">
              <div className="hero-content">
                <div className="hero-icon">
                  <i className="icon-community"></i>
                </div>
                <h1 className="hero-title">Community Problem Reporting Portal</h1>
                <p className="hero-subtitle">Empowering communities to identify, report, and resolve local issues together</p>
                <div className="hero-buttons">
                  <button className="btn btn-primary" onClick={handleReportOrLogin}>
                    Report an Issue
                  </button>
                </div>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">90+</div>
                  <div className="stat-label"><b>Active Issues</b></div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label"><b>Resolved</b></div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label"><b>Total Votes</b></div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="features-section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">Key Features</h2>
                <p className="section-subtitle">Discover what makes our platform effective</p>
              </div>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="icon-report"></i>
                  </div>
                  <h3>Problem Reporting</h3>
                  <p>Easy-to-use interface for reporting community issues with photo uploads and detailed descriptions</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="icon-vote"></i>
                  </div>
                  <h3>Community Voting</h3>
                  <p>Vote on issues to highlight their importance to local authorities and prioritize solutions</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="icon-track"></i>
                  </div>
                  <h3>Status Tracking</h3>
                  <p>Real-time tracking of problem resolution status from report to completion</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="icon-dashboard"></i>
                  </div>
                  <h3>Head Dashboard</h3>
                  <p>Dedicated dashboard for village/city heads to manage and respond to reported issues</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="icon-notification"></i>
                  </div>
                  <h3>Smart Notifications</h3>
                  <p>Stay informed with real-time updates about problem status changes and community responses in your area</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="icon-map"></i>
                  </div>
                  <h3>Interactive Map</h3>
                  <p>Visualize reported issues on an interactive map to better understand problem areas in your community</p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="how-it-works-section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">How It Works</h2>
                <p className="section-subtitle">Simple steps to make your community better</p>
              </div>
              <div className="steps-container">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Report an Issue</h3>
                    <p>Register and submit details about local problems with photos and precise location information</p>
                  </div>
                </div>
                <div className="step-connector"></div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Community Engagement</h3>
                    <p>Other residents can view and vote on reported issues to show community support</p>
                  </div>
                </div>
                <div className="step-connector"></div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Authority Review</h3>
                    <p>Local heads monitor and address prioritized problems based on community feedback</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* User Dashboard / Problems Section */}
      <section id="problems" className={`problems-section ${isLoggedIn ? 'logged-in' : ''}`}>
        <div className="container" ref={problemsRef}>
          <div className="dashboard-header">
            <h1>Community Problems</h1>
            <p>Vote on issues that matter to your community</p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-number">90+</div>
              <div className="stat-label"><b>Total Issues</b></div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                50+
              </div>
              <div className="stat-label"><b>Resolved</b></div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                1000+
              </div>
              <div className="stat-label"><b>Total Votes</b></div>
            </div>
          </div>

          <div className="problems-grid">
           
          </div>

          <div className="top-problems" >
            <h2 className="section-title">Top Voted Active Issues</h2>
            <div className="problems-grid">
              {topProblems.map((problem) => (
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
                      <img src={`${config.UPLOAD_PATH}/${problem.image}`} alt="Problem" />
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
                      onClick={() => handleVoteOrLogin(problem._id)}
                    >
                      <i className="icon-vote"></i>
                      Vote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {!isLoggedIn && (
        // Show footer only for non-logged in users
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-grid">
                <div className="footer-section">
                  <div className="footer-logo">
                    <i className="icon-community"></i>
                    <h3>Community Reporter</h3>
                  </div>
                  <p>Making communities better through collaborative problem-solving and citizen engagement</p>
                  <div className="social-links">
                    <a href="https://facebook.com" className="social-link"><i className="icon-facebook"></i></a>
                    <a href="https://twitter.com" className="social-link"><i className="icon-twitter"></i></a>
                    <a href="https://instagram.com" className="social-link"><i className="icon-instagram"></i></a>
                    <a href="https://linkedin.com" className="social-link"><i className="icon-linkedin"></i></a>
                  </div>
                </div>
                <div className="footer-section">
                  <h3>Quick Links</h3>
                  <ul className="footer-links">
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/report">Report Problem</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/about">About Us</a></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h3>Support</h3>
                  <ul className="footer-links">
                    <li><a href="/help">Help Center</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    {/* Replace the anchor tags with proper hrefs or buttons */}
                    <li>
                      <button 
                        type="button" 
                        className="footer-link-button" 
                        onClick={() => handleClick('privacy')}
                      >
                        Privacy Policy
                      </button>
                    </li>
                    <li>
                      <button 
                        type="button" 
                        className="footer-link-button" 
                        onClick={() => handleClick('terms')}
                      >
                        Terms of Service
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h3>Contact Us</h3>
                  <div className="contact-info">
                    <div className="contact-item">
                      <i className="icon-mail"></i>
                      <span>support@community.com</span>
                    </div>
                    <div className="contact-item">
                      <i className="icon-phone"></i>
                      <span>(123) 456-7890</span>
                    </div>
                    <div className="contact-item">
                      <i className="icon-location"></i>
                      <span>123 Community St, City, State</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-bottom-content">
                <p>&copy; 2025 Community Problem Reporter. All rights reserved.</p>
                <div className="footer-bottom-links">
                  <a href="/privacy">Privacy</a>
                  <a href="/terms">Terms</a>
                  <a href="/cookies">Cookies</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ProblemsList;
