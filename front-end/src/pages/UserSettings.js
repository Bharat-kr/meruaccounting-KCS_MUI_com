import { useContext } from "react";
import { Box, CircularProgress } from "@mui/material";
import PageHeader from "../components/PageHeader";

import Page from "../components/Page";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";

export default function UserSettings() {
  const { commonData } = useContext(CurrentUserContext);

  return commonData.loader ? (
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
    <Page title="usersettings">
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <PageHeader title="Settings" />
      </Box>
    </Page>
  );
}
