import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Activity from "./Activity";
import IntExt from "./IntExt";

const useStyles = makeStyles((theme) => ({}));

export default function ScreenShots(props) {
  const classes = useStyles();

  return (
    <Box component="div" sx={{}}>
      <IntExt></IntExt>
      {/* map the time ranges from user data for the particular date */}
      <Activity />
      <hr />
      <Activity />
      <hr />
      <Activity />
      <hr />
    </Box>
  );
}
