import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Signup from './signup/signup';
import Login from './login/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
