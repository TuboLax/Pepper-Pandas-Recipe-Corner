import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './settings.css';

const DeleteAccountModal = ({ show, onClose, onDelete, navigate }) => {
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
                navigate("/");
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
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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

            const userID = window.localStorage.getItem("userID");
            const response = await axios.post(`http://localhost:3000/auth/checkPassword`, {
                userID: userID,
                password: password
            });

            if (response.data && response.data.success) {
                // Password check successful, proceed with account deletion
                const deleteResponse = await axios.delete(`http://localhost:3000/auth/deleteAccount/${userID}`, {
                    data: {
                        password: password
                    }
                });

                if (deleteResponse.data && deleteResponse.data.success) {
                    alert(deleteResponse.data.message);
                    navigate("/");
                } else {
                    setError(deleteResponse.data.message || "An error occurred. Please try again.");
                }
            } else {
                setError(response.data.message || "Incorrect password. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            setError("An error occurred. Please try again.");
        }
    };

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
                <DeleteAccountModal show={showModal} onClose={() => setShowModal(false)} onDelete={handleDelete} navigate={navigate} />
            </div>

            <footer className="footer">
                <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
            </footer>
        </div>
    );
};
