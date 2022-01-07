import React from "react";
import { makeStyles } from "@mui/styles";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import { Paper } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    border: `1px solid #919EAB`,
    alignItems: "center",
  },
  cell: {
    fontSize: "0.8rem",
    margin: "0",
    flexGrow: "1",
    padding: "0.6rem",
    textAlign: "center",
    paddingTop: "0.2rem",
    paddingBottom: "1rem",
    position: "relative",
    borderWidth: "0 1px 0 0",
    borderStyle: "solid",
    borderColor: "#919EAB",
    "&:first-child": {
      borderRadius: "5px 0 0 5px",
    },
    "&:last-child": {
      borderStyle: "none",
      borderRadius: "0 5px 5px 0",
    },
  },
}));

const Timeline = () => {
  const classes = useStyles();
  const row = [];
  for (let i = 0; i < 24; i++) {
    row.push(
      <TableCell className={classes.cell} key={i}>
        {i !== 0 ? `${i < 12 ? `${i} AM` : `${i - 12} PM`}` : `${i + 12} AM`}
        <Box
          sx={{
            width: `${i * 3}%`,
            height: "15px",
            backgroundColor: "primary.dark",
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
        ></Box>
      </TableCell>
    );
  }
  return (
    <Box sx={{ width: "100%", display: "flex", padding: "20px" }}>
      <TableContainer
        component={Paper}
        className={classes.container}
        elevation={3}
      >
        {row.map((e) => {
          return e;
        })}
      </TableContainer>
    </Box>
  );
};

export default Timeline;
