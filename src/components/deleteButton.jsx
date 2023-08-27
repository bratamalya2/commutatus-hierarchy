import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function DeleteButton() {
  return (
    <Tooltip title="Remove" placement="bottom" color="primary">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteButton;
