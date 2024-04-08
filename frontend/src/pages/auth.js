import React, { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import pepperPandaLogo from '../assets/pepper-panda.png';
import ReCAPTCHA from "react-google-recaptcha";
import './auth.css';

export const Auth = () => {
  return (
    <div className="container" style={{ paddingTop: '120px' }}>
        <header>
            <div className="logo-container">
              <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
            </div>
            <h1>Join Pepper Panda!</h1>
        </header>
        <main>
          <div className="auth">
            <Login />
            <Register />
          </div>
        </main>
        <footer>
          <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
        </footer>
    </div>
  )
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const [recaptchaValue, setRecaptchaValue] = useState(""); // State variable for reCAPTCHA response

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const input = await axios.post("http://localhost:3000/auth/login", { username, password, recaptchaValue });
      const loginBool = input.data.logStatus;
      
      if (loginBool === "true") {
        setCookies("accessToken", input.data.token);
        window.localStorage.setItem("userID", input.data.userID);
        navigate("/");
      } else {
        alert(input.data.message);
      }

    } catch (err) {
      console.error(err);
    }
  }

  const onChange = (value) => {
    setRecaptchaValue(value); // Update reCAPTCHA response in state
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      formType="Login"
      onSubmit={onSubmit}
      onChange={onChange} // Pass onChange function to Form component
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const input = await axios.post("http://localhost:3000/auth/createAccount", { username, password, recaptchaValue });
      const regBool = input.data.regStatus;
      if (regBool === true) {
        alert(input.data.message);
      } else {
        alert(input.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const onChange = (value) => {
    setRecaptchaValue(value); // Update reCAPTCHA response in state
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      formType="Create Account"
      onSubmit={onSubmit}
      onChange={onChange} // Pass onChange function to Form component
    />
  );
};

const Form = ({ username, setUsername, password, setPassword, formType, onSubmit, onChange }) => {
  return (
    <div className={`auth-container ${formType.toLowerCase().replace(" ", "-")}`}>
      <form onSubmit={onSubmit}>
        <h2>{formType}</h2>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            className='auth-input'
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            className='auth-input'
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={onChange} // Pass onChange function
          />
        </div>
        <button type="submit" className='auth-button'>Continue</button>
      </form>
    </div>
  );
}
