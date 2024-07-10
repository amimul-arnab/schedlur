import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleSave = () => {
    setEditField(null);
    if (formData.password.length > 0) {
      setFormData({
        ...formData,
        password: '*********'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [editField]: e.target.value
    });
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
            <button className="sign-out">Sign Out</button>
            <button className="delete-account">Permanently Delete User</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
