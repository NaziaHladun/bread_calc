import React from "react";

type ComponentInputProps = {
  index: number;
  component: {
    name: string;
    amount: number;
  };
  componentsLength: number;
  handleComponentChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
  handleAddComponent: () => void;
  handleRemoveComponent: (index: number) => void;
};

const ComponentsInputs: React.FC<ComponentInputProps> = ({
  index,
  component,
  componentsLength,
  handleComponentChange,
  handleAddComponent,
  handleRemoveComponent,
}) => {
  return (
    <div className="components-input">
      <input
        required
        type="text"
        placeholder="Назва компонента"
        name={`component-name-${index}`}
        autoComplete="off"
        value={component.name}
        onChange={(e) => handleComponentChange(index, "name", e.target.value)}
      />
      <input
        required
        type="number"
        placeholder="Кількість"
        name={`component-amount-${index}`}
        autoComplete="off"
        value={component.amount}
        onChange={(e) =>
          handleComponentChange(index, "amount", Number(e.target.value))
        }
      />
      {index === componentsLength - 1 ? (
        <button onClick={handleAddComponent}>Додати</button>
      ) : (
        <button
          className="remove-button"
          type="button"
          onClick={() => handleRemoveComponent(index)}
        >
          Видалити
        </button>
      )}
    </div>
  );
};

export default ComponentsInputs;
