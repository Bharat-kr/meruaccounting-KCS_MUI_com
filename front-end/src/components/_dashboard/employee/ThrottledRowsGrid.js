import * as React from 'react';
// import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import { interval } from 'rxjs';
// import { random, randomUserName } from '@mui/x-data-grid-generator';
import { DataGrid } from '@mui/x-data-grid';
import { Card } from '@material-ui/core';
import { random } from 'lodash';
import CircleIcon from '@mui/icons-material/Circle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableContainer, Chip } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const icons = CircleIcon;
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

function createData(Employee, LastActive, Today, Yesterday, ThisWeek, ThisMonth) {
  return { Employee, LastActive, Today, Yesterday, ThisWeek, ThisMonth };
}

const projectRows = [
  createData('Project1', '1m ago', '3hr', '8hr 23min', '13hr 19min', '34hr'),
  createData('Project2', '3hr ago', '3hr', '8hr 23min', '13hr 19min', '34hr'),
  createData('Project3', '23hr ago', '3hr', '8hr 23min', '13hr 19min', '34hr'),
  createData('Project4', '1min', '3hr', '8hr 23min', '13hr 19min', '34hr'),
  createData('Project5', '4min', '5hr', '8hr 23min', '13hr 19min', '34hr')
];

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
export default function EmployeeApiRefRowsGrid() {
  return (
    <div style={{ maxWidth: 'lg', height: 400, width: '100%' }}>
      {/* <DataGrid rows={rows} columns={columns} /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Projects</StyledTableCell>
              <StyledTableCell align="right">Last Active</StyledTableCell>
              <StyledTableCell align="right">Today</StyledTableCell>
              <StyledTableCell align="right">Yesterday</StyledTableCell>
              <StyledTableCell align="right">This Week</StyledTableCell>
              <StyledTableCell align="right">This Month</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projectRows.map((row) => (
              <StyledTableRow key={row.Employee}>
                <StyledTableCell component="th" scope="row">
                  <RouterLink to="/dashboard/userdetails">{row.Employee}</RouterLink>

                  {/* <div>project placeholder</div> */}
                  <Chip label="Employer" color="success" size="small" />
                </StyledTableCell>

                <StyledTableCell align="right">{dispdata(row.LastActive)}</StyledTableCell>
                <StyledTableCell align="right">{dispdata(row.Today)}</StyledTableCell>
                <StyledTableCell align="right">{dispdata(row.Yesterday)}</StyledTableCell>
                <StyledTableCell align="right">{dispdata(row.ThisWeek)}</StyledTableCell>
                <StyledTableCell align="right">{dispdata(row.ThisMonth)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
