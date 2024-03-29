import React from 'react';
import '../App.css';
import ThemeSwitcher from '../components/ThemeSwitcher'; // Import the ThemeSwitcher component
import bambooSaladImage from '../assets/bamboo-salad.jpg';
import bambooStirFryImage from '../assets/bamboo-stir-fry.jpg';
import pepperPandaLogo from '../assets/pepper-panda.png';

export const Home = () => {
    return (
        <div className="container">
            <header>
                <div className="logo-container">
                    <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
                </div>
                <h1>Welcome to Pepper Panda's Recipe Corner</h1>
                {/* Add the ThemeSwitcher component */}
                <ThemeSwitcher />
            </header>
            <section className="featured-recipes">
                <h2>Featured Recipes</h2>
                <div className="recipe">
                    <h3>Pepper Panda's Bamboo Salad</h3>
                    <p>A refreshing salad made with fresh bamboo shoots and garden greens.</p>
                    <img src={bambooSaladImage} alt="Bamboo Salad" />
                </div>
                <div className="recipe">
                    <h3>Pepper Panda's Bamboo Stir Fry</h3>
                    <p>A delicious stir fry packed with colorful vegetables and tender bamboo shoots.</p>
                    <img src={bambooStirFryImage} alt="Bamboo Stir Fry" />
                </div>
            </section>
            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
