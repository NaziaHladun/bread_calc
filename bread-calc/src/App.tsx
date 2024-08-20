import "./App.css";
import Recipe from "./components/Recipe";

import RECIPES from "./recipes";
import { Recipe as RecipeType } from "./models/types";

const App: React.FC = () => {
  return (
    <div className="container">
      {RECIPES.map((recipe: RecipeType) => (
        <Recipe key={recipe.id} name={recipe.name} />
      ))}
    </div>
  );
};

export default App;
