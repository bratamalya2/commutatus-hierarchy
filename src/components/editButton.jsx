import { useState, Fragment } from "react";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditModal from "./editModal";

function EditButton({ employee, setEmployee, type }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <Fragment>
      <EditModal
        open={open}
        setOpen={setOpen}
        type={type}
        employee={employee}
        setEmployee={setEmployee}
      />
      <Tooltip title="Edit" placement="bottom" color="primary">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
}

export default EditButton;
