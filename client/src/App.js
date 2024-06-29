import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Routine from './components/Routine/Routine';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/routine" element={<Routine />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

