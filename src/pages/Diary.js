import React, { useState } from 'react';
import './Diary.css';
function Diary() {
  const [entries, setEntries] = useState({});
  const [newEntry, setNewEntry] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [lastEntryDate, setLastEntryDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [previousEntry, setPreviousEntry] = useState('');
  const handleAddEntry = () => {
    if (newEntry.trim()) {
      const dateEntries = entries[selectedDate] || [];
      
      if (editingIndex !== null) {
        const updatedEntry = `${newEntry} <수정함>`;
        dateEntries[editingIndex] = {
          original: previousEntry,
          edited: updatedEntry,
        };
        setEditingIndex(null);
      } else {
        dateEntries.push({ original: newEntry, edited: newEntry });
      }

      setEntries({
        ...entries,
        [selectedDate]: dateEntries,
      });

      setNewEntry('');
      setLastEntryDate(selectedDate);
      setPreviousEntry(''); 
    }
  };

  const handleDeleteEntry = (index) => {
    const dateEntries = entries[selectedDate] || [];
    const updatedEntries = dateEntries.filter((_, i) => i !== index);

    setEntries({
      ...entries,
      [selectedDate]: updatedEntries,
    });
  };

  const handleEditEntry = (index) => {
    const dateEntries = entries[selectedDate];
    setNewEntry(dateEntries[index].edited);
    setPreviousEntry(dateEntries[index].original);
    setEditingIndex(index);
  };

  return (
    <div className="diary-container">
      <h1 className="diary-title">Diary</h1>

      <input
        type="date"
        className="diary-date-picker"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <textarea
        className="diary-textarea"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="당신의 하루를 기록해 보아요"
      />

      <button className="diary-button" onClick={handleAddEntry}>
        {editingIndex !== null ? '기록 덮어쓰기' : '기록 추가하기'}
      </button>

      {lastEntryDate && (
        <div className="diary-message">
          <p>{`${lastEntryDate}의 일기`}</p>
        </div>
      )}

      <ul className="diary-entries">
        {entries[selectedDate] && entries[selectedDate].length > 0 ? (
          entries[selectedDate].map((entry, index) => (
            <li className="diary-entry" key={index}>
              <p><strong>Original:</strong> {entry.original}</p>
              <p><strong>Edited:</strong> {entry.edited}</p>
              <div className="diary-entry-controls">
                <button onClick={() => handleEditEntry(index)}>Edit</button>
                <button onClick={() => handleDeleteEntry(index)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <li className="diary-no-entry">이 날에는 기록이 존재하지 않아요.</li>
        )}
      </ul>
    </div>
  );
}

export default Diary;
