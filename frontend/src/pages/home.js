import React, { useState, useEffect } from 'react';
import '../App.css';
import ThemeSwitcher from '../components/ThemeSwitcher';
import bambooSaladImage from '../assets/bamboo-salad.jpg';
import bambooStirFryImage from '../assets/bamboo-stir-fry.jpg';
import pepperPandaLogo from '../assets/pepper-panda.png';

export const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    console.log('Home component rendered');
    
    console.log('isDarkMode:', isDarkMode);

    return (
        <div className={`container ${isDarkMode ? 'dark' : 'light'}`}>
            <header>
                <div className="logo-container">
                    <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
                </div>
                <h1>Welcome to Pepper Panda's Recipe Corner</h1>
                
                <ThemeSwitcher isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </header>
            <section className="featured-recipes">
                <h2>Featured Recipes</h2>
                <div className="recipe-container">
                    <div className="recipe">
                        <h3>Pepper Panda's Bamboo Salad</h3>
                        <p>A refreshing salad made with fresh bamboo shoots and garden greens.</p>
                        <img src={bambooSaladImage} alt="Bamboo Salad" className="recipe-image" style={{ width: '33%', height: 'auto' }} />
                    </div>
                    <div className="recipe">
                        <h3>Pepper Panda's Bamboo Stir Fry</h3>
                        <p>A delicious stir fry packed with colorful vegetables and tender bamboo shoots.</p>
                        <img src={bambooStirFryImage} alt="Bamboo Stir Fry" className="recipe-image" style={{ width: '33%', height: 'auto' }} />
                    </div>
                </div>
            </section>
            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
