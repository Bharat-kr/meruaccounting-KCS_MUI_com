import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  inner: {
    width: '100%',
    height: '30px',
    outline: '1px solid black',
    position: 'relative',
    textAlign: 'center',
    fontSize: '1rem',
    // backgroundColor: '#f0f0f0',
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
    },
    '&:hover': {
      backgroundColor: '#fff',
      cursor: 'pointer',
      marginBottom: '5px'
    }
  },
  calendarContainer: {
    padding: '0 2% 0 2%',
    margin: 'auto',
    placeItems: 'center',
    display: 'grid',
    gridTemplateColumns: `repeat(${days},1fr)`,
    width: '85%',
    height: '50px',
    gap: '2px'
  }
}));

const thisMonth = new Date();

// get no. of days.
function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
let days = getDaysInMonth(thisMonth.getMonth(), thisMonth.getFullYear());
console.log(days);

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
    <>
      <Paper elevation={3} className={classes.calendarContainer}>
        {renderCalendar()}
      </Paper>
    </>
  );
}
