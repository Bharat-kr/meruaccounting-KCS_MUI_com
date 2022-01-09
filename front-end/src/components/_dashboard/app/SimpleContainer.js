import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography, Paper, Autocomplete, TextField } from "@mui/material";
import ApiRefRowsGrid from "../muicomponents/ThrottledRowsGrid";
import { useContext, useEffect, useState } from "react";
import { teamContext } from "../../../contexts/TeamsContext";
import { getFullName } from "src/_helpers/getFullName";
import { getTeam } from "../../../api/teams api/teams";

//----------------------------------------------------------------------------------------
export default function SimpleContainer() {
  const [open, setOpen] = React.useState(false);
  const { dispatchgetTeam, getTeams } = useContext(teamContext);

  const [teamsList, setTeamsList] = useState([]);
  const [searchedMember, setSearchedMember] = useState(0);
  const getTeamsLoader = getTeams.loader;
  const tableListRef = React.useRef();

  useEffect(() => {
    getTeam(dispatchgetTeam);
  }, []);

  // useState hook for rerender component
  console.log(getTeams);
  useEffect(() => {
    const data = [];
    let test = -1;
    getTeams?.getTeam?.forEach((team) => {
      // eslint-disable-next-line prefer-template

      team.members?.map((member) => {
        if (
          !data.find((el) => {
            return el.id === member._id;
          })
        ) {
          data.push({
            Employee: getFullName(member.firstName, member.lastName),
            LastActive: "",
            id: member._id,
            Today: "",
            Yesterday: "",
            ThisWeek: "",
            ThisMonth: "",
          });
        }
      });
    });
    setTeamsList(data);
  }, [getTeams]);

  const handleSearch = (e, value) => {
    const member = teamsList.filter((member) =>
      member.Employee === value ? member : ""
    );
    if (member.length === 0) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    // const wea = document.querySelector(`#${member[0].id}`);
    // console.log(tableListRef);
    // console.log(tableListRef.current.scrollHeight*teamsList.indexOf(member[0]) );
    window.scroll({
      top: 250 + tableListRef.current.scrollHeight*teamsList.indexOf(member[0]),
      behavior: 'smooth'
    });
  
    return setSearchedMember(teamsList.indexOf(member[0]));
  };

  return (
    <>
      <CssBaseline />
      <Paper elevation={3} sx={{ width: "100%" }}>
        <Box sx={{ height: "100vh", width: "100%" }}>
          <Grid item xs={12} sm={12} md={12}>
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
                onChange={handleSearch}
                id="employee-search"
                options={teamsList.map((element) => {
                  return element.Employee;
                })}
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
            <ApiRefRowsGrid
              teamsList={teamsList}
              getTeamsLoader={getTeamsLoader}
              tableListRef={tableListRef}
            />
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
