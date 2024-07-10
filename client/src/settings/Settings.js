import React from 'react';
import './Settings.css';

function Settings() {
  return (
    <div className="settings">
      <main className="settings-main">
        <div className="profile">
          <h2>Profile:</h2>
          <div className="profile-item">
            <label>Name:</label>
            <span></span>
            <button>Change</button>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <span></span>
            <button>Change</button>
          </div>
          <div className="profile-item">
            <label>Password:</label>
            <span></span>
            <button>Change</button>
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
