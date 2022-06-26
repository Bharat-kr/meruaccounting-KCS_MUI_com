import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Divider, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Main from "../components/Reports/Main";
import PageHeader from "../components/PageHeader";

export default function SimpleContainer() {
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
