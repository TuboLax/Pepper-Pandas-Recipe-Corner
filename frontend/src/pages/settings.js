import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './settings.css';
import gearIcon from '../assets/icons/gear_icon.png';

export const Settings = () => {
    const navigate = useNavigate();

    const deleteAccount = async () => {
        // Ask for confirmation before deleting the account
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmation) {
            return; // If the user cancels, do nothing
        }

        try {
            const userID = window.localStorage.getItem("userID");
            const response = await axios.delete(`http://localhost:3000/auth/deleteAccount/${userID}`);
            if (response.data.success) {
                alert(response.data.message);
                window.localStorage.removeItem("userID"); // Remove stored user ID
                document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Remove access token cookie
                navigate("/logout"); // Redirect to logout or home page
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '120px' }}>
            <header className="settings-header">
                <div className="logo-container">
                    <div className="logo"></div>
                </div>
                <h1>Pepper's Settings</h1>
            </header>
            
            <div className="settings-content">
                <button className="delete-account-btn" onClick={deleteAccount}>Delete Account</button>
            </div>

            <footer className="settings-footer">
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );
};