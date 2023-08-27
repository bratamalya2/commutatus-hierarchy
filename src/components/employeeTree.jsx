import { Fragment, useState, useEffect } from "react";

import Employee from "./employee";
import AddButton from "./addButton";

import "../styles/employeeTree.css";

function EmployeeTree({
  ceo,
  setCeo,
  deleteCeo,
  departmentHeads,
  teams,
  employees,
  searchText,
  setDepartmentHeads,
  editDepartmentHeads,
  deleteDepartment,
  setTeams,
  editTeams,
  deleteTeam,
  setEmployees,
  editEmployees,
  deleteEmployee,
  promoteEmployee,
}) {
  const [availableEmployees, setAvailableEmployeees] = useState([]);

  let isError = false;
  let errorTitle = null;

  useEffect(() => {
    if (searchText.length > 0)
      setAvailableEmployeees(
        employees.filter(
          (emp) =>
            emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
            emp.phone.includes(searchText) ||
            emp.email.toLowerCase().includes(searchText.toLowerCase())
        )
      );
  }, [searchText, employees]);

  if (!ceo) return null;

  if (searchText.length === 0)
    return (
      <div className="employee-tree-container">
        <Employee
          employee={ceo}
          setEmployee={setCeo}
          type="ceo"
          deleteItem={deleteCeo}
        />
        {departmentHeads?.map((deptHead, i) => {
          const currTeams = teams?.filter(
            (team) =>
              JSON.stringify(team?.deptHead) === JSON.stringify(deptHead)
          );
          return (
            <Fragment key={i}>
              <Employee
                employee={deptHead}
                setEmployee={editDepartmentHeads}
                type="departmentHead"
                deleteItem={() => deleteDepartment(deptHead)}
              />
              {currTeams?.map((team, i) => {
                const currEmployees = employees?.filter(
                  (employee) => employee?.teamName?.name === team?.name
                );
                if (
                  !currEmployees ||
                  currEmployees?.filter(
                    (employee) => employee.isTeamLead === true
                  ).length === 0
                ) {
                  isError = true;
                  errorTitle = "Please add a team lead";
                } else if (
                  !currEmployees ||
                  currEmployees?.filter(
                    (employee) => employee.isTeamLead === false
                  ).length === 0
                ) {
                  isError = true;
                  errorTitle = "Please add a team member other than team lead";
                }
                return (
                  <Fragment key={i}>
                    <div style={{ marginBottom: "20px", position: "relative" }}>
                      <Employee
                        employee={team}
                        setEmployee={editTeams}
                        type="team"
                        isError={isError}
                        errorTitle={errorTitle}
                        deleteItem={() => deleteTeam(team)}
                      />
                      {currEmployees?.map((employee, i) => (
                        <Fragment key={i}>
                          <Employee
                            employee={employee}
                            teams={teams}
                            setEmployee={editEmployees}
                            type="employee"
                            deleteItem={() => deleteEmployee(employee)}
                            promoteEmployee={() => promoteEmployee(employee)}
                          />
                        </Fragment>
                      ))}
                    </div>
                    <AddButton
                      hoverText="Add New Employee"
                      type="Employee"
                      team={team}
                      setEmployees={setEmployees}
                      marginLeft="80px"
                    />
                  </Fragment>
                );
              })}
              <AddButton
                hoverText="Add New Team"
                type="Team"
                deptHead={deptHead}
                setTeams={setTeams}
                marginLeft="60px"
              />
            </Fragment>
          );
        })}
        <AddButton
          hoverText="Add New Department Head"
          type="Department"
          setDepartmentHeads={setDepartmentHeads}
          marginLeft="40px"
        />
      </div>
    );
  else {
    return availableEmployees?.map((emp, i) => {
      return (
        <Employee
          key={i}
          employee={emp}
          teams={teams}
          setEmployee={editEmployees}
          type="employee"
          deleteItem={() => deleteEmployee(emp)}
          promoteEmployee={() => promoteEmployee(emp)}
        />
      );
    });
  }
}

export default EmployeeTree;
