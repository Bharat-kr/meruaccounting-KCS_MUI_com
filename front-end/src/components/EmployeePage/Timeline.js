import React, { useEffect, useState } from "react";
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
    fontWeight: "bold",
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

const Timeline = ({ activities }) => {
  const classes = useStyles();
  const [workTimes, setWorkTimes] = useState();

  useEffect(() => {
    let arr = [];
    activities?.forEach((activity) => {
      let date_obj = new Date(Number(activity.startTime));
      const hrs = date_obj.getHours();
      const mins = date_obj.getMinutes();
      const seconds = date_obj.getSeconds();
      let end_date_obj = new Date(Number(activity.endTime));
      const end_hrs = end_date_obj.getHours();
      const end_mins = end_date_obj.getMinutes();
      const end_seconds = end_date_obj.getSeconds();
      if (hrs === end_hrs) {
        arr.push({
          hr: hrs,
          length:
            ((end_mins - mins) / 60 + (60 - seconds + end_seconds) / 3600) *
            100,
          startGap: (mins / 60 + seconds / 3600) * 100,
        });
      } else {
        arr.push({
          hr: hrs,
          length: ((60 - mins) / 60 + (60 - seconds) / 3600) * 100,
          startGap: (mins / 60 + seconds / 3600) * 100,
        });
        arr.push({
          hr: end_hrs,
          length: (end_mins / 60 + end_seconds / 3600) * 100,
          startGap: 0,
        });
      }
    });
    setWorkTimes(arr);
  }, [activities]);
  console.log(workTimes);

  const row = [];
  for (let i = 0; i < 24; i++) {
    row.push(
      <TableCell className={classes.cell} key={i}>
        {i !== 0 ? `${i < 12 ? `${i} AM` : `${i=== 12 ? 12 : i - 12} PM`}` : `${i + 12} AM`}
        {workTimes &&
          workTimes
            .filter((el) => el.hr === i)
            .map((el) => {
              return (
                <Box
                  sx={{
                    width: `${el.length}%`,
                    height: "100%",
                    backgroundColor: "primary.light",
                    opacity: "0.5",
                    position: "absolute",
                    bottom: "0",
                    left: `${el.startGap}%`,
                  }}
                ></Box>
              );
            })}
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
