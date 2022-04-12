import * as React from "react";
// import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import { interval } from "rxjs";
// import { random, randomUserName } from '@mui/x-data-grid-generator';
import { DataGrid } from "@mui/x-data-grid";
import { Card } from "@material-ui/core";
import { random } from "lodash";
import CircleIcon from "@mui/icons-material/Circle";
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
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import { getCommonData } from "src/api/auth api/commondata";
import moment from "moment";
import { capitalize } from "src/_helpers/Capitailze";
import { getFullName } from "src/_helpers/getFullName";

const icons = CircleIcon;
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

function createData(
  Employee,
  LastActive,
  Today,
  Yesterday,
  ThisWeek,
  ThisMonth
) {
  return { Employee, LastActive, Today, Yesterday, ThisWeek, ThisMonth };
}

const projectRows = [
  createData("Project1", "1m ago", "3hr", "8hr 23min", "13hr 19min", "34hr"),
  createData("Project2", "3hr ago", "3hr", "8hr 23min", "13hr 19min", "34hr"),
  createData("Project3", "23hr ago", "3hr", "8hr 23min", "13hr 19min", "34hr"),
  createData("Project4", "1min", "3hr", "8hr 23min", "13hr 19min", "34hr"),
  createData("Project5", "4min", "5hr", "8hr 23min", "13hr 19min", "34hr"),
];

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
        to={`/dashboard/userpage/`}
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
export default function EmployeeApiRefRowsGrid() {
  const { commonData, dispatchCommonData } =
    React.useContext(CurrentUserContext);
  const [tData, setTData] = React.useState([]);

  const date = new Date();
  React.useEffect(() => {
    if (commonData.commonData !== undefined) {
      setTData(commonData.commonData);
    }
  }, []);

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
    <Box
      sx={{
        width: "100%",
        flexGrow: "1",
        overflow: "hidden",
        display: "table",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", display: "table" }}>
        {/* <DataGrid rows={rows} columns={columns} /> */}
        <TableContainer
          sx={{ display: "block", width: "100%" }}
          component={Paper}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee</StyledTableCell>
                <StyledTableCell align="right">Last Active</StyledTableCell>
                <StyledTableCell align="right">Today</StyledTableCell>
                <StyledTableCell align="right">Yesterday</StyledTableCell>
                <StyledTableCell align="right">This Week</StyledTableCell>
                <StyledTableCell align="right">This Month</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <StyledTableRow key={tData.user._id}>
                <StyledTableCell component="th" scope="row">
                  <Typography
                    component={RouterLink}
                    sx={{
                      fontWeight: "600",
                      textDecoration: "none",
                      color: "black",
                      mr: 1,
                    }}
                    to={`/dashboard/userpage`}
                    variant="h5"
                  >
                    {getFullName(tData.user.firstName, tData.user.lastName)}
                  </Typography>
                  <Chip
                    color="primary"
                    size="small"
                    label={capitalize(tData.user.role)}
                  />
                </StyledTableCell>

                <StyledTableCell align="right">
                  {dispdata(
                    date.getTime() - tData?.user?.lastActive <= 120000 ? (
                      <Box
                        sx={{
                          ml: 1,
                          display: "flex",
                          alignItems: "right",
                          alignContent: "center",
                          flexDirection: "row",
                        }}
                      >
                        <CircleIcon sx={{ color: "success.darker" }} />
                        <Typography sx={{ ml: 1 }}>Active</Typography>
                      </Box>
                    ) : moment(tData?.user?.lastActive).subtract(7, "days") >=
                      604800 ? (
                      moment(tData?.user?.lastActive)
                        .startOf("minutes")
                        .fromNow()
                    ) : (
                      "Not Active in a while"
                    ),
                    "",
                    tData.user
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dispdata(
                    tData?.dailyHours?.length === 1
                      ? tData.dailyHours[0]?.totalHours <= 3600
                        ? `${Math.floor(
                            (tData.dailyHours[0]?.totalHours % 3600) / 60
                          )} min`
                        : `${(tData.dailyHours[0].totalHours / 3600).toFixed(
                            0
                          )} hr` +
                          ` ${(
                            (tData.dailyHours[0].totalHours % 3600) /
                            60
                          ).toFixed(0)} min`
                      : "0",
                    tData.dailyHours.length === 1
                      ? (
                          tData.dailyHours[0]?.totalHours / tData.user.payRate
                        ).toFixed(2)
                      : "",
                    tData.user
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dispdata(
                    tData.yersterdayHours?.length === 1
                      ? tData.yersterdayHours[0]?.totalHours <= 3600
                        ? `${(
                            tData.yersterdayHours[0]?.totalHours / 60
                          ).toFixed(0)} min`
                        : `${(
                            tData.yersterdayHours[0].totalHours / 3600
                          ).toFixed(0)} hr` +
                          ` ${(
                            (tData.yersterdayHours[0].totalHours % 3600) /
                            60
                          ).toFixed(0)} min`
                      : "0",
                    tData.yersterdayHours.length === 1
                      ? (
                          tData.yersterdayHours[0]?.totalHours /
                          tData.user.payRate
                        ).toFixed(2)
                      : "",
                    tData.user,
                    "yesterday"
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dispdata(
                    tData?.weeklyTime?.length === 1
                      ? tData.weeklyTime[0].totalHours <= 3600
                        ? `${(tData.weeklyTime[0].totalHours / 60).toFixed(
                            0
                          )} min`
                        : `${(tData.weeklyTime[0].totalHours / 3600).toFixed(
                            0
                          )} hr` +
                          ` ${(
                            (tData.weeklyTime[0].totalHours % 3600) /
                            60
                          ).toFixed(0)} min`
                      : "0",
                    tData.weeklyTime.length === 1
                      ? (
                          tData.weeklyTime[0]?.totalHours / tData.user.payRate
                        ).toFixed(2)
                      : "",
                    tData.user
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dispdata(
                    tData?.monthlyTime?.length === 1
                      ? tData.monthlyTime[0].totalHours <= 3600
                        ? `${(tData.monthlyTime[0].totalHours / 60).toFixed(
                            0
                          )} min`
                        : `${(tData.monthlyTime[0].totalHours / 3600).toFixed(
                            0
                          )} hr` +
                          ` ${(
                            (tData.monthlyTime[0].totalHours % 3600) /
                            60
                          ).toFixed(0)} min`
                      : "0",
                    tData?.monthlyTime.length === 1
                      ? (
                          tData?.monthlyTime[0]?.totalHours / tData.user.payRate
                        ).toFixed(2)
                      : "",
                    tData.user
                  )}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
