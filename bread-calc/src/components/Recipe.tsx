import { useEffect } from "react";
import { Recipe as RecipeType } from "../models/types";
import { useDispatch } from "react-redux";
import { setSelectedRecipe } from "@store/features/recipeSlice";

type RecipeProps = {
  name: string;
  onClick: () => void;
  fullRecipe: RecipeType;
};

const Recipe = ({ name, onClick, fullRecipe }: RecipeProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedRecipe(fullRecipe));
  }, [dispatch, fullRecipe]);

  return (
    <div className="recipe-card" onClick={onClick}>
      <p>{name}</p>
    </div>
  );
};

export default Recipe;
