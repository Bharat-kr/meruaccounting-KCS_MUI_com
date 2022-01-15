import React, { useEffect, useState, useContext } from "react";
import { CssBaseline, Box } from "@mui/material";
import { useParams } from "react-router-dom";

// components
import Overview from "../components/EmployeePage/Overview";
import ScreenShots from "../components/EmployeePage/ScreenShots";
import PageHeader from "../components/PageHeader";
import Timeline from "../components/EmployeePage/Timeline";

// contexts
// eslint-disable-next-line import/no-named-as-default
import CurrentUserContextProvider from "../contexts/CurrentUserContext";
import { employeeContext } from "../contexts/EmployeeContext";
import { LoginProvider } from "../contexts/LoginContext";

// apis
import { getEmployeeDetails } from "../api/employee api/employee";
import Calendar from "src/components/UserPage/Calendar";

export default function EmployeePage(props) {
  const { employee, dispatchEmployeeDetails } = useContext(employeeContext);
  const { id } = useParams();

  useEffect(() => {
    getEmployeeDetails(id, dispatchEmployeeDetails);
  }, []);

  console.log(employee);

  return (
    <CssBaseline>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <PageHeader
          title={!employee.loader ? employee?.employee?.data?._id : "Employee"}
        />
        <Calendar />
        {/* <Overview /> */}
        <Overview employee={employee} />
        <Timeline />
        <ScreenShots employee={employee} />
      </Box>
    </CssBaseline>
  );
}
