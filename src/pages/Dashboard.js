import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [form, setForm] = useState({
    name: '',
    skills: '',
    projectName: '',
    githubLink: '',
    projectTitle: '',
    description: '',
    liveLink: ''
  });

  const [portfolios, setPortfolios] = useState([]);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: token } };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/portfolio/${editId}`, form, config);
        alert('Updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/portfolio', form, config);
        alert('Saved successfully!');
      }

      setForm({
        name: '',
        skills: '',
        projectName: '',
        githubLink: '',
        projectTitle: '',
        description: '',
        liveLink: ''
      });
      setEditId(null);
      fetchPortfolios(); // Refresh list
    } catch (err) {
      alert('Something went wrong.');
    }
  };

  const fetchPortfolios = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/portfolio', config);
      setPortfolios(res.data);
    } catch (err) {
      alert('Error fetching data');
    }
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditId(p._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/portfolio/${id}`, config);
      fetchPortfolios();
    } catch (err) {
      alert('Delete failed');
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []); // 

  return (
    <div>
      <Navbar />

      <h2 id='header'>Portfolio Builder</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="skills" placeholder="Skills" value={form.skills} onChange={handleChange} required />
        <input name="projectName" placeholder="Project Name" value={form.projectName} onChange={handleChange} required />
        <input name="githubLink" placeholder="GitHub Link" value={form.githubLink} onChange={handleChange} required />
        <input name="projectTitle" placeholder="Project Title" value={form.projectTitle} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="liveLink" placeholder="Live Link" value={form.liveLink} onChange={handleChange} required />
        <button type="submit">{editId ? 'Update' : 'Save'}</button>
      </form>

      <h3>Saved Portfolios</h3>
      {portfolios.map((p) => (
        <div key={p._id} style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px' }}>
          <p><strong>Project Title:</strong> {p.projectTitle}</p>
          <p><strong>Description:</strong> {p.description}</p>
          <p><strong>GitHub:</strong> <a href={p.githubLink} target="_blank" rel="noreferrer">{p.githubLink}</a></p>
          <p><strong>Live:</strong> <a href={p.liveLink} target="_blank" rel="noreferrer">{p.liveLink}</a></p>
          <button onClick={() => handleEdit(p)}>Edit</button>
          <button onClick={() => handleDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
