import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar'; // Ensure this is the correct path
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import TopNavbar from './components/TopNavbar/TopNavbar';
import Event from './event/Event';
import Routine from './routine/Routine';
import Settings from './settings/Settings';

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
