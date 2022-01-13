import React from "react";
import { Paper, Box, Typography } from "@mui/material";

export default function NotSelected() {
  return (
    <Box
      component="div"
      sx={{
        width: "70%",
        flexGrow: "1",
        overflowX: "hidden",
        overflowY: "auto",
        margin: "10px 10px 10px 0",
      }}
    >
      <Paper
        component="div"
        elevation={3}
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          ml: 1,
          overflow: "visible",
          height: "100%",
        }}
      >
        <Box
          component="img"
          src="/svgs/project.svg"
          sx={{ width: 100, height: 70, backgroundColor: "white" }}
        />
        <Typography variant="h5">No Projects Selected</Typography>
      </Paper>
    </Box>
  );
}
