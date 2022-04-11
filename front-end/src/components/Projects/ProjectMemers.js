import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { Box, TextField, Button, Autocomplete } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import FloatingForm from "../_dashboard/muicomponents/FloatingForm";
import AutoComplete from "@mui/material/Autocomplete";
import { ClientsContext } from "../../contexts/ClientsContext";
import { projectContext } from "../../contexts/ProjectsContext";
import { getClient } from "../../api/clients api/clients";
import {
  addProjectMember,
  removeProjectMem,
} from "../../api/projects api/projects";
import { getReports } from "../../api/reports api/reports";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { reportsContext } from "../../contexts/ReportsContext";
import { getFullName } from "src/_helpers/getFullName";
import { CommonContext } from "src/contexts/CommonContext";
import { getAllEmployeeList } from "src/api/admin api/admin";
//------------------------------------------------------------------------------------------------//
function createData(name, projectHours, internalHours, totalHours) {
  return {
    name,
    projectHours,
    internalHours,
    totalHours,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "projectHours",
    numeric: true,
    disablePadding: false,
    label: "Project Hours",
  },
  {
    id: "internalHours",
    numeric: true,
    disablePadding: false,
    label: "internal Hours",
  },

  {
    id: "totalHours",
    numeric: true,
    disablePadding: false,
    label: "Total Hours",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, selected, employeesList, currentProject, setSeleceted } =
    props;
  const { removeProjectMember, dispatchremoveProjectMember } =
    useContext(projectContext);
  const { dispatchClientDetails } = useContext(ClientsContext);
  const { enqueueSnackbar } = useSnackbar();
  const handleMemberDelete = async () => {
    try {
      const deleteList = [];
      selected.map((select) => {
        employeesList.filter((emp) =>
          emp.name === select ? deleteList.push(emp.id) : ""
        );
      });

      // React.useEffect(() => {
      //   setRowsPerPage(rows.length);
      // }, [rows.length, currentProject, currentClient]);
      for (let i = 0; i < deleteList.length; i++) {
        let data = [currentProject._id, deleteList[i]];
        await removeProjectMem(data, dispatchremoveProjectMember);
      }
      await getClient(dispatchClientDetails);

      setSeleceted([]);
      // enqueueSnackbar("Member deleted", { variant: "success" });
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: "info" });
    }
    enqueueSnackbar(
      removeProjectMember.error ? removeProjectMember.error : "Member deleted",
      {
        variant: removeProjectMember.error ? "info" : "success",
      }
    );
  };
  return (
    <>
      <Toolbar
        sx={{
          display: "none",
          mt: 3,
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
            display: "flex",
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          ></Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleMemberDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
      </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const {
    // currentProject,
    //  currentClient,
    clientsList,
    outerref,
  } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("projectHours");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [newMemberId, setNewMemberId] = useState("");
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);
  const [rows, setRows] = useState([]);
  const [loaderAddMember, setLoaderAddMember] = useState(false);
  const [projectMember, setProjectMember] = useState([]);
  const [employeeNameList, setEmployeeNameList] = useState([]);
  const addMemberRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const {
    dispatchClientDetails,
    clientDetails,
    changeProject,
    changeClient,
    currentProject,
    currentClient,
  } = useContext(ClientsContext);
  const { ProjectMember, dispatchaddProjectMember } =
    useContext(projectContext);
  const { reports, dispatchGetReports, byClientsFunc, byProjectFunc } =
    useContext(reportsContext);
  const { allEmployees, dispatchAllEmployees } = useContext(CommonContext);

  const tableListRef = useRef();
  const employeesList = [];

  const reportsFunction = async (reportOptions) => {
    await getReports(dispatchGetReports, reportOptions);
  };
  React.useEffect(async () => {
    try {
      const reportOptions = {
        projectIds: [{ _id: currentProject._id }],
        userIds: currentProject?.employees?.map((mem) => {
          return { _id: mem._id };
        }),
      };
      await reportsFunction(reportOptions);
    } catch (error) {
      console.log(error);
    }
  }, [currentProject, currentClient]);
  useEffect(() => {
    setProjectMember(reports?.reports);
    byClientsFunc(reports?.reports[0]?.byClients);
    byProjectFunc(reports?.reports[0]?.byProjects);
    console.log(reports.reports);
  }, [reports]);
  React.useEffect(async () => {
    try {
      let nameList = [];
      currentProject
        ? currentProject.employees.map((emp, index) => {
            let o = {};
            let exists = projectMember[0]?.byEmployees?.filter(
              (el) => el._id.employee === emp._id
            );
            if (exists && exists.length) {
              o = {
                id: exists[0]._id.employee,
                name: `${exists[0]._id.firstName} ${exists[0]._id.lastName}`,
                internal: `${(exists[0].internal / 3600).toFixed(2)} hr`,
                external: `${(exists[0].external / 3600).toFixed(2)} hr`,
                totalHours: `${(exists[0].totalHours / 3600).toFixed(2)} hr`,
              };
            } else {
              o = {
                id: emp._id,
                name: `${emp.firstName} ${emp.lastName}`,
                internal: `0 hr`,
                external: `0 hr`,
                totalHours: `0 hr`,
              };
            }
            employeesList.push(o);

            nameList.push(`${emp.firstName} ${emp.lastName}`);
          })
        : employeesList.push("");

      console.log(employeesList);
      setRows(employeesList);
      setRowsPerPage(rows.length);
      setEmployeeNameList(nameList);
      setSelected([]);
    } catch (err) {
      console.log(err);
    }
  }, [currentClient, currentProject, clientDetails, projectMember]);

  console.log(employeesList);
  useEffect(async () => {
    try {
      const data = currentClient?._id;
      const clientIndex = clientsList?.findIndex(
        (i) => i._id === currentClient?._id
      );
      const projectIndex = clientsList[clientIndex]?.projects?.findIndex(
        (i) => i._id === currentProject._id
      );
      if (projectIndex && clientIndex !== null) {
        await changeClient(clientsList[clientIndex]);
        await changeProject(clientsList[clientIndex]?.projects[projectIndex]);
      }
    } catch (err) {
      console.log(err);
    }
  }, [clientDetails]);

  const handleMemberAdded = async (e) => {
    e.preventDefault();
    setLoaderAddMember(true);
    try {
      const data = [currentProject._id, newMemberId];
      await addProjectMember(data, dispatchaddProjectMember);
      await getClient(dispatchClientDetails);
      setLoaderAddMember(false);
      addMemberRef.current.value = "";
      // setRowsPerPage(rows.length + 1);
      // enqueueSnackbar("Member added", { variant: "success" });
      // console.log(currentProject);
    } catch (error) {
      setLoaderAddMember(false);
      // enqueueSnackbar(error.message, { variant: "info" });
      console.log(error.message);
    }
    enqueueSnackbar(
      ProjectMember.error ? ProjectMember.error : "Member added",
      {
        variant: ProjectMember.error ? "info" : "success",
      }
    );
  };
  //Fetching all Employees for autocomplete
  React.useEffect(() => {
    getAllEmployeeList(dispatchAllEmployees);
  }, []);

  const handleSearch = async (e, value) => {
    e.preventDefault();
    try {
      console.log(e, value);
      console.log(rows);
      const member = rows?.filter((emp) => (emp.name === value ? emp : ""));
      if (member.length === 0) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      window.scroll({
        behavior: "smooth",
      });
      outerref.current.scrollTop =
        400 +
        tableListRef.current.scrollHeight * employeesList.indexOf(member[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, id) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //handle employee select close
  const handleEmplooyeeSelect = (e, value) => {
    setNewMemberId(value._id);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Paper
        elevation={3}
        sx={{
          pb: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex ",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ pt: 1, ml: 1 }}>
            Project Members
          </Typography>
          <FloatingForm toolTip="Add Member" color="primary" icon={<AddIcon />}>
            <form
              onSubmit={handleMemberAdded}
              noValidate
              autoComplete="off"
              style={{ padding: "10px" }}
            >
              {/* <TextField
                inputRef={addMemberRef}
                onChange={(e) => setNewMember(e.target.value)}
                required
                type="email"
                fullWidth
                label="Add member by email"
                // error={newClientError}
                sx={{}}
              /> */}
              <Autocomplete
                id="combo-box-demo"
                inputRef={addMemberRef}
                options={allEmployees.employees}
                getOptionLabel={(option) =>
                  getFullName(option.firstName, option.lastName)
                }
                sx={{ width: 250 }}
                renderInput={(params) => (
                  <TextField {...params} label="Add Employees" />
                )}
                onChange={handleEmplooyeeSelect}
              />
              <LoadingButton
                fullWidth
                type="submit"
                loading={loaderAddMember}
                loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
              >
                Add Member
              </LoadingButton>
            </form>
          </FloatingForm>
        </div>
        <AutoComplete
          disablePortal
          onChange={handleSearch}
          id="employee-search"
          options={employeeNameList}
          sx={{
            width: 300,
            height: 10,
            p: 1,
            mb: 4,
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search Employee" />
          )}
        />
      </Paper>
      <EnhancedTableToolbar
        numSelected={selected.length}
        selected={selected}
        employeesList={employeesList}
        currentProject={currentProject}
        setSeleceted={setSelected}
      />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              // sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `${row.id}`;
                    return (
                      <TableRow
                        ref={tableListRef}
                        hover
                        id={labelId}
                        onClick={(event) =>
                          handleClick(event, row.name, row.id)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={labelId}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.external}</TableCell>
                        <TableCell align="right">{row.internal}</TableCell>
                        {/* <TableCell align="right">{row.payrate}</TableCell> */}
                        <TableCell align="right">{row.totalHours}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            // rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            // page={page}
            // onPageChange={handleChangePage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </Box>
  );
}
