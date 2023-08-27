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

export default function EditModal({
  open,
  setOpen,
  type,
  employee,
  setEmployee,
}) {
  const nameRef = useRef();
  const departmentRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const teamNameRef = useRef();
  const isTeamLeadRef = useRef();

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleClick = () => {
    const department = departmentRef?.current?.value;
    const name = nameRef?.current?.value;
    const phone = phoneRef?.current?.value;
    const email = emailRef?.current?.value;
    const teamName = teamNameRef?.current?.value;
    const isTeamLead = isTeamLeadRef?.current?.checked;
    //create new employee
    if (type === "departmentHead") {
      // department head
      if (!department) enqueueSnackbar("Please enter the department!");
      else {
        setEmployee({
          name: name,
          department: department,
          id: employee.id,
          phone: phone,
          email: email,
        });
        handleClose();
      }
    } else if (type === "ceo") {
      // ceo
      if (!name || !phone || !email)
        enqueueSnackbar("Please enter all fields!");
      else {
        setEmployee({
          name: name,
          id: employee.id,
          phone: phone,
          email: email,
        });
        handleClose();
      }
    } else if (type === "team") {
      // team
      if (!teamName) enqueueSnackbar("Please enter the team name!");
      else {
        const res = setEmployee({
          name: teamName,
          deptHead: employee.deptHead,
        });
        if (!res) enqueueSnackbar("Please enter unique team name!");
        handleClose();
      }
    } else if (type === "employee") {
      //employee
      if (!name || !phone || !email)
        enqueueSnackbar("Please enter all fields!");
      else {
        setEmployee({
          name: name,
          teamName: employee.teamName,
          isTeamLead: isTeamLead,
          id: employee.id,
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
        onClose={(e) => handleClose(e)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {type === "ceo" && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit CEO
            </Typography>
          )}
          {type === "departmentHead" && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Department Head
            </Typography>
          )}
          {type === "team" && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Team
            </Typography>
          )}
          {type === "employee" && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Employee
            </Typography>
          )}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Edit details:
          </Typography>
          {type === "departmentHead" && (
            <TextField
              id="outlined-basic"
              label="Department Name"
              variant="outlined"
              defaultValue={employee.department}
              inputRef={departmentRef}
              color="tertiary"
              margin="normal"
            />
          )}
          {type !== "team" && (
            <Fragment>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                defaultValue={employee.name}
                inputRef={nameRef}
                color="tertiary"
                margin="normal"
              />
              <TextField
                id="outlined-basic"
                label="Phone No"
                variant="outlined"
                defaultValue={employee.phone}
                inputRef={phoneRef}
                color="tertiary"
                margin="normal"
              />
              <TextField
                inputProps={{ type: "email" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                defaultValue={employee.email}
                inputRef={emailRef}
                color="tertiary"
                margin="normal"
              />
            </Fragment>
          )}
          {type === "team" && (
            <TextField
              id="outlined-basic"
              label="Team Name"
              variant="outlined"
              inputRef={teamNameRef}
              color="tertiary"
              margin="normal"
            />
          )}
          {type === "employee" && (
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
              EDIT
            </Button>
          </div>
        </Box>
      </Modal>
      <SnackbarProvider variant="error" />
    </div>
  );
}
