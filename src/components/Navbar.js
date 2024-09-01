import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태
  const dropdownRef = useRef(null); // 드롭다운 참조

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  // 드롭다운 외부 클릭 시 드롭다운 닫기
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar">
      <nav>
        <ul className="nav-list">
          <li><Link className="nav-link home-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/diary">Diary</Link></li>
          <li><Link className="nav-link" to="/devlog">Dev Log</Link></li>
        </ul>
        <div className="auth-buttons">
          <div
            className="user-button"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <span>유저</span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {isLoggedIn ? (
                  <>
                    <Link className="nav-link" to="/logout">로그아웃</Link>
                    <Link className="nav-link" to="/profile">회원정보</Link>
                    <Link className="nav-link" to="/settings">설정</Link>
                    <Link className="nav-link" to="/projects">프로젝트</Link>
                  </>
                ) : (
                  <>
                    <Link className="nav-link" to="/login">로그인</Link>
                    <Link className="nav-link" to="/signup">회원가입</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
