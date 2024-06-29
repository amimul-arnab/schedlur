// client/src/components/SignIn/SignIn.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  return (
    <div className="container">
      <img src="/assets/logo.png" alt="Schedlur Logo" className="logo" />
      <h1>Sign In</h1>
      <form>
        <input type="email" placeholder="Email" className="form-input" />
        <input type="password" placeholder="Password" className="form-input" />
        <button type="submit" className="btn join-btn">Join</button>
      </form>
      <p>Already have an account? <Link to="/signup" className="link">Sign Up</Link></p>
    </div>
  );
}

export default SignIn;
