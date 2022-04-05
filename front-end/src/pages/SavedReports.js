import * as React from "react";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
// components
import Page from "../components/Page";
import { useParams } from "react-router-dom";
// contexts and api
import { reportsContext } from "../contexts/ReportsContext";
import { getSavedReports } from "../api/reports api/reports";
import Main from "../components/SavedReports/Main";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function SavedReports() {
  const { savedReports, dispatchGetSavedReports } =
    React.useContext(reportsContext);
  const { id } = useParams();

  React.useEffect(() => {
    const options = {
      url: id,
    };
    getSavedReports(dispatchGetSavedReports, options);
  }, []);
  return (
    <RootStyle title="SavedReports">
      <Container sx={{ width: "70%", mt: 8 }}>
        <Box
          sx={{
            height: "5rem",
            mt: 2,
            display: "flex",
            flexDirection: "row",
            scroll: "auto",
          }}
        >
          <Main />
        </Box>
      </Container>
    </RootStyle>
  );
}
