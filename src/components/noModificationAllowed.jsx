import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function NoModificationAllowed() {
  return (
    <Tooltip title="Cannot be modifed" placement="right" color="primary">
      <IconButton sx={{ mt: 2 }}>
        <WarningAmberOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}

export default NoModificationAllowed;
