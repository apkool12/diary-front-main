import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import HomePage from './pages/HomePage';
import Diary from './pages/Diary';
import DevLog from './pages/DevLog';
import Profile from './components/Profile';
import Settings from './pages/Settings';
import TodoList from './components/TodoList';

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
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
