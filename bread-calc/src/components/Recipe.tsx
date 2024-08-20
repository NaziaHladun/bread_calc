const Recipe: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="recipe-card">
      <p>{name}</p>
    </div>
  );
};

export default Recipe;
