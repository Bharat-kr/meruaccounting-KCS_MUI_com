import React, { useContext, useEffect } from "react";
import { CssBaseline, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

// components\
import PageHeader from "../components/PageHeader";
import TaskSidebar from "src/components/tasks/TaskSidebar";

// contexts and apis
import { getTasks } from "../api/task api/tasks.js";
import { TasksContext } from "../contexts/tasksContext";

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

export default function TaskAssignment() {
  const classes = useStyles();
  const { tasks, dispatchGetTask } = useContext(TasksContext);

  useEffect(() => {
    getTasks(dispatchGetTask);
  }, []);
  return (
    <Box
      component="div"
      sx={{
        width: "95%",
        margin: "auto",
        maxHeight: "70vh",
        height: "70vh",
      }}
    >
      <CssBaseline />
      <PageHeader title="Tasks" />
      <div className={classes.root}>
        <TaskSidebar />
      </div>
    </Box>
  );
}
