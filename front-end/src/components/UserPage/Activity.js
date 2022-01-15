import React, { useContext } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Preview from "./Preview";

// contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { loginContext } from "../../contexts/LoginContext";

// helpers
import timeC from "../../_helpers/timeConverter";

export default function Activity({
  startTime,
  endTime,
  performanceData,
  proId,
  screenShots,
}) {
  const { currentUser, commonData, dispatchCommonData } =
    useContext(CurrentUserContext);

  const percentIcon = (percent) =>
    percent <= 30 ? (
      <HourglassEmptyIcon sx={{ m: -1 }} />
    ) : percent <= 70 && percent > 30 ? (
      <HourglassTopIcon sx={{ m: -1 }} />
    ) : (
      <HourglassFullIcon sx={{ m: -1 }} />
    );

  return (
    <Box component="div" sx={{}}>
      <Typography component="span" sx={{ m: 1, fontWeight: "bold" }}>
        {timeC(startTime)} -{timeC(endTime)} |
      </Typography>
      <Tooltip title={performanceData} placement="top" followCursor>
        {percentIcon(performanceData)}
      </Tooltip>
      <Typography component="span" sx={{ m: 1, fontWeight: "bold" }}>
        |{proId}
      </Typography>
      <Box
        component="div"
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {screenShots.map((ss, key) => (
          <Preview
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
