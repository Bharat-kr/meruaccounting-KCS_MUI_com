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
import AdminContainer from "src/components/_dashboard/admin/admincontainer";

import ProjectLeaderContainer from "src/components/_dashboard/projectLeader/plcontainer";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { loginC } = useContext(loginContext);

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
