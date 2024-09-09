import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

type ActionProps = {
  handleEdit: () => void;
  handleDelete: () => void;
};

const ActionButtons = ({ handleEdit, handleDelete }: ActionProps) => {
  return (
    <section className="action-section">
      <button className="action edit" onClick={handleEdit}>
        <EditIcon />
      </button>
      <button className="action delete" onClick={handleDelete}>
        <DeleteForeverIcon />
      </button>
    </section>
  );
};

export default ActionButtons;
