import './navbar.css';
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import moonLogo from '../assets/icons/light_mode.png';
import sunLogo from '../assets/icons/dark_mode.png';
import { SearchBar } from "./searchbar";
import { LocalBar } from "./searchLocal"; 
import gearIcon from '../assets/icons/gear_icon.png';

export const Navbar = () => {
    const [cookies,setCookies] = useCookies(["accessToken"]);
    const navigate=useNavigate();
    var pepperIcon=moonLogo;
    let getTheme = JSON.parse(localStorage.getItem("appMode"));
    if(getTheme==="DARK")
    {
        document.body.classList="darkMode";
        pepperIcon=sunLogo;
    }

    const logout = () =>
    {
        setCookies("accessToken", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    const navigateSavedRecipes = () => {
        navigate(`/saved-recipes`);
        location.reload();
    }

    return (
        <div className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/create-recipes" className="nav-link">Create Recipes</Link>
            <button className="nav-saved-recipes-button" onClick={navigateSavedRecipes}>Saved Recipes</button>
            <Link to="/pantry" className="nav-link">Pantry</Link>
            <SearchBar /> 
            <LocalBar />
            <div id="authButton">
                {!cookies.accessToken ? (<Link to="/auth" className='nav-link'>Login/Register</Link>) :
                    (<button className="logout" onClick={logout}>Logout</button>)}
            </div>
            <Link to="/settings" className="nav-link">
                <div className="settings-icon"></div>
            </Link>
            <img src={pepperIcon} style={{width:'80px', height:'80px'}} id="modeIcon" alt="Mode" onClick={checkMode} title="Dark Mode"></img>
        </div>
    );
}

const checkMode = () =>
{
    var mode;
    var icon= document.getElementById("modeIcon");
    document.body.classList.toggle("darkMode");
    if(document.body.classList.contains("darkMode"))
    {
        icon.src=sunLogo;
        icon.title="Light Mode";
        mode = "DARK";
    }
    else
    {
        icon.src=moonLogo;
        icon.title="Dark Mode";
        mode = "LIGHT";
    }

    localStorage.setItem("appMode", JSON.stringify(mode));
}

