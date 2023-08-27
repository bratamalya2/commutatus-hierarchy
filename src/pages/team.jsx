import { useState, useEffect, Fragment } from "react";
import { useSearchParams } from "react-router-dom";

import "../styles/department.css";

function Team({ teams, employees }) {
  const [availableTeam, setAvailableTeam] = useState({});
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [searchParam] = useSearchParams();

  const teamName = searchParam.get("name");

  useEffect(() => {
    setAvailableTeam(teams.filter((team) => team.name === teamName)[0]);
    setAvailableEmployees(
      employees?.filter((emp) => emp.teamName.name === teamName)
    );
  }, [teamName, teams, employees]);

  return (
    <Fragment>
      <div className="dept-head">
        <div>
          Team Name:{" "}
          <span style={{ fontWeight: "bold" }}>{availableTeam.name}</span>
        </div>
      </div>
      <div className="employees-container">
        {availableEmployees?.map((emp, i) => (
          <div key={i}>
            <div style={{ fontWeight: "bold" }}>
              {emp.isTeamLead ? "Team Lead" : "Employee"}
            </div>
            <div>Name: {emp.name}</div>
            <div>ID: {emp.id}</div>
            <div>Phone: {emp.phone}</div>
            <div>Email: {emp.email}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Team;
