// src/components/Navbar.js
import React from 'react';
import './Navbar.css'; // ✅ CSS import
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <h3>Portfolio Builder</h3>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
