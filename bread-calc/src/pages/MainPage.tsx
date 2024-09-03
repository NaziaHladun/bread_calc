import Recipe from "../components/Recipe";
import Modal from "../components/Modal";
import Header from "../components/Header";
import AddRecipeButton from "../components/AddRecipeButton";
import ModalEdit from "../components/ModalEdit";

import { database } from "../firebase";
import { Recipe as RecipeType } from "../models/types";

import { useEffect } from "react";
import type { RootState } from "@store/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal, toggleEditModal } from "@store/features/uiSlice";
import { get, ref } from "firebase/database";

import { setAllRecipes } from "@store/features/recipeSlice";

const MainPage: React.FC = () => {
  const { modalIsVisible, editModalIsVisible } = useSelector(
    (state: RootState) => state.UI
  );
  const { selectedRecipe, searchedRecipes } = useSelector(
    (state: RootState) => state.recipe
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesRef = ref(database, "recipes");
        const snapshot = await get(recipesRef);
        const data = snapshot.val();

        if (data) {
          const recipesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch(setAllRecipes(recipesArray));
        }
      } catch (error) {
        console.error("Помилка при завантаженні рецептів:", error); // TODO: show error to user
      }
    };

    fetchRecipes();
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container">
        <Modal
          isOpen={modalIsVisible}
          onClose={() => dispatch(toggleModal())}
          recipe={selectedRecipe}
        />
        <ModalEdit
          isOpen={editModalIsVisible}
          onClose={() => dispatch(toggleEditModal())}
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
