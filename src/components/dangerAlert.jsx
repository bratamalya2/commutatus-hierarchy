import ReportIcon from "@mui/icons-material/Report";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function DangerAlert({ dangerTitle }) {
  return (
    <Tooltip title={dangerTitle} placement="bottom" color="primary">
      <IconButton>
        <ReportIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DangerAlert;
