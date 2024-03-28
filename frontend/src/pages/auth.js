import './auth.css';
import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import pepperPandaLogo from '../assets/pepper-panda.png';

export const Auth = () => {
  return (
    <div className="container">
        <header>
            <div className="logo-container">
            <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
            </div>
            <h1>Join Pepper Panda!</h1>
        </header>
    <body>
        <div className="auth">
          <Login />
          <Register />
        </div>
      </body>
      <footer>
        <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
      </footer>
    </div>
  )
};

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [, setCookies] = useCookies(["accessToken"])
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const input = await axios.post("http://localhost:3000/auth/login", { username, password });
      const loginBool = input.data.logStatus;
      console.log(loginBool);
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

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      formType="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault(); //prevents page refresh
    try {
      const input = await axios.post("http://localhost:3000/auth/createAccount", { username, password });
      const regBool = input.data.regStatus;
      console.log(regBool);
      if (regBool === true) {
        alert(input.data.message);
      } else {
        alert(input.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      formType="Create Account"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({ username, setUsername, password, setPassword, formType, onSubmit }) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{formType}</h2>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}