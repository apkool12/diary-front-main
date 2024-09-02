import React, { useState } from 'react';
import './SignUp.css'; // 스타일 시트 추가
import user from "../icon/user.png";
import pw from "../icon/password.png";

const SignUpPage = () => {
  const [emailLocal, setEmailLocal] = useState(''); // 이메일 앞부분
  const [emailDomain, setEmailDomain] = useState(''); // 이메일 도메인
  const [customDomain, setCustomDomain] = useState(''); // 사용자 정의 도메인
  const [isCustomDomain, setIsCustomDomain] = useState(false); // 사용자 정의 도메인 사용 여부
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleEmailCheck = () => {
    // 이메일 중복 확인 로직을 여기에 구현
    const fullEmail = isCustomDomain ? `${emailLocal}@${customDomain}.com` : `${emailLocal}@${emailDomain}.com`;
    if (emailLocal && (isCustomDomain ? customDomain : emailDomain)) {
      console.log('이메일 중복 확인:', fullEmail);
      setIsEmailChecked(true); // 예시로 이메일 중복 확인 성공 처리
    } else {
      alert('이메일을 입력해 주세요!');
    }
  };
  
  const handleSignUp = (e) => {
    e.preventDefault();
  
    // 이메일 입력 확인
    if (!emailLocal) {
      alert('이메일의 앞부분을 입력해 주세요.');
      return;
    }
    
    if (isCustomDomain && !customDomain) {
      alert('사용자 정의 도메인을 입력해 주세요.');
      return;
    } else if (!isCustomDomain && !emailDomain) {
      alert('이메일 도메인을 선택해 주세요.');
      return;
    }
  
    if (!isEmailChecked) {
      alert('이메일 중복 확인을 해주세요.');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  
    const fullEmail = isCustomDomain ? `${emailLocal}@${customDomain}.com` : `${emailLocal}@${emailDomain}.com`;
    console.log('회원가입 시도:', { email: fullEmail, password, name, dob });
  };

  return (
    <div className="signup-container">
      <img src={user} alt="유저 아이콘" className="signup-user-icon" />
      
      <form onSubmit={handleSignUp}>
        <div className="signup-input-group">
          <label htmlFor="name">이름</label>
          <div className="signup-input-wrapper">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="이름을 입력하세요"
            />
          </div>
        </div>
        <div className="signup-input-group">
          <label htmlFor="dob">생년월일</label>
          <div className="signup-input-wrapper">
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="signup-input-group">
          <label htmlFor="email">이메일</label>
          <div className="signup-email-wrapper">
            <input
              type="text"
              id="emailLocal"
              value={emailLocal}
              onChange={(e) => setEmailLocal(e.target.value)}
              required
              placeholder="이메일을 입력하세요"
              className="signup-email-local"
            />
            <span>@</span>
            {!isCustomDomain ? (
              <select
                className="signup-email-domain"
                value={emailDomain}
                onChange={(e) => {
                  if (e.target.value === "custom") {
                    setIsCustomDomain(true);
                  } else {
                    setEmailDomain(e.target.value);
                  }
                }}
                required
              >
                <option value="">도메인 선택</option>
                <option value="naver">naver</option>
                <option value="gmail">gmail</option>
                <option value="daum">daum</option>
                <option value="yahoo">yahoo</option>
                <option value="custom">직접 입력</option>
              </select>
            ) : (
              <input
                type="text"
                className="signup-custom-domain"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                required
                placeholder="도메인을 입력하세요"
              />
            )}
            <span>.com</span>
          </div>
          <button type="button" className="signup-email-check" onClick={handleEmailCheck}>
            중복 확인
          </button>
        </div>
        <div className="signup-input-group">
          <label htmlFor="password">비밀번호</label>
          <div className="signup-pw-wrapper">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
            />
            <img src={pw} alt="비밀번호 아이콘" className="signup-input-icon" />
          </div>
        </div>
        <div className="signup-input-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <div className="signup-pw-wrapper">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="비밀번호를 다시 입력하세요"
            />
            <img src={pw} alt="비밀번호 확인 아이콘" className="signup-input-icon" />
          </div>
        </div>
        <button type="submit" className="signup-submit-button">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;
