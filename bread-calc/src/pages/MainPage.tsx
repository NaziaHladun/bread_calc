import Recipe from "../components/Recipe";
import Modal from "../components/Modal";

import { Recipe as RecipeType } from "../models/types";

import type { RootState } from "@store/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal, toggleEditModal } from "@store/features/uiSlice";
import Header from "../components/Header";
import AddRecipeButton from "../components/AddRecipeButton";
import ModalEdit from "../components/ModalEdit";

const MainPage: React.FC = () => {
  const { modalIsVisible, editModalIsVisible } = useSelector(
    (state: RootState) => state.UI
  );
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
            onClick={() => dispatch(toggleModal())}
            fullRecipe={recipe}
          />
        ))}
      </div>
      <AddRecipeButton />
    </>
  );
};

export default MainPage;
