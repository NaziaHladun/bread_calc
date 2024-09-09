import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Recipe } from "../models/types.ts";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@store/store";
import {
  decrementQuantity,
  fetchRecipes,
  incrementQuantity,
  setQuantity,
  setSelectedRecipe,
} from "@store/features/recipeSlice.ts";
import { toggleEditModal } from "@store/features/uiSlice.ts";

import CloseButton from "./CloseButton.tsx";
import ActionButtons from "./ActionButtons.tsx";

import { ref, remove } from "firebase/database";
import { database } from "../firebase";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
  isAdmin: boolean;
};

const Modal = ({ isOpen, onClose, recipe, isAdmin }: ModalProps) => {
  const { quantityInKg } = useSelector((state: RootState) => state.recipe);

  const dialog = useRef<HTMLDialogElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isOpen) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
      dispatch(setQuantity(1));
    }
  }, [isOpen, dispatch]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuantity(Number(event.target.value)));
  };

  const handleEdit = () => {
    if (recipe) {
      dispatch(setSelectedRecipe(recipe));
      dispatch(toggleEditModal());
      onClose();
    }
  };

  const handleDelete = async () => {
    if (recipe) {
      try {
        const recipeRef = ref(database, `recipes/${recipe.id}`);
        await remove(recipeRef);
        onClose();
        dispatch(fetchRecipes());
      } catch (error) {
        console.error("Помилка при видаленні рецепта:", error); // TODO: показати помилку користувачу
      }
    }
  };

  const handleClose = () => {
    dispatch(setSelectedRecipe(null));
    onClose();
  };

  return createPortal(
    <dialog ref={dialog} className="modal">
      <CloseButton onClose={handleClose} />
      <div className="modal-header">
        <h2>{recipe?.name}</h2>
        {isAdmin && (
          <ActionButtons handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
      </div>
      <div className="modal-components">
        <div className="list-component">
          <ul>
            {recipe?.components.map((component) => (
              <li key={component.name}>
                <p>
                  {component.name}:{" "}
                  <b>{component.amountPerKg * quantityInKg}</b>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="quantity-component">
          <button onClick={() => dispatch(decrementQuantity())}>-</button>
          <input
            type="number"
            value={quantityInKg}
            onChange={handleQuantityChange}
            min="1"
          />
          <button onClick={() => dispatch(incrementQuantity())}>+</button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
