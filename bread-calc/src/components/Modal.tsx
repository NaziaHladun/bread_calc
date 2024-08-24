import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Recipe } from "../models/types.ts";

import type { RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  setQuantity,
} from "@store/features/recipeSlice.ts";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
};

const Modal = ({ isOpen, onClose, recipe }: ModalProps) => {
  const { quantityInKg } = useSelector((state: RootState) => state.recipe);

  const dialog = useRef<HTMLDialogElement>(null);

  const dispatch = useDispatch();

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

  return createPortal(
    <dialog ref={dialog} className="modal">
      <div className="modal-header">
        <button onClick={onClose}>
          <p>Close</p>
        </button>
        <h2>{recipe?.name}</h2>
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
