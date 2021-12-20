import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  inner: {
    width: '100%',
    height: 'inherit',
    outline: '1px solid black',
    position: 'relative',
    textAlign: 'center',
    paddingTop: '5px',
    fontSize: '1rem',
    backgroundColor: 'red',
    borderRadius: '10%',
    '&:after': {
      outline: '1px solid black',
      content: '""',
      display: 'block',
      position: 'absolute',
      left: '0px',
      width: '10px',
      bottom: '0px',
      height: '5px',
      backgroundColor: 'black'
    }
  },
  calendarContainer: {
    padding: '10px',
    margin: 'auto',
    placeItems: 'center',
    display: 'grid',
    gridTemplateColumns: 'repeat(30,1fr)',
    width: '80%',
    height: '30px',
    gap: '2px'
  }
}));

const thisMonth = new Date();

// get no. of days.
function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
const days = getDaysInMonth(thisMonth.getMonth(), thisMonth.getFullYear());

export default function Timeline(props) {
  const classes = useStyles();
  // callback fn to make array of divs to pass.
  const renderCalendar = () => {
    const row = [];
    for (let i = 1; i <= days; i += i) {
      row.push(<div className={classes.inner}>{i}</div>);
    }
    return row;
  };
  return (
    <Paper elevation={3} className={classes.calendarContainer}>
      {renderCalendar()}
    </Paper>
  );
}
