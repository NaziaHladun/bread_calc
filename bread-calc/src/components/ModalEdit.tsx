import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ComponentsInputs from "./ComponentsInputs";

import { Recipe } from "../models/types";
import CloseButton from "./CloseButton";

import { database } from "../firebase";
import { ref, update, push, set } from "firebase/database"; // Додано push і set для створення нового рецепта
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import { fetchRecipes, setSelectedRecipe } from "@store/features/recipeSlice";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipeToEdit: Recipe | null; // Передаємо рецепт для редагування
};

type Component = {
  name: string;
  amount: number;
};

const ModalEdit: React.FC<ModalProps> = ({ isOpen, onClose, recipeToEdit }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [recipeName, setRecipeName] = useState<string>("");
  const [components, setComponents] = useState<Component[]>([
    { name: "", amount: 0 },
  ]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isOpen) {
      dialog.current?.showModal();

      // Якщо редагуємо існуючий рецепт, заповнюємо поля
      if (recipeToEdit) {
        setRecipeName(recipeToEdit.name);
        setComponents(
          recipeToEdit.components.map((component) => ({
            name: component.name,
            amount: component.amountPerKg,
          }))
        );
      }
    } else {
      dialog.current?.close();
      // Скидаємо поля при закритті модального вікна
      setRecipeName("");
      setComponents([{ name: "", amount: 0 }]);
    }
  }, [isOpen, recipeToEdit]);

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
    try {
      let newRecipe: Recipe;

      if (recipeToEdit) {
        // Оновлення існуючого рецепта
        const recipeRef = ref(database, `recipes/${recipeToEdit.id}`);
        newRecipe = {
          id: recipeToEdit.id,
          name: recipeName,
          components: components.map((component) => ({
            name: component.name,
            amountPerKg: component.amount,
          })),
        };
        await update(recipeRef, newRecipe);
      } else {
        // Створення нового рецепта
        const newRecipeRef = push(ref(database, "recipes"));
        newRecipe = {
          id: newRecipeRef.key as string,
          name: recipeName,
          components: components.map((component) => ({
            name: component.name,
            amountPerKg: component.amount,
          })),
        };
        await set(newRecipeRef, newRecipe);
      }

      setRecipeName("");
      setComponents([{ name: "", amount: 0 }]);
      onClose();
      dispatch(fetchRecipes());
    } catch (error) {
      console.error("Помилка при збереженні рецепта:", error); // TODO: повідомлення про помилку для користувача
    }
  };

  const handleClose = () => {
    dispatch(setSelectedRecipe(null));
    onClose();
  };

  return createPortal(
    <dialog ref={dialog} className="modal">
      <div className="modal-header">
        <CloseButton onClose={handleClose} />
        <h2>{recipeToEdit ? "Редагування рецепта" : "Додавання рецепта"}</h2>
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
