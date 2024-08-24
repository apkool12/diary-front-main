import React, { useState } from 'react';
import './Diary.css'; // Import the CSS file

function Diary() {
  const [entries, setEntries] = useState({});
  const [newEntry, setNewEntry] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [lastEntryDate, setLastEntryDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [previousEntry, setPreviousEntry] = useState(''); // To store the original entry before editing

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
      setPreviousEntry(''); // Reset the previous entry after saving
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
    setNewEntry(dateEntries[index].edited); // Load the edited content for editing
    setPreviousEntry(dateEntries[index].original); // Store the original content
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
        {editingIndex !== null ? 'Update Entry' : 'Add Entry'}
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
          <li className="diary-no-entry">No entries for this date.</li>
        )}
      </ul>
    </div>
  );
}

export default Diary;
