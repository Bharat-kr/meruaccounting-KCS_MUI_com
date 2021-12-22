import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { TableContainer, Chip, CircularProgress } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { teamContext } from "../../../contexts/TeamsContext";
import { getFullName } from "src/_helpers/getFullName";
import { getTeam } from "../../../api/teams api/teams";

// ----------------------------------------------------------------------------------------------------------------------
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function dispdata(data) {
  return (
    <>
      <Link underline="hover">{data}</Link>
      <Typography variant="caption" display="block" gutterBottom>
        $100
      </Typography>
    </>
  );
}

export default function ApiRefRowsGrid() {
  const { dispatchgetTeam, getTeams } = useContext(teamContext);

  const [teamsList, setTeamsList] = useState([]);
  const getTeamsLoader = getTeams.loader;

  useEffect(() => {
    getTeam(dispatchgetTeam);
  }, []);

  // useState hook for rerender component

  useEffect(() => {
    const data = [];
    let test = -1;
    getTeams?.getTeam?.forEach((team) => {
      // eslint-disable-next-line prefer-template

      team.employees?.map((member) => {
        test = data.filter((mem) => member._id === mem.id);
        console.log(test);
        if (test.length === 0) {
          data.push({
            Employee: getFullName(member.firstName, member.lastName),
            id: member._id,
            LastActive: "",
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

  return getTeamsLoader ? (
    <CircularProgress />
  ) : (
    <div style={{ maxWidth: "lg", height: 400, width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employees</StyledTableCell>
              <StyledTableCell align="right">Last Active</StyledTableCell>
              <StyledTableCell align="right">Today</StyledTableCell>
              <StyledTableCell align="right">Yesterday</StyledTableCell>
              <StyledTableCell align="right">This Week</StyledTableCell>
              <StyledTableCell align="right">This Month</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>2 online 4 worked Today</StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
              <StyledTableCell align="right">$100</StyledTableCell>
              <StyledTableCell align="right">$100</StyledTableCell>
              <StyledTableCell align="right">$100</StyledTableCell>
              <StyledTableCell align="right">$100</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamsList.map((member) => (
              <StyledTableRow key={member.id}>
                <StyledTableCell component="th" scope="row">
                  <RouterLink to={`/dashboard/employeepage/${member.id}`}>
                    <Typography vairant="subtitle3">
                      {member.Employee}
                    </Typography>
                  </RouterLink>

                  {/* <div>project placeholder</div> */}
                  <Chip label="Employee" color="success" size="small" />
                </StyledTableCell>

                <StyledTableCell align="right">
                  {dispdata(member.LastActive)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dispdata(member.Today)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dispdata(member.Yesterday)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dispdata(member.ThisWeek)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dispdata(member.ThisMonth)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
