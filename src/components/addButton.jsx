import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import AddModal from "./addModal";
import "../styles/addButton.css";

function AddButton({
  hoverText,
  type,
  setCeo,
  setDepartmentHeads,
  setTeams,
  setEmployees,
  deptHead,
  team,
  marginLeft,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <div style={{ marginLeft: marginLeft }}>
      <AddModal
        open={open}
        setOpen={setOpen}
        type={type}
        setEmployees={setEmployees}
        setTeams={setTeams}
        setDepartmentHeads={setDepartmentHeads}
        setCeo={setCeo}
        deptHead={deptHead}
        team={team}
      />
      <div className="btn">
        <Tooltip title={hoverText}>
          <IconButton onClick={handleOpen}>
            <AddCircleOutlineOutlinedIcon color="primary" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default AddButton;
