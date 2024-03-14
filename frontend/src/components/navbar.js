import './navbar.css';
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/create-recipes" className="nav-link">Create Recipes</Link>
            <Link to="/saved-recipes" className="nav-link">Saved Recipes</Link>
            <Link to="/auth" className="nav-link">Login/Register</Link>
        </div>
    );
}