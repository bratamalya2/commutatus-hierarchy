import React, { useRef, Fragment } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

import NoModificationAllowed from "./noModificationAllowed";

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

export default function AddModal({
  open,
  setOpen,
  type,
  setCeo,
  setDepartmentHeads,
  setTeams,
  setEmployees,
  deptHead,
  team,
}) {
  const nameRef = useRef();
  const departmentRef = useRef();
  const idRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const teamNameRef = useRef();
  const isTeamLeadRef = useRef();

  const handleClose = () => setOpen(false);

  const handleClick = () => {
    const department = departmentRef?.current?.value;
    const name = nameRef?.current?.value;
    const id = idRef?.current?.value;
    const phone = phoneRef?.current?.value;
    const email = emailRef?.current?.value;
    const teamName = teamNameRef?.current?.value;
    const isTeamLead = isTeamLeadRef?.current?.checked;
    //create new employee
    if (type === "Department") {
      // department head
      if (!department) enqueueSnackbar("Please enter the department!");
      else {
        setDepartmentHeads({
          name: name,
          department: department,
          id: id,
          phone: phone,
          email: email,
        });
        handleClose();
      }
    } else if (type === "CEO") {
      // ceo
      if (!name || !id || !phone || !email)
        enqueueSnackbar("Please enter all fields!");
      else {
        setCeo({
          name: name,
          id: id,
          phone: phone,
          email: email,
        });
        handleClose();
      }
    } else if (type === "Team") {
      // team
      if (!teamName) enqueueSnackbar("Please enter the team name!");
      else {
        const res = setTeams({
          name: teamName,
          deptHead: deptHead,
        });
        if (!res) enqueueSnackbar("Please enter unique team name!");
        handleClose();
      }
    } else if (type === "Employee") {
      //employee
      if (!name || !id || !phone || !email)
        enqueueSnackbar("Please enter all fields!");
      else {
        setEmployees({
          name: name,
          teamName: team,
          isTeamLead: isTeamLead,
          id: id,
          phone: phone,
          email: email,
        });
        handleClose();
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {type === "CEO" && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add CEO
            </Typography>
          )}
          {type === "Department" && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new Department Head
            </Typography>
          )}
          {type === "Team" && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new Team
            </Typography>
          )}
          {type === "Employee" && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new Employee
            </Typography>
          )}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add details:
          </Typography>
          {type === "Department" && (
            <TextField
              id="outlined-basic"
              label="Department Name"
              variant="outlined"
              inputRef={departmentRef}
              color="tertiary"
              margin="normal"
            />
          )}
          {type !== "Team" && (
            <Fragment>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                inputRef={nameRef}
                color="tertiary"
                margin="normal"
              />
              <div>
                <TextField
                  id="outlined-basic"
                  label="Employee ID"
                  variant="outlined"
                  inputRef={idRef}
                  color="tertiary"
                  margin="normal"
                />
                <NoModificationAllowed />
              </div>
              <TextField
                id="outlined-basic"
                label="Phone No"
                variant="outlined"
                inputRef={phoneRef}
                color="tertiary"
                margin="normal"
              />
              <TextField
                inputProps={{ type: "email" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                inputRef={emailRef}
                color="tertiary"
                margin="normal"
              />
            </Fragment>
          )}
          {type === "Team" && (
            <TextField
              id="outlined-basic"
              label="Team Name"
              variant="outlined"
              inputRef={teamNameRef}
              color="tertiary"
              margin="normal"
            />
          )}
          {type === "Employee" && (
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Team Member Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={false}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio inputRef={isTeamLeadRef} />}
                  label="Employee"
                />
                <FormControlLabel
                  value={true}
                  control={<Radio inputRef={isTeamLeadRef} />}
                  label="Team Lead"
                />
              </RadioGroup>
            </FormControl>
          )}
          <div>
            <Button variant="outlined" onClick={handleClick}>
              ADD
            </Button>
          </div>
        </Box>
      </Modal>
      <SnackbarProvider variant="error" />
    </div>
  );
}
