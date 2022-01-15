import React from "react";
import { CssBaseline, Box, Typography } from "@mui/material";
// eslint-disable-next-line import/no-named-as-default
import Sidebar from "../components/Settings/Sidebar";
import PageHeader from "../components/PageHeader";
// eslint-disable-next-line import/no-named-as-default
import ClientsContextProvider from "../contexts/ClientsContext";
import { UserContextProvider } from "../contexts/UserContext";

export default function Settings() {
  return (
    <>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <CssBaseline />
        <PageHeader title="Settings" />
        <div>
          <Sidebar />
        </div>
      </Box>
    </>
  );
}
