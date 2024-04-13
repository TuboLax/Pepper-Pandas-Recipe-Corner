import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GroceryListProvider } from './components/grocerylist-context';
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipes";
import { SavedRecipes } from "./pages/saved-recipes";
import { Pantry } from "./pages/pantry";
import { Navbar } from "./components/navbar";
import { Search } from "./pages/search";
import { Settings } from './pages/settings';

function App() {
  return (
    <div className="App">
      <GroceryListProvider> 
        <Router> 
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/create-recipes" element={<CreateRecipe />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
            <Route path="/pantry" element={<Pantry />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </GroceryListProvider>
    </div>
  );
}

export default App;
