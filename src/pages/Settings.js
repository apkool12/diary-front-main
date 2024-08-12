import React, { useState } from 'react';

function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div> 
      <h1>Settings</h1>
      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        Dark Mode
      </label>
    </div>
  );
}

export default Settings;
