import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { TableContainer, Chip, CircularProgress, Box } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { employeeContext } from "../../../contexts/EmployeeContext";
import CircleIcon from "@mui/icons-material/Circle";
import timeC from "../../../_helpers/timeConverter";
import { employeesTimeDetails } from "../../../api/employee api/employee";
import { teamContext } from "src/contexts/TeamsContext";
import { getTeam } from "../../../api/teams api/teams";
import { capitalize } from "src/_helpers/Capitailze";
import { getFullName } from "src/_helpers/getFullName";

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

function dispdata(data, data2, user, state) {
  return (
    <>
      <Typography
        underline="hover"
        component={RouterLink}
        sx={{
          fontWeight: "400",
          textDecoration: "none",
          color: "primary.main",
          ":hover": {
            color: "primary.darker",
            textDecoration: "underline #000000",
          },
        }}
        to={`/dashboard/employeepage/${user._id}`}
        state={state}
        variant="body2"
      >
        {data}
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.5 }} display="block" gutterBottom>
        {data2 !== null ? data2 : ""}
      </Typography>
    </>
  );
}

export default function AdminApiRefRowsGrid(props) {
  const { teamsList, getTeamsLoader, tableListRef } = props;
  const [tData, setTData] = React.useState([]);
  const {
    employeesData,
    employeeTimeData,
    changeEmployeeTimeData,
    dispatchEmployeesData,
    adminAllEmployee,
  } = React.useContext(employeeContext);
  const { dispatchgetTeam, getTeams } = React.useContext(teamContext);
  let totalActive = 0;
  const date = new Date();
  React.useEffect(
    () =>
      adminAllEmployee?.allEmployee?.data
        ? setTData(adminAllEmployee?.allEmployee?.data)
        : "",
    [adminAllEmployee]
  );

  if (tData?.length !== 0) {
    tData.map((mem) => {
      if ((date.getTime() - mem.lastActive).toFixed(0) / 1000 <= 86400)
        totalActive += 1;
    });
  }

  return tData?.length === 0 ? (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <div style={{ height: "auto", width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ maxHeight: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employees</StyledTableCell>
              <StyledTableCell align="left">Last Active</StyledTableCell>
              <StyledTableCell align="left">Today</StyledTableCell>
              <StyledTableCell align="left">Yesterday</StyledTableCell>
              <StyledTableCell align="left">This Week</StyledTableCell>
              <StyledTableCell align="left">This Month</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>{`${totalActive} out of ${tData?.length} Active today`}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {tData.map((mem) => {
              return <div>hello</div>;
            })} */}
            {tData?.map((member) => {
              return (
                <>
                  <StyledTableRow key={member._id} ref={tableListRef}>
                    <StyledTableCell component="th" scope="row">
                      <Typography
                        component={RouterLink}
                        sx={{
                          fontWeight: "600",
                          textDecoration: "none",
                          color: "black",
                          mr: 1,
                        }}
                        to={`/dashboard/employeepage/${member._id}`}
                        variant="h5"
                      >
                        {getFullName(member.firstName, member.lastName)}
                      </Typography>
                      <Chip
                        color="primary"
                        size="small"
                        label={capitalize(member.role)}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {dispdata(
                        date.getTime() - member?.lastActive <= 120000 ? (
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <CircleIcon
                              small
                              sx={{ color: "success.darker" }}
                            />
                            <Typography
                              sx={{
                                fontWeight: "400",
                                textDecoration: "none",
                                color: "primary.main",
                                ":hover": {
                                  color: "primary.darker",
                                  textDecoration: "underline #000000",
                                },
                              }}
                            >
                              Active
                            </Typography>
                          </Box>
                        ) : moment(member?.lastActive).subtract(7, "days") >=
                          604800 ? (
                          moment(member?.lastActive)
                            .startOf("minutes")
                            .fromNow()
                        ) : (
                          "Not Active in a while"
                        ),
                        "",
                        member
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {dispdata(
                        member?.time[0]?.today
                          ? member.time[0]?.today <= 3600
                            ? `${Math.floor(
                                (member.time[0]?.today % 3600) / 60
                              )} min`
                            : `${(member.time[0].today / 3600).toFixed(0)} hr` +
                              ` ${((member.time[0].today % 3600) / 60).toFixed(
                                0
                              )} min`
                          : "0",
                        member.time[0]?.today === 1
                          ? (member.time[0]?.today / member.payRate).toFixed(2)
                          : "",
                        member
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {dispdata(
                        member.time[0]?.yesterday
                          ? member.time[0].yesterday <= 3600
                            ? `${(member.time[0].yesterday / 60).toFixed(
                                0
                              )} min`
                            : `${(member.time[0].yesterday / 3600).toFixed(
                                0
                              )} hr` +
                              ` ${(
                                (member.time[0].yesterday % 3600) /
                                60
                              ).toFixed(0)} min`
                          : "0",
                        member.time[0]?.yesterday
                          ? (member.time[0].yesterday / member.payRate).toFixed(
                              2
                            )
                          : "",
                        member,
                        "yesterday"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {dispdata(
                        member?.time[0]?.week
                          ? member.time[0]?.week <= 3600
                            ? `${(member.time[0]?.week / 60).toFixed(0)} min`
                            : `${(member.time[0]?.week / 3600).toFixed(0)} hr` +
                              ` ${((member.time[0]?.week % 3600) / 60).toFixed(
                                0
                              )} min`
                          : "0",
                        member.time[0]?.week
                          ? (member.time[0]?.week / member.payRate).toFixed(2)
                          : "",
                        member
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {dispdata(
                        member?.time[0]?.month
                          ? member.time[0]?.month <= 3600
                            ? `${(member.time[0]?.month / 60).toFixed(0)} min`
                            : `${(member.time[0]?.month / 3600).toFixed(
                                0
                              )} hr` +
                              ` ${((member.time[0]?.month % 3600) / 60).toFixed(
                                0
                              )} min`
                          : "0",
                        member?.time[0]?.month
                          ? (member?.time[0]?.month / member.payRate).toFixed(2)
                          : "",
                        member
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
