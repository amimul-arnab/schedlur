// client/src/components/SignUp.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { fullName, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5001/api/auth/signup', formData);
      console.log(res.data);

      // Store token in localStorage
      localStorage.setItem('token', res.data.token);
      console.log('Token stored:', res.data.token);

      setMessage('User registered successfully');
      navigate('/routine');
    } catch (err) {
      console.error('Error response:', err.response);
      if (err.response && err.response.data && err.response.data.errors) {
        setMessage(err.response.data.errors[0].msg);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <img src="/assets/logo.png" alt="Logo" className="logo" />
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={fullName}
          onChange={onChange}
          required
        />
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button className="btn" type="submit">Join</button>
      </form>
      {message && <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</p>}
      <p>
        Already have an account? <a className="link" href="/signin">Sign In</a>
      </p>
    </div>
  );
};

export default SignUp;
