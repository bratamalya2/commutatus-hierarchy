import { Fragment } from "react";

import EmployeeTree from "../components/employeeTree";
import AddButton from "../components/addButton";
import SearchEmployee from "../components/searchEmployee";

function Home({
  ceo,
  departmentHeads,
  teams,
  employees,
  searchText,
  setSearchText,
  setCeo,
  deleteCeo,
  addNewDepartment,
  editDepartment,
  deleteDepartment,
  addNewTeam,
  editTeam,
  deleteTeam,
  addNewEmployee,
  editEmployee,
  deleteEmployee,
  promoteEmployee,
}) {
  return (
    <Fragment>
      <SearchEmployee searchText={searchText} setSearchText={setSearchText} />
      <EmployeeTree
        ceo={ceo}
        setCeo={setCeo}
        deleteCeo={deleteCeo}
        departmentHeads={departmentHeads}
        teams={teams}
        employees={employees}
        searchText={searchText}
        setDepartmentHeads={addNewDepartment}
        editDepartmentHeads={editDepartment}
        deleteDepartment={deleteDepartment}
        setTeams={addNewTeam}
        editTeams={editTeam}
        deleteTeam={deleteTeam}
        setEmployees={addNewEmployee}
        editEmployees={editEmployee}
        deleteEmployee={deleteEmployee}
        promoteEmployee={promoteEmployee}
      />
      {!ceo && (
        <AddButton
          hoverText="Add CEO"
          type="CEO"
          setCeo={setCeo}
          marginLeft="20px"
        />
      )}
    </Fragment>
  );
}

export default Home;
