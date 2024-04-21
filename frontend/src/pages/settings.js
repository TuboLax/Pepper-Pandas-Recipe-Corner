import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './settings.css';

const DeleteAccountModal = ({ show, onClose, onDelete }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError("");
    };

    const handleDelete = async () => {
        try {
            if (!password) {
                setError("Please enter your password.");
                return;
            }

            const response = await onDelete(password);
            if (response && response.success) {
                alert(response.message);
                onClose();
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        show && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Confirm Account Deletion</h2>
                    <p>Are you sure you want to delete your account?</p>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div>
                        <button className="delete-account-btn" onClick={handleDelete}>Delete Account</button>
                    </div>
                </div>
            </div>
        )
    );            
};

export const Settings = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userID = window.localStorage.getItem("userID");
        setIsLoggedIn(!!userID);
    }, []);

    const handleDelete = async (password) => {
        try {
            const userID = window.localStorage.getItem("userID");
            const response = await axios.delete(`http://localhost:3000/auth/deleteAccount/${userID}`, {
                data: {
                    password: password
                }
            });
            if (response && response.data.success) {
                window.localStorage.removeItem("userID");
                navigate("/");
                window.location.reload();
            }
            return response.data;
        } catch (error) {
            console.error("Error deleting account:", error);
            return { success: false, message: "An error occurred. Please try again." };
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="container" style={{ paddingTop: '120px'}}>
                <header className="header">
                    <div className="logo-container">
                        <div className="logo"></div>
                    </div>
                    <h1>Pepper's Settings</h1>
                </header>
                <section className="content">
                    <p className="sign-in-message">Please sign in to view your settings!</p>
                </section>
                <footer className="footer">
                    <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
                </footer>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '120px' }}>
            <header className="header">
                <div className="logo-container">
                    <div className="logo"></div>
                </div>
                <h1>Pepper's Settings</h1>
            </header>
            
            <div className="settings-content">
                <button className="delete-account-btn" onClick={() => setShowModal(true)}>Delete Account</button>
                <DeleteAccountModal show={showModal} onClose={() => setShowModal(false)} onDelete={handleDelete} />
            </div>

            <footer className="footer-settings">
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );
};