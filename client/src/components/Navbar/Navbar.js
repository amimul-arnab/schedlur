// client/src/components/Navbar/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/assets/logo.png" alt="Schedlur Logo" className="logo" />
        <h1 className="brand-name">schedlur</h1>
      </div>
      <div className="navbar-right">
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
        <Link to="/signin" className="btn login-btn">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
