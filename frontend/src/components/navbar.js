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
            <Link to="/">Home</Link>
            <Link to="/create-recipes">Create Recipes</Link>
            <Link to="/saved-recipes">Saved Recipes</Link>
            {!cookies.accessToken ? (<Link to="/auth">Login/Register</Link>) : (<button onClick={logout}>Logout</button>)}
        </div>
    );
}