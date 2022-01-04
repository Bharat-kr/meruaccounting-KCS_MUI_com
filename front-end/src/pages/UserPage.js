import React from "react";
import { CssBaseline, Box } from "@mui/material";
import Calendar from "../components/UserPage/Calendar";

// components
import Overview from "../components/UserPage/Overview";
import ScreenShots from "../components/UserPage/ScreenShots";
import Timeline from "../components/UserPage/Timeline";
import PageHeader from "../components/PageHeader";

// contexts
// eslint-disable-next-line import/no-named-as-default
import CurrentUserContextProvider from "../contexts/CurrentUserContext";
import { LoginProvider } from "../contexts/LoginContext";

export default function UserPage() {
  return (
    <CssBaseline>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <LoginProvider>
          <CurrentUserContextProvider>
            <PageHeader title="Hi, Welcome Back!" />
            <Calendar />
            <Overview />
            <Timeline/>
            <ScreenShots />
          </CurrentUserContextProvider>
        </LoginProvider>
      </Box>
    </CssBaseline>
  );
}
