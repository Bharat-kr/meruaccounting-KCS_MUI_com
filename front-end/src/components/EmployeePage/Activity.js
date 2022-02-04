import React, { useState, useContext } from "react";
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
import { useParams } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Preview from "./Preview";

// contexts
import { EmployeePageContext } from "src/contexts/EmployeePageContext";

//api
import { deleteSs, deleteAct } from "../../api/employee api/employeePage";

// helpers
import timeC from "../../_helpers/timeConverter";

export default function Activity({
  date,
  project,
  actId,
  isAccepted,
  startTime,
  endTime,
  performanceData,
  screenShots,
}) {
  const { dispatchCommonData } = useContext(EmployeePageContext);
  const [selectedSs, setselectedSs] = useState([]);
  const { id } = useParams();

  // performance data icons
  const percentIcon = (percent) =>
    percent <= 30 ? (
      <HourglassEmptyIcon sx={{ m: -1 }} />
    ) : percent <= 70 && percent > 30 ? (
      <HourglassBottomIcon sx={{ m: -1 }} />
    ) : (
      <HourglassFullIcon sx={{ m: -1 }} />
    );

  const delSs = async (selectedSs) => {
    const array = selectedSs.map((ss) => {
      return { activityId: actId, screenshotId: ss };
    });
    await deleteSs(array, dispatchCommonData, id);
    setselectedSs([]);
  };

  const delAct = async (actId) => {
    await deleteAct(actId, date, dispatchCommonData, id);
  };

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: `${isAccepted === true ? "#C8DCFD" : "#ffe7d9"}`,
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
      <DeleteIcon
        sx={{ float: "right" }}
        onClick={(e) => {
          delAct(actId);
        }}
      />

      <Toolbar
        sx={{
          // use this for dynamic display none
          display: "none",
          mb: 1,
          position: "fixed",
          borderRadius: 1,
          bottom: "0",
          width: "70%",
          zIndex: "10",
          backgroundColor: "#ebf8f2",
          ...(selectedSs.length > 0 && {
            // bgcolor: (theme) => alpha(theme.palette.primary.main),
            display: "flex",
          }),
        }}
      >
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon
              sx={{ float: "right" }}
              fontSize="small"
              onClick={(e) => {
                delSs(selectedSs);
              }}
            />
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
              setSelectedSs={(isCheck, screenshotId) => {
                if (isCheck) {
                  console.log(selectedSs);
                  setselectedSs((prev) => [...prev, screenshotId]);
                } else {
                  console.log(selectedSs);
                  setselectedSs((prev) =>
                    selectedSs.filter((pre) => screenshotId !== pre)
                  );
                }
              }}
              selectedSs={selectedSs}
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
