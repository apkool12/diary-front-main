import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/diary">Diary</Link></li>
        <li><Link to="/devlog">Dev Log</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/todo">Todo List</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
