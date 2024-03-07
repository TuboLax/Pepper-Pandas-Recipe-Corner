import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateRecipes } from "./pages/create-recipes";
import { SavedRecipes } from "./pages/saved-recipes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/auth" element={<Auth></Auth>}></Route>
          <Route path="/create-recipes" element={<CreateRecipes></CreateRecipes>}></Route>
          <Route path="/saved-recipes" element={<SavedRecipes></SavedRecipes>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;