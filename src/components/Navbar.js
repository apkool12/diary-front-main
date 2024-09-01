import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <ul className="nav-list">
          <li><Link className="nav-link home-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/diary">Diary</Link></li>
          <li><Link className="nav-link" to="/devlog">Dev Log</Link></li>
        </ul>
        <div className="auth-buttons">
          <div><Link className="nav-link button" to="/login">로그인</Link></div>
          <div><Link className="nav-link button" to="/signup">회원가입</Link></div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
