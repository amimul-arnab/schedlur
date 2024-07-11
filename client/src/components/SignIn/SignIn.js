// client/src/components/SignIn.js

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5001/api/auth/signin', formData);
      console.log('Response:', res.data);

      // Store token in localStorage
      localStorage.setItem('token', res.data.token);
      console.log('Token stored:', res.data.token);

      setMessage('User logged in successfully');
      navigate('/routine');
    } catch (err) {
      console.error('Error response:', err.response);
      if (err.response && err.response.data && err.response.data.msg) {
        setMessage(err.response.data.msg);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <img src="/assets/logo.png" alt="Logo" className="logo" />
      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
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
        <button className="btn" type="submit">Sign In</button>
      </form>
      {message && <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</p>}
      <p>
        Don't Have an Account? <a className="link" href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;
