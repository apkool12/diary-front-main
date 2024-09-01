import React, { useState } from 'react';
import './Login.css'; // 스타일 시트 추가
import user from "../icon/user.png"
import id from "../icon/email.png"
import pw from "../icon/password.png"

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });
  };

  return (
    <div className="login-container">
      <img src={user} alt="유저 아이콘" className="user-icon" />

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="이메일을 입력하세요"
            />
            <img src={id} alt="이메일 아이콘" className="input-icon" />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
            />
            <img src={pw} alt="비밀번호 아이콘" className="input-icon" />
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
