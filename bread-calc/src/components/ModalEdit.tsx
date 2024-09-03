import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ComponentsInputs from "./ComponentsInputs";

import { Recipe } from "../models/types";
import CloseButton from "./CloseButton";

import { database } from "../firebase";
import { ref, push, set } from "firebase/database";

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

  const handleSaveRecipe = async () => {
    const newRecipeRef = push(ref(database, "recipes")); // Створює новий унікальний ключ (ID)

    try {
      const newRecipe: Recipe = {
        id: newRecipeRef.key as string,
        name: recipeName,
        components: components.map((component) => ({
          name: component.name,
          amountPerKg: component.amount,
        })),
      };

      console.log(newRecipe);
      await set(newRecipeRef, newRecipe); // Save recipe in Firebase

      setRecipeName("");
      setComponents([{ name: "", amount: 0 }]);
      onClose();
    } catch (error) {
      console.error("Помилка при збереженні рецепта:", error); //TODO: error message for user
    }
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
