import React, { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ChangeTeamModal({
  open,
  setOpen,
  employee,
  teams,
  setEmployee,
}) {
  const [availableTeams, setAvailableTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  const handleClick = () => {
    if (selectedTeam === "") enqueueSnackbar("Please select a team");
    else {
      setEmployee({
        ...employee,
        teamName: selectedTeam,
      });
    }
    handleClose();
  };

  useEffect(() => {
    setAvailableTeams(
      teams.filter(
        (team) =>
          JSON.stringify(team.deptHead) ===
          JSON.stringify(employee.teamName.deptHead)
      )
    );
  }, [employee, teams]);

  return (
    <Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Team</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTeam}
              label="Team"
              onChange={handleChange}
            >
              {availableTeams.map((t, i) => (
                <MenuItem key={i} value={t}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={handleClick}>
            CHANGE
          </Button>
        </Box>
      </Modal>
      <SnackbarProvider variant="error" />
    </Fragment>
  );
}
