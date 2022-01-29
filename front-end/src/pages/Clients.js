import React from "react";
import { CssBaseline, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components
import Sidebar from "../components/Clients/Sidebar";
import PageHeader from "../components/PageHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "70vh",
    height: "70vh",
    width: "100%",
    margin: "auto",
    display: "flex",
    gridTemplateColumns: "30% 70%",
    justifyContent: "space-around",
    backgroundColor: "#fdfdff",
  },
}));
// lg: '70%', md: '90%'

export default function Clients() {
  const classes = useStyles();
  return (
    <Box
      component="div"
      sx={{ width: "95%", margin: "auto", maxHeight: "70vh", height: "70vh" }}
    >
      <CssBaseline />
      <PageHeader title="Clients" />

      <div className={classes.root}>
        <Sidebar />
      </div>
    </Box>
  );
}
