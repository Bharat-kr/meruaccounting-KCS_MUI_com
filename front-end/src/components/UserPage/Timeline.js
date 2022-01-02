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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
    overflowX: "scroll",
  },
  cell: {
    width: "auto",
    fontSize: "12px",
    margin: "0",
    padding: "8px",
    paddingBottom: "15px",
    position: "relative",
    border: `1px solid #C4CDD5`,
    "&:first-child": {
      borderRadius: "5px 0 0 5px",
    },
    "&:last-child": {
      borderRadius: "0 5px 5px 0",
    },
  },
}));

const Timeline = () => {
  const classes = useStyles();
  const row = [];
  for (let i = 0; i < 24; i++) {
    row.push(
      <TableCell className={classes.cell}>
        {i !== 0 ? `${i < 12 ? `${i} AM` : `${i - 12} PM`}` : `${i + 12} AM`}
        <Box
          sx={{
            width: "50%",
            height: "30%",
            backgroundColor: "primary.main",
            position: "absolute",
            bottom: "0",
            left: "0",
          }}
        ></Box>
      </TableCell>
    );
  }
  return (
    <TableContainer className={classes.container} elevation={1}>
      {row.map((e) => {
        return e;
      })}
    </TableContainer>
  );
};

export default Timeline;
