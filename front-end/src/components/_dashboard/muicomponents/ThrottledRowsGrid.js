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

// -----------------------------------------------------------------------------------------------
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
      <Typography variant="caption" display="block" gutterBottom></Typography>
    </>
  );
}

export default function ApiRefRowsGrid({teamsList, getTeamsLoader ,tableListRef}) {
  return getTeamsLoader ? (
    <CircularProgress />
  ) : (
    <div style={{ height: "auto", width: "100%" }}> 
      <TableContainer component={Paper} >
        <Table sx={{ maxHeight: 700 }} aria-label="customized table">
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
              <StyledTableCell>2 out of 4 worked Today</StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {teamsList.map((member) => (
              <StyledTableRow key={member.id} ref={tableListRef}>
                <StyledTableCell component="th" scope="row">
                  <RouterLink
                    to={`/dashboard/employeepage/${member.id}`}
                    style={{ textDecoration: "none", color: "primary.main" }}
                  >
                    <Typography vairant="subtitle3">
                      {member.Employee}
                    </Typography>
                  </RouterLink>

                  {/* <div>project placeholder</div> */}
                  {/* <Chip label="Employee" color="success" size="small" /> */}
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
