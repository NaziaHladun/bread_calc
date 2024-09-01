import { useDispatch } from "react-redux";
import { toggleEditModal } from "@store/features/uiSlice";

import AddIcon from "@mui/icons-material/Add";

const AddRecipeButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="add-recipe-button"
      type="button"
      onClick={() => dispatch(toggleEditModal())}
    >
      <AddIcon fontSize="large" />
    </button>
  );
};

export default AddRecipeButton;
