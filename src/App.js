import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar.js';
import HomePage from './pages/HomePage';
import Diary from './pages/Diary';
import DevLog from './pages/DevLog';
import Profile from './components/Profile';
import Settings from './pages/Settings';
import Project from './components/Project.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/devlog" element={<DevLog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;
