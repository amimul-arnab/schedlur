import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Routine from './routines/Routine';
import Event from './event/Event';
import Settings from './settings/Settings';
import TopNavbar from './components/TopNavbar/TopNavbar';
import Navbar from './components/Navbar/Navbar'; // Ensure this is the correct path

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<><Navbar /><LandingPage /></>} />
          <Route path="/signin" element={<><Navbar /><SignIn /></>} />
          <Route path="/signup" element={<><Navbar /><SignUp /></>} />
          <Route path="/routine" element={<><TopNavbar /><Routine /></>} />
          <Route path="/events" element={<><TopNavbar /><Event /></>} />
          <Route path="/settings" element={<><TopNavbar /><Settings /></>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
