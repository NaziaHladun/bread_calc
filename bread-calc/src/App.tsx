import "./App.css";
import Recipe from "./components/Recipe";
import Modal from "./components/Modal";

import RECIPES from "./recipes";
import { Recipe as RecipeType } from "./models/types";

import type { RootState } from "@store/store";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@store/features/uiSlice";

const App: React.FC = () => {
  const { modalIsVisible } = useSelector((state: RootState) => state.UI);
  const { selectedRecipe } = useSelector((state: RootState) => state.recipe);

  const dispatch = useDispatch();

  return (
    <div className="container">
      <Modal
        isOpen={modalIsVisible}
        onClose={() => dispatch(toggle())}
        recipe={selectedRecipe}
      />
      {RECIPES.map((recipe: RecipeType) => (
        <Recipe
          key={recipe.id}
          name={recipe.name}
          onClick={() => dispatch(toggle())}
          //може мені сюди передавати передавати цілий рецепт і та всередині якраз і буде надсилатися у redux
          fullRecipe={recipe}
        />
      ))}
    </div>
  );
};

export default App;
