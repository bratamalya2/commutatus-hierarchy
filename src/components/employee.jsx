import { useNavigate } from "react-router-dom";

import EditButton from "./editButton";
import Promote from "./promote";
import ChangeTeam from "./changeTeam";
import DeleteButton from "./deleteButton";
import DangerAlert from "./dangerAlert";

import "../styles/employee.css";

function Employee({
  employee,
  teams,
  setEmployee,
  type,
  isError,
  errorTitle,
  deleteItem,
  promoteEmployee,
}) {
  let marginLeft;
  const navigate = useNavigate();

  if (type === "ceo") marginLeft = "20px";

  if (type === "departmentHead") {
    marginLeft = "40px";
    return (
      <div
        style={{ marginLeft: marginLeft, cursor: "pointer" }}
        className="employee-container"
        onClick={() => navigate(`/department?id=${employee.id}`)}
      >
        <div style={{ fontWeight: "bold" }}>Head of {employee.department}</div>
        <div>Name: {employee.name}</div>
        <div>ID: {employee.id}</div>
        <div>Phone: {employee.phone}</div>
        <div>Email: {employee.email}</div>
        <span>
          <EditButton
            employee={employee}
            setEmployee={setEmployee}
            type={type}
          />
        </span>
        <span onClick={deleteItem}>
          <DeleteButton />
        </span>
      </div>
    );
  }

  if (type === "team") {
    marginLeft = "60px";
    return (
      <div
        style={{ marginLeft: marginLeft, cursor: "pointer" }}
        className="employee-container"
        onClick={() => navigate(`/team?name=${employee.name}`)}
      >
        <div className="team-name-error-container">
          <div>
            Team Name:{" "}
            <span style={{ fontWeight: "bold" }}>{employee.name}</span>
          </div>
          {isError && <DangerAlert dangerTitle={errorTitle} />}
        </div>
        <span>
          <EditButton
            employee={employee}
            setEmployee={setEmployee}
            type={type}
          />
        </span>
        <span onClick={deleteItem}>
          <DeleteButton />
        </span>
      </div>
    );
  }

  if (type === "employee") marginLeft = "80px";

  return (
    <div style={{ marginLeft: marginLeft }} className="employee-container">
      {type === "ceo" && <div style={{ fontWeight: "bold" }}>CEO</div>}
      {type === "departmentHead" && (
        <div style={{ fontWeight: "bold" }}>Head of {employee.department}</div>
      )}
      {type === "employee" && employee.isTeamLead && (
        <div style={{ fontWeight: "bold" }}>Team Lead</div>
      )}
      {type === "employee" && !employee.isTeamLead && (
        <div style={{ fontWeight: "bold" }}>Employee</div>
      )}
      <div>Name: {employee.name}</div>
      <div>ID: {employee.id}</div>
      <div>Phone: {employee.phone}</div>
      <div>Email: {employee.email}</div>
      <span>
        <EditButton employee={employee} setEmployee={setEmployee} type={type} />
      </span>
      <span onClick={deleteItem}>
        <DeleteButton />
      </span>
      {type === "employee" && !employee.isTeamLead && (
        <span onClick={promoteEmployee}>
          <Promote />
        </span>
      )}
      {type === "employee" && (
        <ChangeTeam
          employee={employee}
          teams={teams}
          setEmployee={setEmployee}
        />
      )}
    </div>
  );
}

export default Employee;
