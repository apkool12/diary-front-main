import React, { useState, useEffect } from 'react';
import './Homepage.css';

function HomePage() {
  const [text, setText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [showContent, setShowContent] = useState(false); 
  const [showTasks, setShowTasks] = useState([false, false, false]);
  const message = '" 당신의 개발을 응원합니다. "';

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(message.slice(0, index + 1));
      index++;
      if (index >= message.length) {
        clearInterval(intervalId);
        setIsTextComplete(true);
      }
    }, 180);
    
    return () => clearInterval(intervalId);
  }, [message]);

  useEffect(() => {
    if (isTextComplete) {
      const timeoutId = setTimeout(() => {
        setShowContent(true);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [isTextComplete]);

  useEffect(() => {
    if (showContent) {
      const timeouts = [];
      for (let i = 0; i < showTasks.length; i++) {
        const timeoutId = setTimeout(() => {
          setShowTasks(prev => {
            const newShowTasks = [...prev];
            newShowTasks[i] = true;
            return newShowTasks;
          });
        }, i * 300);
        timeouts.push(timeoutId);
      }
      return () => timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    }
  }, [showContent]);

  return (
    <div className="homepage-container">
      <div className="wave"></div>
      <div className="wave -two"></div>
      <div className="wave -three"></div>

      <div className={`homepage-text ${isTextComplete ? 'move-up' : ''}`}>{text}</div>
      {showContent && <div className="underline-animation"></div>}
      <div className="task-cards">
        {showTasks[0] && <div className="task-card fade-in">작업 1</div>}
        {showTasks[1] && <div className="task-card fade-in">작업 2</div>}
        {showTasks[2] && <div className="task-card fade-in">작업 3</div>}
      </div>
    </div>
  );
}

export default HomePage;
