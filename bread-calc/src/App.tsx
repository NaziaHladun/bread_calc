import "./App.css";
import Recipe from "./components/Recipe";
import Modal from "./components/Modal";

// import RECIPES from "./recipes";
import { Recipe as RecipeType } from "./models/types";

import type { RootState } from "@store/store";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@store/features/uiSlice";
import Header from "./components/Header";

const App: React.FC = () => {
  const { modalIsVisible } = useSelector((state: RootState) => state.UI);
  const { selectedRecipe, searchedRecipes } = useSelector(
    (state: RootState) => state.recipe
  );

  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <div className="container">
        <Modal
          isOpen={modalIsVisible}
          onClose={() => dispatch(toggle())}
          recipe={selectedRecipe}
        />
        {searchedRecipes?.map((recipe: RecipeType) => (
          <Recipe
            key={recipe.id}
            name={recipe.name}
            onClick={() => dispatch(toggle())}
            fullRecipe={recipe}
          />
        ))}
      </div>
    </>
  );
};

export default App;
