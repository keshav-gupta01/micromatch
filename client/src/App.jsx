import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/home.jsx';
import Signup from './signup/signup.jsx';
import Login from './login/login.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
