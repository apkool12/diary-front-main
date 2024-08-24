import React, { useState } from 'react';
import './Homepage.css';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  return (
    <div className='Home'>
      <div className="container">
        <header className="header">
          <h1>오늘도 좋은 개발하시길 바래요</h1>
        </header>

        <div className="content-box">
          <h2>오늘 하루를 정리해봐요</h2> 
          <div className="task-input">
            <input 
              type="text" 
              value={task} 
              onChange={(e) => setTask(e.target.value)} 
              placeholder="할 일을 입력하세요" 
            />
            <button onClick={addTask}>추가</button>
          </div>
          <ul className="task-list">
            {tasks.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
