import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import Activity from "./oldActivity";
import Activity from "./Activity";
// contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { divide } from "lodash";

export default function ScreenShots({ isInternal }) {
  // pass this date from calendar, constant for now
  const date = "14/1/2022";

  const [activities, setactivities] = useState([]);
  const { commonData } = useContext(CurrentUserContext);

  useEffect(() => {
    if (commonData.loader === false) {
      setactivities(
        commonData.commonData.user.days
          .filter((day) => day.date === date)[0]
          .activities.filter((act) => act.isInternal === isInternal)
      );
    } else {
      return;
    }
  }, [commonData, isInternal]);

  return commonData.loader ? (
    // Put a loader here
    <div>Hello</div>
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
