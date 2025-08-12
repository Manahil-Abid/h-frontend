import './Register.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // 👈 Link added

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration successful. Now login.');
      navigate('/login'); // 👈 Redirect to login
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
     <div className="auth-container">
    <form  onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
      <p>Already registered? <Link to="/login">Login here</Link></p> {/* 👈 Link added */}
    </form>
    </div>
  );
};

export default Register;
