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
import { getCommonData } from "src/api/auth api/commondata";
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
  open,
  act,
  handleClose,
  startTime,
  endTime,
  project,
}) => {
  const [projectSelected, setProjectSelected] = React.useState("");
  const [splitTime, setSplitTime] = React.useState("");
  const { commonData, dispatchCommonData } = useContext(CurrentUserContext);
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event) => {
    setProjectSelected(event.target.value);
  };
  const [splitModal, setSplitModal] = useState(false);
  const handleSplitOpen = () => {
    handleClose();
    setSplitModal(true);
  };
  const handleSplitClose = () => {
    setSplitModal(false);
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
              {commonData.commonData.user.projects.map((project) => {
                return <MenuItem value={project._id}>{project.name}</MenuItem>;
              })}
            </Select>
            <TextField
              disabled
              id="filled-disabled"
              label="Disabled"
              defaultValue="Activity Name"
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
              <Checkbox color="success" />
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
