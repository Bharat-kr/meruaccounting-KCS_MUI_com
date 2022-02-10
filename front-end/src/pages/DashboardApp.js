import { useContext, useEffect, useState } from "react";

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

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { loginC } = useContext(loginContext);
  const { dispatchgetTeam, getTeams } = useContext(teamContext);

  const [teamsList, setTeamsList] = useState([]);
  const { employeesData, employeeTimeData } = useContext(employeeContext);
  useEffect(() => {
    getTeam(dispatchgetTeam);
  }, []);

  // useState hook for rerender component
  useEffect(() => {
    const data = [];
    let test = -1;
    getTeams?.getTeam?.forEach((team) => {
      // eslint-disable-next-line prefer-template

      team.members?.map((member) => {
        if (
          !data.find((el) => {
            return el.id === member._id;
          })
        ) {
          data.push({
            Employee: getFullName(member.firstName, member.lastName),
            id: member._id,
          });
        }
      });
    });
    setTeamsList(data);
  }, [getTeams]);
  console.log(teamsList);
  return (
    <Page title="Screen Monitor | Meru Accounting">
      <Container maxWidth="lg">
        <PageHeader title="Dashboard" />

        <Grid container spacing={2}>
          {Role.indexOf(loginC.userData.role) === 2 ? (
            <SimpleContainer teamsList={teamsList} sx={{ width: "100%" }} />
          ) : (
            <EmployeeContainer sx={{ width: "100%" }} />
          )}
        </Grid>
      </Container>
    </Page>
  );
}
