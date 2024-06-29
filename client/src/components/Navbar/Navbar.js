import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/assets/logo.png" alt="Logo" className="logo" />
        <span className="brand-name">schedlur</span>
      </div>
      <div className="navbar-right">
        <button className="btn signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        <button className="btn login-btn" onClick={() => navigate('/signin')}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
