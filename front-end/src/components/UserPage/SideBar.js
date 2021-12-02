import React from 'react';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: '10rem',
    gridTemplateColumns: '1fr 1fr',
    gap: '1%',
    width: '90%',
    height: '80%',
    margin: 'auto',
    marginTop: '3%'
  }
}));

export default function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>Weekly, daily and monthly hours</Paper>
      <Paper>Projects list with time spent</Paper>
    </div>
  );
}
