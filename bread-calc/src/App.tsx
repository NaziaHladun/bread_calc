import "./App.css";
import Recipe from "./components/Recipe";
import Modal from "./components/Modal";

import RECIPES from "./recipes";
import { Recipe as RecipeType } from "./models/types";

import type { RootState } from "@store/store";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@store/features/uiSlice";
import { useEffect } from "react";

const App: React.FC = () => {
  const { modalIsVisible } = useSelector((state: RootState) => state.UI);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Azaza", modalIsVisible);
  }, [modalIsVisible]);

  return (
    <div className="container">
      {/* <Modal isOpen={modalIsVisible} onClose={() => dispatch(toggle())} recipe={}/> */}
      {RECIPES.map((recipe: RecipeType) => (
        <Recipe
          key={recipe.id}
          name={recipe.name}
          onClick={() => dispatch(toggle())}
        />
      ))}
    </div>
  );
};

export default App;
