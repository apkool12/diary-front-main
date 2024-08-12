import React, { useState } from 'react';

function DevLog() {
  const [teamLog, setTeamLog] = useState([]);
  const [personalLog, setPersonalLog] = useState([]);
  const [newLog, setNewLog] = useState('');
  const [isTeam, setIsTeam] = useState(true);

  const handleAddLog = () => {
    if (isTeam) {
      setTeamLog([...teamLog, newLog]);
    } else {
      setPersonalLog([...personalLog, newLog]);
    }
    setNewLog('');
  };

  return (
    <div>
      <h1>Dev Log</h1>
      <button onClick={() => setIsTeam(true)}>Team Log</button>
      <button onClick={() => setIsTeam(false)}>Personal Log</button>

      <textarea
        value={newLog}
        onChange={(e) => setNewLog(e.target.value)}
        placeholder={isTeam ? "Write your team log..." : "Write your personal log..."}
      />
      <button onClick={handleAddLog}>Add Log</button>

      <h2>{isTeam ? "Team Log" : "Personal Log"}</h2>
      <ul>
        {(isTeam ? teamLog : personalLog).map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default DevLog;
