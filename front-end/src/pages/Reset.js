import React from "react";
// material
import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import Page from "../components/Page";
import ChangePassword from "src/components/authentication/Reset/ChangePassword";

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const Reset = () => {
  return (
    <RootStyle title="Reset Password">
      <Container sx={{ width: "70%", mt: 8 }}>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "Center",
            scroll: "auto",
          }}
        >
          <ChangePassword />
        </Box>
      </Container>
    </RootStyle>
  );
};

export default Reset;
