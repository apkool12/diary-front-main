import React, { useState, useEffect } from 'react';
import './Homepage.css';

function HomePage() {
  const [text, setText] = useState('');
  const message = '" 당신의 개발을 응원합니다. "';

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(message.slice(0, index + 1));
      index++;
      if (index >= message.length) {
        clearInterval(intervalId);
      }
    }, 180);
    
    return () => clearInterval(intervalId);
  }, [message]);

  return (
    <div className="homepage-container">
      <h1 className="homepage-text">{text}</h1>
    </div>
  );
}

export default HomePage;
