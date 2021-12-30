import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography, Paper, Autocomplete, TextField } from "@mui/material";
import ApiRefRowsGrid from "../muicomponents/ThrottledRowsGrid";

//----------------------------------------------------------------------------------------
export default function SimpleContainer() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      <CssBaseline />
      <Paper elevation={3} sx={{ width: "100%" }}>
        <Box sx={{ height: "100vh", width: "100%" }}>
          <Grid item xs={3} sm={6} md={12}>
            <Container
              style={{
                padding: "1rem",
                fontSize: "1.5rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                varinat="h3"
                sx={{ fontWeight: "bold", fontSize: "23px" }}
              >
                Manager Dashboard
              </Typography>
              <Autocomplete
                disablePortal
                id="employee-search"
                options={["hello", "there"]}
                sx={{
                  width: 300,
                  height: 20,
                  p: 1,
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Search Employee" />
                )}
              />
            </Container>
            <ApiRefRowsGrid />
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
