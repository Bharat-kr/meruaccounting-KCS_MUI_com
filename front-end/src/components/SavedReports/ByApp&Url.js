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

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <ImageIcon
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ImageIcon>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Employee}
        </TableCell>
        <TableCell align="left">{row.Application}</TableCell>
        <TableCell align="left">{row.Activity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {
                <Card sx={{ width: 260, maxWidth: 260, m: 1.8 }}>
                  <Tooltip
                    title={`${row.Ss?.title}`}
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
                          {row.Ss?.title}
                        </Box>
                      </span>
                    </CardContent>
                  </Tooltip>

                  <Tooltip
                    title={`${timeC(row.Ss?.activityAt)}, ${Math.ceil(
                      row.Ss?.performanceData
                    )}%`}
                    placement="top"
                    followCursor
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={`${row.Ss?.image}`}
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
                        row.Ss?.performanceData
                      )}%, Taken at ${timeC(row.Ss?.activityAt)}`}
                    </Typography>
                  </CardContent>
                </Card>
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    // Duration: PropTypes.string.isRequired,
    // Money: PropTypes.number.isRequired,
    Activity: PropTypes.number.isRequired,
    Application: PropTypes.string.isRequired,
  }).isRequired,
};

export default function ByAppUrl() {
  const [rowData, setRowData] = React.useState([]);
  const { savedReports } = React.useContext(reportsContext);
  React.useEffect(() => {
    console.log(savedReports.reports[0]?.byPR);

    let arr = [];
    savedReports.reports[0]?.byA?.map((emp) => {
      const act = emp.performanceData;
      emp.screenshots((ss) => {
        arr.push({
          Employee: `${emp.employee.firstName} ${emp.employee.lastName}`,
          Project: `${
            emp?.project?.name ? emp.project.name : "Deleted project"
          }`,
          Application: ss.title.split("-").slice(0),
          Duration: (emp.totalHours / 3600).toFixed(2),
          Activity: (act / 1).toFixed(2),
          Money: ((emp?.totalHours / 3600) * emp.employee.payRate).toFixed(2),
          Ss: emp.screenshots,
        });
      });
    });
    setRowData(arr);
  }, [savedReports]);
  console.log(rowData);
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
            <TableCell>Name</TableCell>
            <TableCell align="left">Application</TableCell>
            <TableCell align="left">Activity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
