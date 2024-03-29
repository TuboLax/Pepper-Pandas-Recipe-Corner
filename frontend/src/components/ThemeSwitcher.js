import React from 'react';

const ThemeSwitcher = ({ isDarkMode, toggleTheme }) => {
  const handleToggle = () => {
    console.log('Button clicked');
    toggleTheme();
  };

  return (
    <div className="theme-switcher">
      <button onClick={handleToggle}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
