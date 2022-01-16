import React, { useState, useEffect, useContext } from "react";
import { CssBaseline, Box } from "@mui/material";
import Calendar from "../components/UserPage/Calendar";

// components
import Overview from "../components/UserPage/Overview";
import ScreenShots from "../components/UserPage/ScreenShots";
import Timeline from "../components/UserPage/Timeline";
import PageHeader from "../components/PageHeader";
import IntExt from "../components/UserPage/IntExt";

// contexts
// eslint-disable-next-line import/no-named-as-default
import CurrentUserContextProvider from "../contexts/CurrentUserContext";
import { LoginProvider } from "../contexts/LoginContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import { getCommonData } from "../api/auth api/commondata";
import { getCommonData } from "../api/auth api/commondata";

export default function UserPage() {
  const { currentUser, commonData, dispatchCommonData } =
    useContext(CurrentUserContext);
  const [isInternal, setisInternal] = useState(true);
  // pass this date from calendar, constant for now
  const date = "15/1/2022";

  const [activities, setactivities] = useState([]);

  useEffect(() => {
    getCommonData(dispatchCommonData);
  }, []);

  useEffect(() => {
    if (commonData.loader === false) {
      setactivities(
        commonData.commonData.user.days
          .filter((day) => day.date === date)[0]
          ?.activities.filter((act) => {
            console.log(isInternal);
            console.log(act.isInternal);
            return act.isInternal === isInternal;
          })
      );
    } else {
      return;
    }
  }, [commonData, isInternal]);

  return (
    <CssBaseline>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <PageHeader title="Hi, Welcome Back!" />
        <Calendar />
        <Overview />
        <Timeline activities={activities} />
        <IntExt
          setInternal={(isInt) =>
            setisInternal((prev) => {
              return isInt;
            })
          }
        />
        <ScreenShots activities={activities} />
      </Box>
    </CssBaseline>
  );
}
