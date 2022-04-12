// "use strict";

// import React, { useCallback, useMemo, useState } from "react";
// import { render } from "react-dom";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
// import "ag-grid-community/dist/styles/ag-grid.css";

// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { reportsContext } from "../../contexts/ReportsContext";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import ScreenShotRender from "./ScreenShotRender";

import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Tooltip,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Preview from "../UserPage/Preview";
import timeC from "src/_helpers/timeConverter";
import { timeCC } from "src/_helpers/timeConverter";
import ImageIcon from "@mui/icons-material/Image";
import { loginContext } from "src/contexts/LoginContext";
import { Role } from "../../_helpers/role";

function Row(props) {
  const { row, options, download } = props;
  const [open, setOpen] = React.useState(false);
  const { loginC } = React.useContext(loginContext);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {options.options.includeSS === true && (
            <ImageIcon
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </ImageIcon>
          )}
        </TableCell>

        <TableCell align="left">{row.Date}</TableCell>
        <TableCell align="left">{row.Client}</TableCell>
        <TableCell align="left">{row.Project}</TableCell>
        <TableCell component="th" scope="row">
          {row.Employee}
        </TableCell>
        <TableCell align="left">{row.Duration}</TableCell>
        <TableCell align="left">{row.From}</TableCell>
        <TableCell align="left">{row.To}</TableCell>
        <TableCell align="left">{row.To}</TableCell>

        {Role.indexOf(loginC.userData.role) <= 1
          ? options.options.includePR === true && (
              <TableCell align="left">{row.Money}</TableCell>
            )
          : ""}
        {options.options.includeAL === true || download ? (
          <TableCell align="left">{row.Activity}</TableCell>
        ) : (
          ""
        )}
      </TableRow>
      {options.options.includeSS === true && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {row.Ss.length !== 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {row.Ss.map((ss) => (
                    <Card sx={{ width: 260, maxWidth: 260, m: 1.8 }}>
                      <Tooltip
                        title={`${ss?.title}`}
                        placement="top"
                        followCursor
                      >
                        <CardContent
                          sx={{
                            pb: 0,
                            mb: 0,
                            mt: -2,
                            ml: -1.5,
                            background: "#A5B9D9",
                            maxHeight: "50px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {/* use ref to checkbox, perform onClick */}
                          <span>
                            <Box
                              sx={{
                                width: "75%",
                                display: "inline-block",
                                maxWidth: "90%",
                                typography: "caption",
                                fontWeight: "bold",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                              }}
                            >
                              {ss?.title}
                            </Box>
                          </span>
                        </CardContent>
                      </Tooltip>

                      <Tooltip
                        title={`${timeC(ss?.activityAt)}, ${Math.ceil(
                          ss?.performanceData
                        )}%`}
                        placement="top"
                        followCursor
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={`${ss?.image}`}
                            alt="green iguana"
                          />
                        </CardActionArea>
                      </Tooltip>

                      <CardContent
                        sx={{
                          pt: 0,
                          mb: -3,
                          ml: -1.5,
                          background: "#A5B9D9",
                        }}
                      >
                        <Typography
                          color="text.primary"
                          gutterBottom
                          variant="subtitle2"
                        >
                          {`${Math.ceil(
                            ss?.performanceData
                          )}%, Taken at ${timeC(ss?.activityAt)}`}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    // wordWrap: "initial",
                    width: "100%",
                  }}
                >
                  {" "}
                  No screenshots available
                </Typography>
              )}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Duration: PropTypes.string.isRequired,
//     Money: PropTypes.number.isRequired,
//     Activity: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default function ByD(props) {
  const { options, download } = props;
  const [rowData, setRowData] = React.useState([]);
  const { savedReports } = React.useContext(reportsContext);
  const { loginC } = React.useContext(loginContext);
  React.useEffect(() => {
    let arr = [];
    console.log(savedReports);
    savedReports.reports[0]?.byD?.map((emp) => {
      const act = emp.performanceData;
      arr.push({
        Date: emp.activityOn,
        Employee: `${emp.employee.firstName} ${emp.employee.lastName}`,
        Client: `${emp.client?.name ? emp?.client.name : "Deleted client"}`,
        Project: `${emp?.project?.name ? emp.project.name : "Deleted project"}`,
        From: timeCC(emp.startTime),
        To: timeCC(emp.endtime),
        Duration: `${timeC(emp.startTime)}-${timeC(emp.endTime)}`,
        Activity: (act / 1).toFixed(2),
        Money: (
          ((emp.endTime - emp.startTime) / (1000 * 60 * 60)) *
          emp.employee.payRate
        ).toFixed(2),
        Ss: emp.screenshots,
      });
    });
    setRowData(arr);
  }, [savedReports]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell align="left">Client</TableCell>
            <TableCell align="left">Project</TableCell>
            <TableCell align="left">from</TableCell>
            <TableCell align="left">to</TableCell>
            <TableCell align="left">employee</TableCell>
            <TableCell align="left">Duration</TableCell>
            {options.includeAL || download ? (
              <TableCell align="left">Activity</TableCell>
            ) : (
              ""
            )}
            {Role.indexOf(loginC.userData.role) <= 1 ? (
              options.includePR || download ? (
                <TableCell align="left">Money</TableCell>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <Row options={props} key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
