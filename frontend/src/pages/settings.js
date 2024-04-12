import React, { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './settings.css';

export const Home = () => {

    return (
        <div className="container" style={{ paddingTop: '120px' }}>
            <header>
                <div className="logo-container">
                    <div className="logo"></div>
                </div>
                <h1>Pepper's Settings</h1>
            </header>

            <footer>
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Settings;