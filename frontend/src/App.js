import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { CreateRecipe } from './pages/create-recipes';
import { SavedRecipes } from './pages/saved-recipes';
import { Navbar } from './components/navbar'; // Assuming Navbar is exported as the default export
import { ThemeSwitcher } from './components/ThemeSwitcher'; // Assuming ThemeSwitcher is exported as the default export

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipes" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
        <ThemeSwitcher isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </Router>
    </div>
  );
}

export default App;
