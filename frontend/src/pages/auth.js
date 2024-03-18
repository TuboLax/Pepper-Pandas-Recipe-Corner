import { useState } from "react";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import './auth.css';
import pepperPandaLogo from '../assets/pepper-panda.png';

export const Auth = () =>{
    return(
    <div className="auth">
        <Login />
        <Register />
    </div>
    );
};

const Login = () =>
{
    const [username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const [,setCookies] = useCookies(["accessToken"])
    const navigate = useNavigate();
    let status="";
    let loginBool=false;

    const onSubmit = async (event) =>
    {
        event.preventDefault();

        try{
            const input = await axios.post("http://localhost:3000/auth/login", {username,password});
            loginBool=input.data.logStatus;
            console.log(loginBool);
            if(loginBool==="true")
            {
                status="Login Success!";
                document.getElementById('statusMessage').innerHTML= status;
                setCookies("accessToken",input.data.token);
                window.localStorage.setItem("userID", input.data.userID);
                navigate("/");
            }
            else if(loginBool==="false1")
            {
                status=input.data.message;
                document.getElementById('statusMessage').innerHTML= status;
            }
            else
            {
                status=input.data.message;
                document.getElementById('statusMessage').innerHTML= status;
            }
        } catch(err) {
            console.error(err);
            }
    }

    return(<Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            formType="Login"
            onSubmit={onSubmit}
            />
    );
};

const Register = () =>
{
    const [username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    let status="";
    let regBool=false;

    const onSubmit = async (event) =>
    {
        event.preventDefault(); //prevents page refresh
        try{
            const input = await axios.post("http://localhost:3000/auth/createAccount", {username,password});
            regBool=input.data.regStatus;
            console.log(regBool);
            if(regBool===true)
            {
                status=input.data.message;
                document.getElementById('statusMessage').innerHTML= status;
            }
            else
            {
                status=input.data.message;
                document.getElementById('statusMessage').innerHTML= status;
            }
        } catch (err) {
            console.error(err);
        }
    }

    return(<Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            formType = "Create Account"
            onSubmit={onSubmit}
            />
    );
};

const Form = ({username,setUsername, password, setPassword, formType, onSubmit}) =>
{
    return(
    <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{formType}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event)=>setUsername(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <button type="submit">Continue</button>
                <p id='statusMessage'></p>
            </form>
        </div>
    );
}

export const Auth = () =>{
    return  <div className="container">
    <header>
        <div className="logo-container">
            <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
        </div>
        <h1>Pepper Auth</h1>
    </header>

    <footer>
        <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
    </footer>
</div>
};
