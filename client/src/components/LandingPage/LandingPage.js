// client/src/components/LandingPage/LandingPage.js
import React from 'react';
import './LandingPage.css';
import Navbar from '../Navbar/Navbar';

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <header className="App-header">
        <h1>Struggle to plan your day?</h1>
        <p>Try our dynamic custom scheduling application!</p>
      </header>
    </div>
  );
}

export default LandingPage;
