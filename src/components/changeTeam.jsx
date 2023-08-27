import { useState, Fragment } from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import ChangeTeamModal from "./changeTeamModal";

function ChangeTeam({ employee, teams, setEmployee }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <Fragment>
      <ChangeTeamModal
        open={open}
        setOpen={setOpen}
        employee={employee}
        teams={teams}
        setEmployee={setEmployee}
      />
      <Tooltip title="Change Team" placement="bottom" color="primary">
        <IconButton onClick={handleOpen}>
          <ChangeCircleIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
}

export default ChangeTeam;
