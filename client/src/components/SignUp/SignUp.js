// client/src/components/SignUp/SignUp.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  return (
    <div className="container">
      <img src="/assets/logo.png" alt="Schedlur Logo" className="logo" />
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Full Name" className="form-input" />
        <input type="email" placeholder="Email" className="form-input" />
        <input type="password" placeholder="Password" className="form-input" />
        <button type="submit" className="btn join-btn">Join</button>
      </form>
      <p>Don't Have an Account? <Link to="/signin" className="link">Sign In</Link></p>
    </div>
  );
}

export default SignUp;
