import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Recipe } from "../models/types.ts";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, recipe }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [isOpen]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return createPortal(
    <dialog ref={dialog} className="modal">
      <h2>{recipe.name}</h2>
      <ul>
        {recipe.components.map((component) => (
          <li key={component.name}>
            {component.name}: {component.amountPerKg * quantity}g
          </li>
        ))}
      </ul>
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
      />
      <button onClick={onClose}>Close</button>
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
