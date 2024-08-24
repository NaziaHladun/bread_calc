import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Recipe } from "../models/types.ts";

import type { RootState } from "@store/store";
import { useSelector } from "react-redux";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
};

const Modal = ({ isOpen, onClose, recipe }: ModalProps) => {
  const { quantityInKg } = useSelector((state: RootState) => state.recipe);

  const dialog = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(quantityInKg);

  useEffect(() => {
    if (isOpen) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [isOpen]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
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
                  {component.name}: <b>{component.amountPerKg * quantity}</b>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="quantity-component">
          <button>-</button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
          <button>+</button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
