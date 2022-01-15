import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
// import Activity from "./oldActivity";
import Activity from "./Activity";
// contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ScreenShots({ isInternal }) {
  // pass this date from calendar, constant for now
  const date = "15/1/2022";

  const [activities, setactivities] = useState([]);
  const { commonData } = useContext(CurrentUserContext);

  useEffect(() => {
    if (commonData.loader === false) {
      setactivities(
        commonData.commonData.user.days
          .filter((day) => day.date === date)[0]
          .activities.filter((act) => {
            console.log(isInternal);
            console.log(act.isInternal);
            return act.isInternal === isInternal;
          })
      );
    } else {
      return;
    }
  }, [commonData, isInternal]);
  console.log(activities);

  return commonData.loader ? (
    // Put a loader here
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ m: 2 }} />
    </Box>
  ) : (
    <Box component="div" sx={{}}>
      {/* map the time ranges from user data for the particular date */}
      {activities.length !== 0
        ? activities.map((act) => {
            return (
              <Activity
                startTime={act.startTime}
                endTime={act.endTime}
                performanceData={act.performanceData}
                proId={act.project}
                screenShots={act.screenshots}
              ></Activity>
            );
          })
        : "no activities"}
    </Box>
  );
}
