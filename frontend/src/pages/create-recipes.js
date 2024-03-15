import './create-recipes.css';
import pepperPandaLogo from '../assets/pepper-panda.png';
export const CreateRecipe = () =>{
    return  <div className="container">
    <header>
        <div className="logo-container">
            <img src={pepperPandaLogo} alt="Pepper Panda" className="logo" />
        </div>
        <h1>Pepper's Cooking</h1>
    </header>

    <footer>
        <p>&copy; 2024 Pepper Panda's Recipe Corner. All rights reserved.</p>
    </footer>
</div>
};