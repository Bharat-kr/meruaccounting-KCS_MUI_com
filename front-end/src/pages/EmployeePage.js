import React, { useEffect, useState, useContext } from "react";
import { CssBaseline, Box } from "@mui/material";
import { useParams } from "react-router-dom";

// components
import Overview from "../components/EmployeePage/Overview";
import ScreenShots from "../components/EmployeePage/ScreenShots";
import PageHeader from "../components/PageHeader";

// contexts
// eslint-disable-next-line import/no-named-as-default
import CurrentUserContextProvider from "../contexts/CurrentUserContext";
import { employeeContext } from "../contexts/EmployeeContext";
import { LoginProvider } from "../contexts/LoginContext";

// apis
import { getEmployeeDetails } from "../api/employee api/employee";

export default function EmployeePage(props) {
  const { employee, dispatchEmployeeDetails } = useContext(employeeContext);
  const { id } = useParams();

  useEffect(() => {
    getEmployeeDetails(id, dispatchEmployeeDetails);
  }, []);

  console.log(employee);
  // extra currEmployee variable, of no use iguess.
  // const [currEmployee, setCurrEmployee] = useState({});
  // useEffect(() => {
  //   setCurrEmployee(employee);
  // }, [employee]);
  // console.log(currEmployee);
  return (
    <CssBaseline>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <LoginProvider>
          <CurrentUserContextProvider>
            <PageHeader
              title={!employee.loader ? employee.employee.data._id : "Employee"}
            />

            <Overview employee={employee} />
            <ScreenShots employee={employee} />
          </CurrentUserContextProvider>
        </LoginProvider>
      </Box>
    </CssBaseline>
  );
}
