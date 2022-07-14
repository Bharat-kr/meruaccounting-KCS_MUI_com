import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Autocomplete,
  IconButton,
  Paper,
  Link,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { TasksContext } from "src/contexts/tasksContext";
import dayjs from "dayjs";
import { Container } from "react-bootstrap";
import { getFullName } from "src/_helpers/getFullName";
import { getTaskDetails, getTasks } from "src/api/task api/tasks";
import axios from "axios";
import Confirmation from "../Confirmation";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#000",
    width: "50%",
    maxWidth: "fit-content",
    height: "30px",
    fontSize: "30px",
    fontWeight: "bold",
    border: "none",
    background: "#fff",
    transition: "width 0.4s ease-in-out",
    "& :focus": { width: "100%" },
  },
}));
export default function TaskMain(props) {
  const { ...others } = props;
  const { tasks, taskDetails, dispatchGetTask, dispatchGetTaskDetails } =
    useContext(TasksContext);

  // to focus edit name of client
  const [taskName, setTaskName] = useState(taskDetails?.taskDetails?.name);
  const [ConfirmModal, setConfirmModal] = useState(false);
  const outerref = useRef();
  const inputRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const handleEditClick = (e) => {
    inputRef.current.focus();
  };

  const classes = useStyles();

  useEffect(() => {
    setTaskName(taskDetails.taskDetails.name);
  }, [taskDetails]);

  const handleChange = (e, value) => {
    console.log(value);
    if (value) {
      const id = value._id;
      document.getElementById(id).scrollIntoView();
    }
  };

  const Labelconfig = function () {
    return (
      <>
        {taskDetails.taskDetails.allEmployees.map((employee) => (
          <FormControlLabel
            id={`${employee._id}`}
            sx={{ display: "block", pt: 1, fontWeight: 10 }}
            onChange={async () => {
              await axios
                .patch(`/task/editEmployees`, {
                  _id: taskDetails.taskDetails._id,
                  employeeId: employee._id,
                })
                .then((res) => {
                  enqueueSnackbar(res.data.msg, {
                    variant: "success",
                  });
                  getTaskDetails(dispatchGetTaskDetails, {
                    _id: taskDetails.taskDetails._id,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  enqueueSnackbar(err.message, {
                    variant: "info",
                  });
                });
            }}
            control={
              <Switch
                defaultChecked={taskDetails.taskDetails.employees.includes(
                  employee._id
                )}
              />
            }
            label={`${getFullName(employee.firstName, employee.lastName)}`}
          />
        ))}
      </>
    );
  };

  return taskDetails.loader ? (
    <Box
      component="div"
      sx={{
        width: "70%",
        flexGrow: "1",
        overflowX: "hidden",
        overflowY: "auto",
        // margin: "10px 10px 10px 10px",
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
          // ml: 2,
          overflow: "visible",
          height: "100%",
        }}
      >
        <Box
          component="img"
          src="/svgs/client.svg"
          sx={{ width: 100, height: 70, backgroundColor: "white" }}
        />
        <Typography variant="h5">No Task Selected</Typography>
      </Paper>
    </Box>
  ) : (
    <>
      {/* grid container 40 60 */}
      <Box
        ref={outerref}
        component="div"
        sx={{
          width: "70%",
          flexGrow: "1",
          overflowX: "hidden",
          overflowY: "auto",
          m: 1,
        }}
      >
        <Paper
          component="div"
          elevation={3}
          sx={{
            zIndex: 1,
            p: 1,
            position: "relative",
          }}
        >
          <Box sx={{ m: 1 }}>
            <h1 style={{ backgroundColor: "#fff" }}>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await axios
                    .patch("/task/editName", {
                      _id: taskDetails.taskDetails._id,
                      name: taskName,
                    })
                    .then((res) => {
                      enqueueSnackbar(res.data.msg, {
                        variant: "success",
                      });
                      getTasks(dispatchGetTask);
                      getTaskDetails(dispatchGetTaskDetails, {
                        _id: taskDetails.taskDetails._id,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      enqueueSnackbar(err.message, {
                        variant: "info",
                      });
                    });
                }}
                style={{ display: "inline" }}
              >
                <input
                  ref={inputRef}
                  onChange={(e) => setTaskName(e.target.value)}
                  type="text"
                  className={classes.input}
                  value={taskName}
                />
              </form>
              <div
                style={{
                  float: "right",
                }}
              >
                <IconButton>
                  <EditIcon onClick={handleEditClick} />
                </IconButton>
                <IconButton>
                  <DeleteIcon
                    onClick={() => {
                      setConfirmModal(true);
                    }}
                  />
                </IconButton>
              </div>
            </h1>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // mb: 5,
                pb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  Created on :
                  {dayjs(taskDetails.taskDetails.createdAt).format("DD/MM/YY")}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  variant="body1"
                ></Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  Created By : {taskDetails.taskDetails.createdBy}
                </Typography>
                <Typography variant="body1"></Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{}}>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                m: 1,
              }}
            >
              <Box sx={{ pt: 2, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    overflow: "auto",
                  }}
                >
                  <Typography variant="h5">Employees</Typography>
                  <Autocomplete
                    id="combo-box-demo"
                    options={taskDetails.taskDetails.allEmployees}
                    getOptionLabel={(option) =>
                      getFullName(option.firstName, option.lastName)
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Employee" />
                    )}
                    onChange={handleChange}
                  />
                </Box>
                <Link
                  sx={{ pl: 1, color: "success.darker", cursor: "pointer" }}
                  onClick={async () => {
                    const res = await axios
                      .patch(`/task/editAllEmployees`, {
                        _id: taskDetails.taskDetails._id,
                        employeeIds: taskDetails.taskDetails.allEmployees,
                      })
                      .then((res) => {
                        enqueueSnackbar(res.data.msg, {
                          variant: "success",
                        });
                        getTaskDetails(dispatchGetTaskDetails, {
                          _id: taskDetails.taskDetails._id,
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        enqueueSnackbar(err.message, {
                          variant: "info",
                        });
                      });
                  }}
                >
                  Add all
                </Link>
                <Link
                  sx={{ pl: 1, color: "error.darker", cursor: "pointer" }}
                  onClick={async () => {
                    console.log();
                    const res = await axios
                      .patch(`/task/editAllEmployees`, {
                        _id: taskDetails.taskDetails._id,
                        employeeIds: false,
                      })
                      .then((res) => {
                        enqueueSnackbar(res.data.msg, {
                          variant: "success",
                        });
                        getTaskDetails(dispatchGetTaskDetails, {
                          _id: taskDetails.taskDetails._id,
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        enqueueSnackbar(err.message, {
                          variant: "info",
                        });
                      });
                  }}
                >
                  Remove all
                </Link>
                <Container sx={{ display: "block" }}>
                  <Labelconfig />
                </Container>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Confirmation
        open={ConfirmModal}
        handleClose={() => {
          setConfirmModal(false);
        }}
        onConfirm={async () => {
          await axios
            .delete("/task", {
              data: {
                _id: taskDetails.taskDetails._id,
              },
            })
            .then((res) => {
              enqueueSnackbar(res.data.msg, {
                variant: "success",
              });
              getTasks(dispatchGetTask);
            })
            .catch((err) => {
              console.log(err);
              enqueueSnackbar(err.message, {
                variant: "info",
              });
            });
        }}
        detail={{
          type: "Task",
          name: taskDetails?.taskDetails?.name,
        }}
      />
    </>
  );
}
