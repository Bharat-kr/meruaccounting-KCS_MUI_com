/* eslint-disable consistent-return */
import React, { useContext, useRef, useEffect, useState } from "react";
import {
  Paper,
  Autocomplete,
  Typography,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { capitalize } from "../../_helpers/Capitailze";
import { lowerCase } from "src/_helpers/LowerCase";
import TaskMain from "./TaskMain";

// apis and contexts
import { getTaskDetails, getTasks } from "src/api/task api/tasks.js";
import { TasksContext } from "src/contexts/tasksContext";

//----------------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {},
  treeItem: {
    margin: "0",
    fontWeight: "700",
    lineHeight: "1.5555555555555556",
    fontSize: "1.0625=rem",
    fontFamily: "Public Sans,sans-serif",
    textAlign: "left",
    width: "100%",
    display: "block",
  },
}));

export default function TaskSidebar() {
  const classes = useStyles();
  const [newClientValue, setnewClientValue] = useState();
  const [newClientError, setnewClientError] = useState(false);
  const [loaderAddClient, setLoaderAddClient] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const inputRef = useRef("");
  const autocomRef = useRef("");
  const sidebarref = useRef("");
  const clientref = useRef("");
  const { enqueueSnackbar } = useSnackbar();

  const { tasks, dispatchGetTask, taskDetails, dispatchGetTaskDetails } =
    useContext(TasksContext);

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  return (
    <Box
      component="div"
      sx={{
        margin: "10px",
        // height: "70vh",
        flexGrow: "1",
        display: "flex",
        flexDirection: "row",
        scrollbar: "auto",
      }}
    >
      <Paper
        component="div"
        elevation={3}
        sx={{
          overflow: "hidden",
          height: "100%",
          width: "28.5%",
          display: "flex",
          flexDirection: "column",
          // position: "relative",
        }}
      >
        {/* search box */}
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Autocomplete
            disablePortal
            // onChange={(e) => handleSearch(e)}
            id="combo-box-demo"
            options={tasks.tasks.map((task) => {
              return task.name;
            })}
            sx={{ width: 300, m: 0.5 }}
            renderInput={(params) => (
              <TextField {...params} label="Search Tasks" />
            )}
          />
        </Box>

        {tasks.loader && (
          <Box
            sx={{
              display: "flex",
              flexGrow: "1",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* clients list flex container */}
        {!tasks.loader && (
          <Box
            ref={sidebarref}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              alignItems: "flex-start",
              overflowY: "auto",
            }}
          >
            <TreeView
              fullWidth
              // className={classes.root}
              sx={{
                height: 240,
                flexGrow: 1,
                // maxWidth: 400,
                overflowY: "auto",
                width: "100%",
              }}
              selected={selected}
              onNodeSelect={handleSelect}
            >
              <TreeItem
                ref={clientref}
                // onClick={handleClick}
                nodeId={"noTask"}
                className={classes.treeItem}
                label={
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}
                  >
                    No Task
                  </Typography>
                }
              ></TreeItem>
              {tasks.tasks?.map((task) => (
                <TreeItem
                  id={task._id}
                  // ref={clientref}
                  nodeId={task._id}
                  onClick={(e) => {
                    console.log(task._id);
                    getTaskDetails(dispatchGetTaskDetails, task);
                  }}
                  className={classes.treeItem}
                  label={
                    // <Typography className={classes.treeItem} variant="h6">
                    //   {client.name}
                    // </Typography>
                    <Typography
                      sx={{
                        color: "#637381",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                      }}
                      data-task={task.name}
                    >
                      {task.name}
                    </Typography>
                  }
                  // hello
                ></TreeItem>
              ))}
            </TreeView>
          </Box>
        )}

        {/* INPUT BOX, add validations, connect to context */}
        <Box
          sx={{
            boxSizing: "border-box",
            width: "95%",
            "& > :not(style)": { m: 1 },
          }}
        >
          <form
            // onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <TextField
              sx={{ width: "100%" }}
              inputRef={inputRef}
              onChange={(e) => setnewClientValue(e.target.value)}
              required
              label="Add new Task"
              error={newClientError}
            />
            <LoadingButton
              fullWidth
              type="submit"
              loading={loaderAddClient}
              loadingPosition="end"
              variant="contained"
              sx={{ mt: 1 }}
            >
              Add Task
            </LoadingButton>
          </form>
        </Box>
      </Paper>
      <TaskMain />
    </Box>
  );
}
