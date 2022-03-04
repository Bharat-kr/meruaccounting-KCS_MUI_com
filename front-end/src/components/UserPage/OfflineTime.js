import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import timeDiff from "src/_helpers/timeDifference";
import axios from "axios";

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

const OfflineTime = ({ date }) => {
  const [projectSelected, setProjectSelected] = React.useState("");
  const [clientSelected, setClientSelected] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [internal, setInternal] = React.useState(true);
  const [modal, setModal] = useState(false);
  const { commonData } = useContext(CurrentUserContext);

  //open modal
  const handleOpen = () => {
    setModal(true);
  };

  //close modal
  const handleClose = () => {
    setModal(false);
  };

  //change client
  const handleClientChange = (event) => {
    setClientSelected(event.target.value);
  };

  //change project
  const handleChange = (event) => {
    setProjectSelected(event.target.value);
  };

  //change start time
  const handleStartChange = (e) => {
    setStartTime(e.target.value);
  };

  //change end time
  const handleEndChange = (e) => {
    setEndTime(e.target.value);
  };

  //caling api
  const addTime = async (e) => {
    e.preventDefault();
    let year = date.format("YYYY");
    let month = date.format("M");
    let day = date.format("D");
    let dateValues = startTime.split(":");
    let dateValues2 = endTime.split(":");
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
    let data = {
      clientId: clientSelected,
      task: "offline",
      projectId: projectSelected,
      startTime: startValue,
      endTime: endValue,
      performanceData: 100,
      isInternal: internal,
    };
    console.log(data);
    await axios
      .post("/activity", data)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };
  return (
    <>
      <Link
        variant="body1"
        sx={{
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={handleOpen}
      >
        <AddIcon />
        Add Offline time
      </Link>
      <Modal
        open={modal}
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
              Add Offline Time
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
            Offline time range will appear on your timeline. You'll be able to
            delete or edit it there.
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
                placeholder="From"
                variant="filled"
                size="small"
                onChange={handleStartChange}
                sx={{
                  width: "20%",
                }}
              />
              -
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                placeholder="To"
                variant="filled"
                size="small"
                onChange={handleEndChange}
                sx={{
                  width: "20%",
                }}
              />
            </Box>
            Client
            <Select
              value={clientSelected}
              onChange={handleClientChange}
              displayEmpty
              fullWidth
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                my: 1,
              }}
            >
              {commonData?.commonData?.user?.clients.map((client) => {
                return <MenuItem value={client._id}>{client.name}</MenuItem>;
              })}
            </Select>
            Project
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
              {commonData?.commonData?.user?.projects.map((project) => {
                return <MenuItem value={project._id}>{project.name}</MenuItem>;
              })}
            </Select>
            {/* <TextField
              disabled
              id="filled-disabled"
              label="Disabled"
              defaultValue="Activity Name"
              variant="filled"
              size="large"
              fullWidth
            /> */}
            <Box>
              Internal
              <Switch
                onClick={(e) => {
                  setInternal(e.target.checked);
                }}
              />
              External
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
              onClick={addTime}
            >
              Save Changes
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default OfflineTime;
