// import React from 'react';
// import { Paper, Grid } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   inner: {
//     width: '100%',
//     height: '30px',
//     outline: '1px solid black',
//     position: 'relative',
//     textAlign: 'center',
//     fontSize: '1rem',
//     // backgroundColor: '#f0f0f0',
//     borderRadius: '10%',
//     '&:after': {
//       outline: '1px solid black',
//       content: '""',
//       display: 'block',
//       position: 'absolute',
//       left: '0px',
//       width: '10px',
//       bottom: '0px',
//       height: '5px',
//       backgroundColor: 'black'
//     },
//     '&:hover': {
//       backgroundColor: '#fff',
//       cursor: 'pointer',
//       marginBottom: '5px'
//     }
//   },
//   calendarContainer: {
//     padding: '0 2% 0 2%',
//     margin: 'auto',
//     placeItems: 'center',
//     display: 'grid',
//     gridTemplateColumns: `repeat(${days},1fr)`,
//     width: '85%',
//     height: '50px',
//     gap: '2px'
//   }
// }));

// const thisMonth = new Date();

// // get no. of days.
// function getDaysInMonth(month, year) {
//   return new Date(year, month, 0).getDate();
// }
// let days = getDaysInMonth(thisMonth.getMonth(), thisMonth.getFullYear());
// // console.log(days);

// export default function Timeline(props) {
//   const classes = useStyles();

//   // callback fn to make array of divs to pass.
//   const renderCalendar = () => {
//     const row = [];
//     // eslint-disable-next-line no-plusplus
//     for (let i = 1; i <= days; i++) {
//       row.push(<div className={classes.inner}>{i}</div>);
//     }
//     return row;
//   };

//   return (
//     <>
//       <Paper elevation={3} className={classes.calendarContainer}>
//         {renderCalendar()}
//       </Paper>
//     </>
//   );
// }
import React from "react";
import { makeStyles } from "@mui/styles";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import { Paper } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
    overflowX: "auto",
  },
  cell: {
    width: "auto",
    fontSize: "12px",
    margin: "0",
    padding: "8px",
    textAlign:"center",
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
            right: "0",
          }}
        ></Box>
      </TableCell>
    );
  }
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <TableContainer className={classes.container} elevation={1}>
        {row.map((e) => {
          return e;
        })}
      </TableContainer>
    </Box>
  );
};

export default Timeline;
