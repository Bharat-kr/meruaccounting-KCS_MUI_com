import React, { useState } from "react";
import {
  Box,
  Typography,
  Tooltip,
  Alert,
  AlertTitle,
  Toolbar,
  IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Preview from "./Preview";

// contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { loginContext } from "../../contexts/LoginContext";

// helpers
import timeC from "../../_helpers/timeConverter";

export default function Activity({
  project,
  actId,
  isAccepted,
  startTime,
  endTime,
  performanceData,
  screenShots,
}) {
  const [selectedSs, setselectedSs] = useState([]);
  const percentIcon = (percent) =>
    percent <= 30 ? (
      <HourglassEmptyIcon sx={{ m: -1 }} />
    ) : percent <= 70 && percent > 30 ? (
      <HourglassBottomIcon sx={{ m: -1 }} />
    ) : (
      <HourglassFullIcon sx={{ m: -1 }} />
    );

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: `${isAccepted === true ? "#c8facd" : "#ffe7d9"}`,
        m: 0.5,
        pt: 1.5,
        pr: 1,
        pb: 1,
        pl: 0.5,
        borderRadius: 1,
      }}
    >
      <Typography component="span" sx={{ fontWeight: "bold", ml: 2.5 }}>
        {timeC(startTime)} -{timeC(endTime)} ||
      </Typography>
      <Tooltip
        title={`${Math.ceil(performanceData)}%`}
        placement="top"
        followCursor
      >
        <Box sx={{ m: 1, fontWeight: "bold" }} component="span">
          {percentIcon(performanceData)}
          <span> ({Math.ceil(performanceData)}%)</span>
        </Box>
      </Tooltip>
      <Typography component="span" sx={{ m: 0, fontWeight: "bold" }}>
        || {project === null ? `Project was deleted, OOF :")` : project.name}
      </Typography>
      <Toolbar
        sx={{
          // use this for dynamic display none
          display: "none",
          ...(selectedSs > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
            display: "flex",
          }),
        }}
      >
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Delete {selectedSs.length} selected screenshots?
        </Typography>
      </Toolbar>
      <Box
        component="div"
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {screenShots.length !== 0 ? (
          screenShots.map((ss, key) => (
            <Preview
              setSelectedSs={(actId, ssId) => {
                setselectedSs((prev) => [...prev, { actId, ssId }]);
              }}
              ssId={ss._id}
              actId={actId}
              title={ss.title}
              preview={ss.image}
              key={key}
              performanceData={ss.performanceData}
              activityAt={timeC(ss.activityAt)}
            />
          ))
        ) : (
          <Alert
            fullWidth
            severity="info"
            sx={{ m: 2, width: "100%" }}
            variant="string"
          >
            <AlertTitle>No Screenshots</AlertTitle>
            Evidence was deleted — <strong>{`OOF :")`}</strong>
          </Alert>
        )}
      </Box>
    </Box>
  );
}
