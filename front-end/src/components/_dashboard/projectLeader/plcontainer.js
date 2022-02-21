import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Paper,
  Autocomplete,
  TextField,
  getPaginationItemUtilityClass,
} from "@mui/material";
import ApiRefRowsGrid from "../muicomponents/ThrottledRowsGrid";
import { useContext, useEffect, useState } from "react";
import { teamContext } from "../../../contexts/TeamsContext";
import PlApiRefRowsGrid from "./plThrottledRowsGrid";

import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { projectMemberCommonData } from "../../../api/auth api/commondata";

//----------------------------------------------------------------------------------------
export default function ProjectLeaderContainer(props) {
  const [teamsList, setTeamsList] = React.useState([]);
  const { getTeams } = useContext(teamContext);

  // const [employeeData, setEmployeeData] = useState();
  const [searchedMember, setSearchedMember] = useState(0);
  const getTeamsLoader = getTeams?.loader;
  const tableListRef = React.useRef();
  // const [int, setInt] = useState(true);
  const { projectMemberData, dispatchProjectMemberData } =
    useContext(CurrentUserContext);

  React.useLayoutEffect(() => {
    let pushData = [];
    let int = setInterval(() => {
      projectMemberCommonData(dispatchProjectMemberData);
    }, [120000]);

    projectMemberData?.data?.data?.map((mem) => {
      pushData.push({
        id: mem._id,
        Employee: `${mem.firstName} ${mem.lastName}`,
      });
    });
    setTeamsList(pushData);
    return () => clearInterval(int);
  }, []);

  const handleSearch = (e, value) => {
    const member = teamsList.filter((member) =>
      member.Employee === value ? member : ""
    );
    if (member.length === 0) {
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      window.scroll({
        top:
          250 +
          tableListRef.current.scrollHeight * teamsList.indexOf(member[0]),
        behavior: "smooth",
      });
    }
    return setSearchedMember(teamsList.indexOf(member[0]));
  };
  console.log(projectMemberCommonData);

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
                Project leader Dashboard
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
                  pb: 3,
                  mb: 2,
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Search Employee" />
                )}
              />
            </Container>
            <PlApiRefRowsGrid
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
