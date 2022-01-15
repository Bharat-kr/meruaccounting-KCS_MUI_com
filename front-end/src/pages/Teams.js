import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import VerticalTabs from "../components/teams/verticaltabs";
import PageHeader from "../components/PageHeader";
import { UserContextProvider } from "../contexts/UserContext";
import { ClientsContextProvider } from "../contexts/ClientsContext";

// _______________________________________________________________________________________________________________

export default function SimpleContainer() {
  return (
    <>
      <CssBaseline />
      <Box
        component="div"
        sx={{ width: "95%", margin: "auto", maxHeight: "70vh", height: "70vh" }}
      >
        <PageHeader title="Teams" />
        <VerticalTabs />
      </Box>
    </>
  );
}
