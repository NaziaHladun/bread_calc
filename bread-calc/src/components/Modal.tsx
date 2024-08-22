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
      <span>
        <h2>{recipe?.name}</h2>
        <button onClick={onClose}>Close</button>
      </span>

      <ul>
        {recipe?.components.map((component) => (
          <li key={component.name}>
            {component.name}: {component.amountPerKg * quantity}
          </li>
        ))}
      </ul>

      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
      />
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
