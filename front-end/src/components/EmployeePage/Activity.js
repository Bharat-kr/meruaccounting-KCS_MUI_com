import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Preview from "./Preview";

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
      <Tooltip title={`${performanceData}%`} placement="top" followCursor>
        <Box sx={{ m: 1, fontWeight: "bold" }} component="span">
          {percentIcon(performanceData)}
          <span> ({performanceData}%)</span>
        </Box>
      </Tooltip>
      <Typography component="span" sx={{ m: 0, fontWeight: "bold" }}>
        || {project === null ? "--" : project.name}
      </Typography>
      <Box
        component="div"
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {screenShots.map((ss, key) => (
          <Preview
            ssId={ss._id}
            actId={actId}
            title={ss.title}
            preview={ss.image}
            key={key}
            performanceData={ss.performanceData}
            activityAt={timeC(ss.activityAt)}
          />
        ))}
      </Box>
    </Box>
  );
}
