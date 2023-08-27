import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Home from "./pages/home";
import Department from "./pages/department";
import Team from "./pages/team";
import addNewField from "./utils/addNewField";
import deleteField from "./utils/deleteField";
import editField from "./utils/editField";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d50000",
    },
    secondary: {
      main: "#212121",
    },
    tertiary: {
      main: "#303f9f",
    },
    white: {
      main: "#ffffff",
    },
  },
});

function App() {
  const [ceo, setCeo] = useState(JSON.parse(localStorage.getItem("ceo")));
  const [departmentHeads, setDepartmentHeads] = useState(
    JSON.parse(localStorage.getItem("departmentHeads"))
  );
  const [teams, setTeams] = useState(JSON.parse(localStorage.getItem("teams")));
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees"))
  );
  const [searchText, setSearchText] = useState("");

  const addNewDepartment = (deptHead) => {
    addNewField(deptHead, departmentHeads, setDepartmentHeads);
  };

  const addNewTeam = (team) => {
    if (teams && teams.filter((t) => t.name === team.name).length > 0)
      return false;
    addNewField(team, teams, setTeams);
    return true;
  };

  const addNewEmployee = (employee) => {
    addNewField(employee, employees, setEmployees);
  };

  const deleteCeo = () => {
    if (!ceo) return;
    else setCeo(null);
  };

  const deleteDepartment = (deptHead) => {
    deleteField(deptHead, departmentHeads, setDepartmentHeads);
  };

  const deleteTeam = (team) => {
    deleteField(team, teams, setTeams);
  };

  const deleteEmployee = (employee) => {
    deleteField(employee, employees, setEmployees);
  };

  const editDepartment = (deptHead) => {
    editField(deptHead, "deptHead", setDepartmentHeads, setTeams);
  };

  const editTeam = (team) => {
    if (teams.filter((t) => t.name === team.name).length > 0) return false;
    editField(team, "teamName", setTeams, setEmployees);
    return true;
  };

  const editEmployee = (employee) => {
    editField(employee, null, setEmployees, null);
  };

  const promoteEmployee = (employee) => {
    setEmployees((curr) => {
      return curr.map((emp) => {
        if (JSON.stringify(employee) !== JSON.stringify(emp)) return emp;
        else
          return {
            ...emp,
            isTeamLead: true,
          };
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("ceo", JSON.stringify(ceo));
  }, [ceo]);

  useEffect(() => {
    localStorage.setItem("departmentHeads", JSON.stringify(departmentHeads));
  }, [departmentHeads]);

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                ceo={ceo}
                setCeo={setCeo}
                deleteCeo={deleteCeo}
                departmentHeads={departmentHeads}
                teams={teams}
                employees={employees}
                searchText={searchText}
                setSearchText={setSearchText}
                addNewDepartment={addNewDepartment}
                editDepartment={editDepartment}
                deleteDepartment={deleteDepartment}
                addNewTeam={addNewTeam}
                editTeam={editTeam}
                deleteTeam={deleteTeam}
                addNewEmployee={addNewEmployee}
                editEmployee={editEmployee}
                deleteEmployee={deleteEmployee}
                promoteEmployee={promoteEmployee}
              />
            }
            exact
          />
          <Route
            path="/department"
            element={
              <Department
                departmentHeads={departmentHeads}
                employees={employees}
              />
            }
          />
          <Route
            path="/team"
            element={<Team teams={teams} employees={employees} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
