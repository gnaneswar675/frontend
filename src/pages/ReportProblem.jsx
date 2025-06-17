import { useState } from 'react';
import { createProblem } from '../api/problems';
import { useNavigate } from 'react-router-dom';
import './reportproblem.css';

const ReportProblem = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    image: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setForm({ ...form, image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('location', form.location);
    formData.append('date', form.date);
    if (form.image) formData.append('image', form.image);

    try {
      await createProblem(formData);
      navigate('/dashboard');
    } catch (err) {
      alert('Error Reporting Problem');
    }
  };

  return (
    <div className="report-container">
      <form onSubmit={handleSubmit} className="report-form">
        <h2>Report a Problem</h2>
        <div className="input-group">
          <input 
            name="title" 
            placeholder="Problem Title" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-group">
          <textarea 
            name="description" 
            placeholder="Detailed Description" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            name="location" 
            placeholder="Location" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            name="date" 
            type="date" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="file" 
            onChange={handleFileChange} 
          />
        </div>
        <button type="submit" className="submit-button">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportProblem;
