import { useState, useEffect, Fragment } from "react";
import { useSearchParams } from "react-router-dom";

import "../styles/department.css";

function Department({ departmentHeads, employees }) {
  const [availableDepartmentHead, setAvailableDepartmentHead] = useState({});
  const [availableEmployees, setAvailableEmployees] = useState([]);

  const [searchParam] = useSearchParams();

  const deptHeadId = searchParam.get("id");

  useEffect(() => {
    setAvailableDepartmentHead(
      departmentHeads.filter((dHead) => dHead.id === deptHeadId)[0]
    );
    setAvailableEmployees(
      employees?.filter((emp) => emp.teamName.deptHead.id === deptHeadId)
    );
  }, [deptHeadId, departmentHeads, employees]);

  if (!availableDepartmentHead) return null;

  return (
    <Fragment>
      <div className="dept-head">
        <div style={{ fontWeight: "bold" }}>
          Head of {availableDepartmentHead.department}
        </div>
        <div>Name: {availableDepartmentHead.name}</div>
        <div>ID: {availableDepartmentHead.id}</div>
        <div>Phone: {availableDepartmentHead.phone}</div>
        <div>Email: {availableDepartmentHead.email}</div>
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

export default Department;
