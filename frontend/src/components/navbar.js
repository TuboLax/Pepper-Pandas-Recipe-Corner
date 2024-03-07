import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create-recipes">Create Recipes</Link>
            <Link to="/saved-recipes">Saved Recipes</Link>
            <Link to="/auth">Login/Register</Link>
        </div>
    );
}