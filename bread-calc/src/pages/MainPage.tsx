import Recipe from "../components/Recipe";
import Modal from "../components/Modal";
import Header from "../components/Header";
import AddRecipeButton from "../components/AddRecipeButton";
import ModalEdit from "../components/ModalEdit";

import { Recipe as RecipeType } from "../models/types";

import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "@store/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal, toggleEditModal } from "@store/features/uiSlice";

import { fetchRecipes, setSearchRecipe } from "@store/features/recipeSlice";

const MainPage = () => {
  const { modalIsVisible, editModalIsVisible } = useSelector(
    (state: RootState) => state.UI
  );
  const { selectedRecipe, searchedRecipes, allRecipes } = useSelector(
    (state: RootState) => state.recipe
  );

  const [queryString, setQueryString] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  useEffect(() => {
    dispatch(setSearchRecipe(queryString));
  }, [queryString, allRecipes]);

  return (
    <>
      <Header setQueryString={setQueryString} />
      <div className="container">
        <Modal
          isOpen={modalIsVisible}
          onClose={() => dispatch(toggleModal())}
          recipe={selectedRecipe}
        />
        <ModalEdit
          isOpen={editModalIsVisible}
          onClose={() => dispatch(toggleEditModal())}
          recipeToEdit={selectedRecipe}
        />
        {searchedRecipes?.map((recipe: RecipeType) => (
          <Recipe
            key={recipe.id}
            name={recipe.name}
            onClick={() => dispatch(toggleModal())} //TODO: refresh page after closing
            fullRecipe={recipe}
          />
        ))}
      </div>
      <AddRecipeButton />
    </>
  );
};

export default MainPage;
