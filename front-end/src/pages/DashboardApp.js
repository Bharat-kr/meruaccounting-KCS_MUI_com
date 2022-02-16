import { useContext, useEffect, useMemo, useState } from "react";

// material
import { Grid, Container } from "@mui/material";

// contexts
import { loginContext } from "../contexts/LoginContext";

// components
import Page from "../components/Page";
import { SimpleContainer } from "../components/_dashboard/app";
import EmployeeContainer from "../components/_dashboard/employee/EmployeeContainer";
import PageHeader from "../components/PageHeader";
import { Role } from "../_helpers/role";
import { teamContext } from "src/contexts/TeamsContext";
import { getFullName } from "src/_helpers/getFullName";
import { getTeam } from "../api/teams api/teams";

import { employeesTimeDetails } from "../api/employee api/employee";
import { employeeContext } from "src/contexts/EmployeeContext";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import AdminContainer from "src/components/_dashboard/admin/admincontainer";
import { getAllEmployee } from "../api/admin api/admin";

import ProjectLeaderContainer from "src/components/_dashboard/projectLeader/plcontainer";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { loginC } = useContext(loginContext);
  const { dispatchgetTeam, getTeams } = useContext(teamContext);
  const { commonData } = useContext(CurrentUserContext);
  const [teamsList, setTeamsList] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const {
    employeesData,
    employeeTimeData,
    adminAllEmployee,
    dispatchAdminAllEmployee,
  } = useContext(employeeContext);

  // console.log(teamsList);
  // console.log(allEmployees);
  return (
    <Page title="Screen Monitor | Meru Accounting">
      <Container maxWidth="lg">
        <PageHeader title="Dashboard" />

        <Grid container spacing={2}>
          {Role.indexOf(loginC.userData.role) <= 1 ? (
            <AdminContainer sx={{ width: "100%" }} />
          ) : Role.indexOf(loginC.userData.role) === 2 ? (
            <SimpleContainer sx={{ width: "100%" }} />
          ) : Role.indexOf(loginC.userData.role) === 3 ? (
            <ProjectLeaderContainer />
          ) : (
            <EmployeeContainer sx={{ width: "100%" }} />
          )}
        </Grid>
      </Container>
    </Page>
  );
}
