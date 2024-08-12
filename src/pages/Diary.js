import React, { useState } from 'react';

function Diary() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  const handleAddEntry = () => {
    setEntries([...entries, newEntry]);
    setNewEntry('');
  };

  return (
    <div>
      <h1>Diary</h1>
      <textarea
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Write your diary entry here..."
      />
      <button onClick={handleAddEntry}>Add Entry</button>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default Diary;
