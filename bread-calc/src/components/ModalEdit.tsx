import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ComponentsInputs from "./ComponentsInputs";

import { Recipe } from "../models/types";
import CloseButton from "./CloseButton";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Component = {
  name: string;
  amount: number;
};

const ModalEdit: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [recipeName, setRecipeName] = useState<string>("");
  const [components, setComponents] = useState<Component[]>([
    { name: "", amount: 0 },
  ]);

  useEffect(() => {
    if (isOpen) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [isOpen]);

  const handleComponentChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedComponents = [...components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      [field]: value,
    };
    setComponents(updatedComponents);
  };

  const handleAddComponent = () => {
    setComponents([...components, { name: "", amount: 0 }]);
  };

  const handleRemoveComponent = (index: number) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
  };

  const handleSaveRecipe = () => {
    const newRecipe: Recipe = {
      id: 111, //temporary decision
      name: recipeName,
      components: components.map((component) => ({
        name: component.name,
        amountPerKg: component.amount,
      })),
    };

    //save logic
    console.log("Новий рецепт:", newRecipe);

    setRecipeName("");
    setComponents([{ name: "", amount: 0 }]);
    onClose();
  };

  return createPortal(
    <dialog ref={dialog} className="modal">
      <div className="modal-header">
        <CloseButton onClose={onClose} />
        <h2>Редагування рецепта</h2>
      </div>
      <div className="edit">
        <input
          required
          type="text"
          placeholder="Назва рецепта"
          name="recipe-name"
          autoComplete="off"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        {components.map((component, index) => (
          <ComponentsInputs
            key={index}
            index={index}
            component={component}
            componentsLength={components.length}
            handleComponentChange={handleComponentChange}
            handleAddComponent={handleAddComponent}
            handleRemoveComponent={handleRemoveComponent}
          />
        ))}
      </div>
      <span className="save-section">
        <button className="save" type="button" onClick={handleSaveRecipe}>
          Зберегти
        </button>
      </span>
    </dialog>,
    document.getElementById("modal")!
  );
};

export default ModalEdit;
