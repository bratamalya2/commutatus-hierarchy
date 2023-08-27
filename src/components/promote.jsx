import UpgradeIcon from "@mui/icons-material/Upgrade";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function Promote() {
  return (
    <Tooltip title="Promote" placement="bottom" color="primary">
      <IconButton>
        <UpgradeIcon />
      </IconButton>
    </Tooltip>
  );
}

export default Promote;
