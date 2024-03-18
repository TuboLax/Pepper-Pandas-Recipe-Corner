import './navbar.css';
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [cookies,setCookies] = useCookies(["accessToken"]);
    const navigate=useNavigate();

    const logout = () =>
    {
        setCookies("accessToken", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }
    return (
        <div className="navbar">

            <Link to="/" className="nav-link">Home</Link>
            <Link to="/create-recipes" className="nav-link">Create Recipes</Link>
            <Link to="/saved-recipes" className="nav-link">Saved Recipes</Link>
            <Link to="/auth" className="nav-link">Login/Register</Link>
            {!cookies.accessToken ? (<Link to="/auth">Login/Register</Link>) : (<button onClick={logout}>Logout</button>)}
        </div>
    );
}