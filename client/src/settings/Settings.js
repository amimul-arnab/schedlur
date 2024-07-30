import React, { useState, useEffect } from 'react';
import './Settings.css';
import { getUserInfo, updateUserInfo } from './api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Settings() {
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getUserInfo(token);
          setFormData({
            name: userData.fullName,
            email: userData.email,
            password: '*********'
          });
        } else {
          console.error('No token found, please log in.');
          navigate('/'); // Redirect to the landing page if no token is found
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 10000); // Clear message after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const updatedData = await updateUserInfo(formData, token);
        setFormData((prevData) => ({
          ...prevData,
          ...updatedData,
          password: '*********'
        }));
        setEditField(null);
        setMessage(`Success: ${editField.charAt(0).toUpperCase() + editField.slice(1)} changed successfully`);
        console.log(`Success: ${editField.charAt(0).toUpperCase() + editField.slice(1)} changed successfully`);
      } else {
        console.error('No token found, please log in.');
        navigate('/');
      }
    } catch (err) {
      console.error(`Error updating ${editField}:`, err);
      setMessage(`Error: ${editField.charAt(0).toUpperCase() + editField.slice(1)} change failed`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [editField]: e.target.value
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to the landing page
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.delete('http://localhost:5001/api/settings/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem('token');
        navigate('/');
      } else {
        console.error('No token found, please log in.');
        navigate('/');
      }
    } catch (err) {
      console.error('Error deleting account:', err);
      setMessage('Error: Account deletion failed');
    }
  };

  return (
    <div className="settings">
      <main className="settings-main">
        <div className="profile">
          <h2>Profile:</h2>
          <div className="profile-item">
            <label>Name:</label>
            {editField === 'name' ? (
              <input type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} className="input-visible" />
            ) : (
              <span>{formData.name}</span>
            )}
            <button onClick={() => (editField === 'name' ? handleSave() : handleEdit('name'))}>
              {editField === 'name' ? 'Save' : 'Change'}
            </button>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            {editField === 'email' ? (
              <input type="text" placeholder="Email" value={formData.email} onChange={handleChange} className="input-visible" />
            ) : (
              <span>{formData.email}</span>
            )}
            <button onClick={() => (editField === 'email' ? handleSave() : handleEdit('email'))}>
              {editField === 'email' ? 'Save' : 'Change'}
            </button>
          </div>
          <div className="profile-item">
            <label>Password:</label>
            {editField === 'password' ? (
              <input type="text" placeholder="Password" value={formData.password.replace(/[*]/g, '')} onChange={handleChange} className="input-visible" />
            ) : (
              <span>{formData.password}</span>
            )}
            <button onClick={() => (editField === 'password' ? handleSave() : handleEdit('password'))}>
              {editField === 'password' ? 'Save' : 'Change'}
            </button>
          </div>
        </div>
        <div className="account-management">
          <h2>Account Management:</h2>
          <div className="account-management-buttons">
            <button className="sign-out" onClick={handleSignOut}>Sign Out</button>
            <button className="delete-account" onClick={handleDeleteAccount}>Permanently Delete User</button>
          </div>
        </div>
        {message && (
          <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</p>
        )}
      </main>
    </div>
  );
}

export default Settings;
