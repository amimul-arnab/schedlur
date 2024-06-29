import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopNavbar.css';

const TopNavbar = () => {
  return (
    <nav className="top-navbar">
      <div className="logo-section">
        <img src="/assets/logo.png" alt="Logo" className="logo" />
        <h1>schedlur</h1>
      </div>
      <div className="links-section">
        <NavLink to="/routine" activeClassName="active">
          <img src="/assets/routine.png" alt="Routine" className="icon" />
          <span>Routine</span>
        </NavLink>
        <NavLink to="/events" activeClassName="active">
          <img src="/assets/event.png" alt="Events" className="icon" />
          <span>Events</span>
        </NavLink>
        <NavLink to="/settings" activeClassName="active">
          <img src="/assets/settings.png" alt="Settings" className="icon" />
          <span>Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default TopNavbar;
