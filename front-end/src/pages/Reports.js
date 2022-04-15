import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Divider, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Main from "../components/Reports/Main";
import PageHeader from "../components/PageHeader";
//contexts and apis
import { teamContext } from "../contexts/TeamsContext";
import { ClientsContext } from "../contexts/ClientsContext";
import { getTeam } from "../api/teams api/teams";
import { getClient } from "../api/clients api/clients";

export default function SimpleContainer() {
  const { dispatchgetTeam } = React.useContext(teamContext);
  const { clientDetails, dispatchClientDetails } =
    React.useContext(ClientsContext);

  // React.useEffect(() => {
  //   getTeam(dispatchgetTeam);
  // }, []);

  // React.useEffect(() => {
  //   getClient(dispatchClientDetails);
  // }, []);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="100%">
        {" "}
        <PageHeader title="Reports" />
        <Paper elevation="3" sx={{ height: "100%", width: "100%" }}>
          <Grid item xs={3} sm={6} md={12}>
            <Container />
            <Divider />
            <Divider />
          </Grid>
          <Main />
        </Paper>
      </Container>
    </>
  );
}
