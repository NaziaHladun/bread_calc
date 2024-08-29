import { setSearchRecipe } from "@store/features/recipeSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchRecipe(event.target.value));
  };

  return (
    <header>
      <input type="search" placeholder="Search" onChange={handleChange} />
    </header>
  );
};

export default Header;
