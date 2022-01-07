import React from "react";
import { CssBaseline, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components
import Header from "../components/Projects/Header";
import Sidebar from "../components/Projects/Sidebar";
import PageHeader from "../components/PageHeader";

// contexts
// eslint-disable-next-line import/no-named-as-default
import ClientsContextProvider from "../contexts/ClientsContext";

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

export default function Projects() {
  const classes = useStyles();
  return (
    <Box
      component="div"
      sx={{ width: "95%", margin: "auto", maxHeight: "70vh", height: "70vh" }}
    >
      <CssBaseline />
      <PageHeader title="Projects" />
      <div className={classes.root}>
        <Sidebar />
      </div>
    </Box>
  );
}
