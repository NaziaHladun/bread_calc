import ClearIcon from "@mui/icons-material/Clear";

type CloseButtonProps = {
  onClose: () => void;
};

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button className="close-button" type="button" onClick={onClose}>
      <ClearIcon />
    </button>
  );
};

export default CloseButton;
