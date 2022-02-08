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

function dispdata(data, data2) {
  return (
    <>
      <Link underline="hover">{data}</Link>
      <Typography variant="body2" sx={{ mt: 0.5 }} display="block" gutterBottom>
        {data2 !== null ? data2 : ""}
      </Typography>
    </>
  );
}

export default function ApiRefRowsGrid(props) {
  const { teamsList, getTeamsLoader, tableListRef } = props;
  const {
    employeesData,
    employeeTimeData,
    changeEmployeeTimeData,
    dispatchEmployeesData,
  } = React.useContext(employeeContext);
  const [tData, setTData] = React.useState([]);
  const { dispatchgetTeam, getTeams } = React.useContext(teamContext);

  console.log(teamsList);
  employeeTimeData?.map((mem) => {
    console.log(mem.user.firstName);
  });
  const date = new Date();
  React.useEffect(() => {
    let int = setInterval(async () => {
      await getTeam(dispatchgetTeam);

      const data = [];
      const dataPush = [];
      // if (teamsList !== undefined) {
      for (let i = 0; i < teamsList.length; i++) {
        data.push(teamsList[i].id);
      }
      // } else {
      // for (let i = 0; i < teamsList.length; i++) {
      // data.push(newteamsList[i].id);
      // }
      // }
      console.log(data);
      await employeesTimeDetails(data, dispatchEmployeesData);

      changeEmployeeTimeData(employeesData?.data?.data);
    }, 120000);
    return () => clearInterval(int);
  }, []);
  React.useEffect(() => {
    console.log(employeesData?.data?.data);
    setTData(employeesData?.data?.data);
    console.log(tData);
  }, [employeesData]);
  console.log(tData);
  // tData?.map((mem) => {
  //   console.log();
  //   console.log(date.getTime());
  // });
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
              <StyledTableCell align="right">Last Active</StyledTableCell>
              <StyledTableCell align="right">Today</StyledTableCell>
              <StyledTableCell align="right">Yesterday</StyledTableCell>
              <StyledTableCell align="right">This Week</StyledTableCell>
              <StyledTableCell align="right">This Month</StyledTableCell>
            </TableRow>
            <TableRow>
              {/* <StyledTableCell>2 out of 4 worked Today</StyledTableCell> */}
              <StyledTableCell align="right"> </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {tData.map((mem) => {
              return <div>hello</div>;
            })} */}
            {tData?.map((member) => {
              return (
                <>
                  <StyledTableRow key={member.user._id} ref={tableListRef}>
                    <StyledTableCell component="th" scope="row">
                      <Typography
                        component={RouterLink}
                        sx={{
                          fontWeiight: "600",
                          textDecoration: "none",
                          color: "black",
                        }}
                        to={`/dashboard/employeepage/${member.user._id}`}
                        variant="h5"
                      >
                        {member.user.firstName} {member.user.lastName}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      {dispdata(
                        date.getTime() - member?.user?.lastActive <= 120000 ? (
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <CircleIcon sx={{ color: "success.darker" }} />
                            <Typography sx={{ ml: 1 }}>
                              Currently Active
                            </Typography>
                          </Box>
                        ) : moment(member?.user?.lastActive).subtract(
                            7,
                            "days"
                          ) >= 604800 ? (
                          moment(member?.user?.lastActive)
                            .startOf("minutes")
                            .fromNow()
                        ) : (
                          "Not Active in a while"
                        )
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dispdata(
                        member?.dailyHours?.length === 1
                          ? member.dailyHours[0]?.totalHours <= 3600
                            ? `${Math.floor(
                                (member.dailyHours[0]?.totalHours % 3600) / 60
                              )} min`
                            : `${(
                                member.dailyHours[0].totalHours / 3600
                              ).toFixed(0)} hr` +
                              ` ${(
                                (member.dailyHours[0].totalHours % 3600) /
                                60
                              ).toFixed(0)} min`
                          : "0",
                        member.dailyHours.length === 1
                          ? (
                              member.dailyHours[0]?.totalHours /
                              member.user.payRate
                            ).toFixed(2)
                          : ""
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dispdata(
                        member.yersterdayHours?.length === 1
                          ? member.yersterdayHours[0]?.totalHours <= 3600
                            ? `${(
                                member.yersterdayHours[0]?.totalHours / 60
                              ).toFixed(0)} min`
                            : `${(
                                member.yersterdayHours[0].totalHours / 3600
                              ).toFixed(0)} hr` +
                              ` ${(
                                (member.yersterdayHours[0].totalHours % 3600) /
                                60
                              ).toFixed(0)} min`
                          : "0",
                        member.yersterdayHours.length === 1
                          ? (
                              member.yersterdayHours[0]?.totalHours /
                              member.user.payRate
                            ).toFixed(2)
                          : ""
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dispdata(
                        member?.weeklyTime?.length === 1
                          ? member.weeklyTime[0].totalHours <= 3600
                            ? `${(member.weeklyTime[0].totalHours / 60).toFixed(
                                0
                              )} min`
                            : `${(
                                member.weeklyTime[0].totalHours / 3600
                              ).toFixed(0)} hr` +
                              ` ${(
                                (member.weeklyTime[0].totalHours % 3600) /
                                60
                              ).toFixed(0)} min`
                          : "0",
                        member.weeklyTime.length === 1
                          ? (
                              member.weeklyTime[0]?.totalHours /
                              member.user.payRate
                            ).toFixed(2)
                          : ""
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dispdata(
                        member?.monthlyTime?.length === 1
                          ? member.monthlyTime[0].totalHours <= 3600
                            ? `${(
                                member.monthlyTime[0].totalHours / 60
                              ).toFixed(0)} min`
                            : `${(
                                member.monthlyTime[0].totalHours / 3600
                              ).toFixed(0)} hr` +
                              ` ${(
                                (member.monthlyTime[0].totalHours % 3600) /
                                60
                              ).toFixed(0)} min`
                          : "0",
                        member?.monthlyTime.length === 1
                          ? (
                              member?.monthlyTime[0]?.totalHours /
                              member.user.payRate
                            ).toFixed(2)
                          : ""
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
