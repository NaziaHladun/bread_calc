type RecipeProps = {
  name: string;
  onClick: () => void;
};

const Recipe = ({ name, onClick }: RecipeProps) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <p>{name}</p>
    </div>
  );
};

export default Recipe;
