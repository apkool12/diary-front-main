import React, { useState } from 'react';
import './DevLog.css';

function DevLog() {
  const [teamLog, setTeamLog] = useState([]);
  const [personalLog, setPersonalLog] = useState([]);
  const [newLog, setNewLog] = useState('');
  const [isTeam, setIsTeam] = useState(true);
  const [filterText, setFilterText] = useState('');

  const handleAddLog = () => {
    if (newLog.trim() === '') return;

    if (isTeam) {
      setTeamLog([...teamLog, newLog]);
    } else {
      setPersonalLog([...personalLog, newLog]);
    }
    setNewLog('');
  };

  const handleDeleteLog = (index) => {
    if (isTeam) {
      setTeamLog(teamLog.filter((_, i) => i !== index));
    } else {
      setPersonalLog(personalLog.filter((_, i) => i !== index));
    }
  };

  const filteredLogs = (isTeam ? teamLog : personalLog).filter((log) =>
    log.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="dev-log">
      <h1>Dev Log</h1>
      <div className="log-controls">
        <button
          className={isTeam ? 'active' : ''}
          onClick={() => setIsTeam(true)}
        >
          팀 로그 ({teamLog.length})
        </button>
        <button
          className={!isTeam ? 'active' : ''}
          onClick={() => setIsTeam(false)}
        >
          개인 로그 ({personalLog.length})
        </button>
      </div>

      <textarea
        className="log-input"
        value={newLog}
        onChange={(e) => setNewLog(e.target.value)}
        placeholder={isTeam ? '팀 로그를 작성하세요 !' : '개인 로그를 작성하세요 !'}
      />
      <button className="add-log" onClick={handleAddLog}>포스트</button>

      <input
        className="log-filter"
        type="text"
        placeholder="로그 검색"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <h2>{isTeam ? 'Team Log' : 'Personal Log'}</h2>
      <ul className="log-list">
        {filteredLogs.map((log, index) => (
          <li key={index}>
            {log}
            <button className="delete-log" onClick={() => handleDeleteLog(index)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DevLog;
