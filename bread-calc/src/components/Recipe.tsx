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

  const handleClick = () => {
    dispatch(setSelectedRecipe(fullRecipe));
    onClick();
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <h2>{name}</h2>
    </div>
  );
};

export default Recipe;
