import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import timeC from "src/_helpers/timeConverter";
import timeDiff from "src/_helpers/timeDifference";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import { deleteAct, getCommonData } from "src/api/auth api/commondata";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  borderRadius: 2,
  border: "none",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  "@media (max-width: 600px)": {
    maxWidth: "80%",
  },
};

const SplitActivity = ({
  date,
  open,
  act,
  handleClose,
  startTime,
  endTime,
  project,
}) => {
  const [projectSelected, setProjectSelected] = React.useState("");
  const [splitTime, setSplitTime] = React.useState("");
  const [projects, setProjects] = React.useState([]);
  const [newStartTime, setNewStartTime] = React.useState("");
  const [newEndTime, setNewEndTime] = React.useState("");
  const [newTask, setNewTask] = React.useState("");
  const [deleteActivity, setDeleteActivity] = React.useState(false);
  const { commonData, dispatchCommonData } = useContext(CurrentUserContext);
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event) => {
    setProjectSelected(event.target.value);
  };
  const [splitModal, setSplitModal] = useState(false);

  //get projects
  useEffect(() => {
    axios
      .get("/project", { employeeId: commonData.commonData.user._id })
      .then((res) => {
        setProjects(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
    setNewStartTime(startTime);
    setNewEndTime(endTime);
  }, []);

  const handleSplitOpen = () => {
    handleClose();
    setSplitModal(true);
  };
  const handleSplitClose = () => {
    setSplitModal(false);
  };
  //change start time
  const handleStartChange = (e) => {
    setNewStartTime(e.target.value);
  };

  //change end time
  const handleEndChange = (e) => {
    setNewEndTime(e.target.value);
  };

  //change task change
  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  //api for splitting activity
  const handleSplit = async () => {
    let date_obj = new Date(new Number(startTime));
    let dateValues = splitTime.split(":");
    let hrs = dateValues[0];
    let mins = dateValues[1];
    let splitValue = `${new Date(
      date_obj.getFullYear(),
      date_obj.getMonth(),
      date_obj.getDate(),
      hrs,
      mins,
      0,
      0
    ).getTime()}`;
    let data = {
      activityId: act._id,
      clientId: act.client,
      projectId: project._id,
      task: act.task,
      splitTime: splitValue,
      performanceData: act.performanceData,
      isInternal: act.isInternal,
    };
    // console.log(data, startTime);
    await axios
      .post("/activity/splitActivity", data)
      .then((res) => {
        if (res.status === 200) {
          getCommonData(dispatchCommonData);
          enqueueSnackbar("Activity Splited", { variant: "success" });
        }
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
    handleSplitClose();
  };

  //handling splittime change
  const handleSplitChange = (e) => {
    setSplitTime(e.target.value);
  };

  //Edit time
  const handleEdit = async () => {
    let date_obj = new Date(new Number(startTime));
    let year = date_obj.getFullYear();
    let month = date_obj.getMonth();
    let day = date_obj.getDate();
    let dateValues = newStartTime.split(":");
    let dateValues2 = newEndTime.split(":");
    let hrs = dateValues[0];
    let mins = dateValues[1];
    let endhrs = dateValues2[0];
    let endmins = dateValues2[1];
    let startValue = `${new Date(year, month, day, hrs, mins, 0, 0).getTime()}`;
    let endValue = `${new Date(
      year,
      month,
      day,
      endhrs,
      endmins,
      0,
      0
    ).getTime()}`;
    let consumeTime = (startValue, endValue, startTime, endTime) => {
      if (startValue !== "NaN" && endValue !== "NaN") {
        return endValue - startValue;
      } else if (startValue !== "NaN") {
        return endTime - startValue;
      } else if (endValue !== "NaN") {
        return endValue - startTime;
      } else {
        return endTime - startTime;
      }
    };
    let data = {
      activityId: act._id,
      clientId: projectSelected.split("-")[1],
      projectId: projectSelected.split("-")[0],
      task: newTask ? newTask : act.task,
      performanceData: act.performanceData,
      startTime: startValue !== "NaN" ? startValue : startTime,
      endTime: endValue !== "NaN" ? endValue : endTime,
      consumeTime: consumeTime(startValue, endValue, startTime, endTime) / 1000,
      isInternal: act.isInternal,
    };
    console.log(data);

    if (deleteActivity) {
      await deleteAct(act._id, date, dispatchCommonData);
      enqueueSnackbar("Deleted Activity", {
        variant: "success",
      });
      await getCommonData(dispatchCommonData);
    } else {
      await axios
        .patch(`/activity/${act._id}`, data)
        .then((res) => {
          console.log(res);
          enqueueSnackbar("Time Edited", {
            variant: "success",
          });
        })
        .catch((err) => {
          enqueueSnackbar("Error occured", {
            variant: "error",
          });
          console.log(err);
        });
      await getCommonData(dispatchCommonData);
    }
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: "none",
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "primary.lighter",
              p: 2,
            }}
          >
            <Typography variant="h4" color="primary">
              Edit Time
            </Typography>
            <IconButton>
              <CloseIcon onClick={handleClose} />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              px: 2,
              py: 1,
            }}
          >
            You can trim activity time, or edit activity note.
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
              }}
            >
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={timeC(startTime)}
                variant="filled"
                onChange={handleStartChange}
                size="small"
                sx={{
                  width: "20%",
                }}
              />
              -
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={timeC(endTime)}
                onChange={handleEndChange}
                variant="filled"
                size="small"
                sx={{
                  width: "20%",
                }}
              />
              --{timeDiff(startTime, endTime)}
            </Box>
            <Select
              value={projectSelected}
              onChange={handleChange}
              displayEmpty
              fullWidth
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                my: 1,
              }}
            >
              {projects.map((project) => {
                return (
                  <MenuItem value={project._id + "-" + project?.client?._id}>
                    {project.name}-{project?.client?.name}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              id="filled-disabled"
              label="Task Name"
              default={act.task}
              onChange={handleTaskChange}
              variant="filled"
              size="large"
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <span>
              <Checkbox
                color="success"
                onChange={(e) => setDeleteActivity(e.target.checked)}
              />
              Delete this Activity
            </span>
            <span
              style={{
                textDecoration: "underline",
                color: "#229A16",
                cursor: "pointer",
              }}
              onClick={handleSplitOpen}
            >
              Split Activity
            </span>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              bgcolor: "grey.200",
              p: 2,
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                mr: 2,
              }}
              onClick={handleEdit}
            >
              Save Changes
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* split time modal */}
      <Modal
        open={splitModal}
        onClose={handleSplitClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: "none",
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "primary.lighter",
              p: 2,
            }}
          >
            <Typography variant="h4" color="primary">
              Split Time
            </Typography>
            <IconButton>
              <CloseIcon onClick={handleSplitClose} />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
              }}
            >
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={timeC(startTime)}
                variant="filled"
                disabled
                size="small"
                sx={{
                  width: "20%",
                }}
              />
              -
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                placeholder="Split at"
                variant="filled"
                size="small"
                onChange={handleSplitChange}
                sx={{
                  width: "20%",
                }}
              />
              -
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={timeC(endTime)}
                disabled
                variant="filled"
                size="small"
                sx={{
                  width: "20%",
                }}
              />
              --{timeDiff(startTime, endTime)}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              bgcolor: "grey.200",
              p: 2,
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                mr: 2,
              }}
              onClick={handleSplit}
            >
              Split Activity
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSplitClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SplitActivity;
