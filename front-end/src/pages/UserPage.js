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

  useEffect(() => {
    getCommonData(dispatchCommonData);
  }, []);

  return (
    <CssBaseline>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <PageHeader title="Hi, Welcome Back!" />
        <Calendar />
        <Overview />
        <Timeline />
        <IntExt
          setInternal={(isInt) =>
            setisInternal((prev) => {
              return isInt;
            })
          }
        />
        <ScreenShots isInternal={isInternal} />
      </Box>
    </CssBaseline>
  );
}
