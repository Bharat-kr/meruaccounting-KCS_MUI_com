import React, { useContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { Box, TextField, Button } from "@mui/material";
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
  removeProjectMember,
} from "../../api/projects api/projects";
import { Link as RouterLink } from "react-router-dom";
//------------------------------------------------------------------------------------------------//
function createData(name, projectHours, internalHours, noOfEmployees, id) {
  return {
    name,
    projectHours,
    internalHours,
    noOfEmployees,
    id,
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
    label: "Project",
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
    label: "Internal Hours",
  },
  {
    id: "noOfEmployees",
    numeric: true,
    disablePadding: false,
    label: "Project Members",
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
  const {
    numSelected,
    selected,
    projectsList,
    currentProject,
    currentClient,
    changeClient,
    changeProject,
    clientIndex,
    projectIndex,
    setSeleceted,
    clientsList,
  } = props;
  const { dispatchremoveProjectMember } = useContext(projectContext);
  const { dispatchClientDetails } = useContext(ClientsContext);
  const handleProjectDelete = async () => {
    const deleteList = [];
    selected.map((select) => {
      projectsList.filter((emp) =>
        emp.name === select ? deleteList.push(emp.id) : ""
      );
    });

    // React.useEffect(() => {
    //   setRowsPerPage(rows.length);
    // }, [rows.length, currentProject, currentClient]);
    deleteList.map(async (id) => {
      const data = [currentProject._id, id];
      removeProjectMember(data, dispatchremoveProjectMember);
      await getClient(dispatchClientDetails);
      setSeleceted([]);
    });
  };
  return (
    <>
      <Toolbar
        sx={{
          mt: 3,
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected === 1 && (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            <RouterLink
              // color="primary"
              to={`/dashboard/projects`}
              // underline="none"
              variant="inherit"
              onClick={async () => {
                const currproIndex = currentClient.projects.findIndex(
                  (cli) => cli.name === selected[0]
                );
                changeClient(clientsList[clientIndex]);
                changeProject(clientsList[clientIndex].projects[currproIndex]);
              }}
            >
              <Typography>{selected}</Typography>
            </RouterLink>
          </Typography>
        )}
        {numSelected > 1 ? (
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
            <IconButton onClick={handleProjectDelete}>
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
  const [newMember, setNewMember] = useState("");
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);
  const [rows, setRows] = useState([]);
  const {
    dispatchClientDetails,
    clientDetails,
    changeProject,
    changeClient,
    currentProject,
    currentClient,
  } = useContext(ClientsContext);
  const { dispatchaddProjectMember, ProjectMember } =
    useContext(projectContext);

  const tableListRef = useRef();
  const projectsList = [];
  const projectNameList = [];
  currentClient
    ? currentClient.projects?.map((pro) => {
        projectsList.push({
          id: pro._id,
          name: `${pro.name}`,
          budgetTime: pro.budgetTime,
          consumeTime: pro.consumeTime,
          noOfEmployees: pro.employess?.length,
        });
        projectNameList.push(`${pro.name}`);
      })
    : projectsList.push("");
  const rowPush = [];
  const clientIndex = clientsList?.findIndex(
    (i) => i._id === currentClient?._id
  );
  const projectIndex = clientsList[clientIndex]?.projects?.findIndex(
    (i) => i._id === currentProject?._id
  );
  // // }
  // const clientIndex = 0;
  // const projectIndex = 0;
  useEffect(async () => {
    try {
      const clientIndex = clientsList?.findIndex(
        (i) => i._id === currentClient?._id
      );
      const projectIndex = clientsList[clientIndex]?.projects?.findIndex(
        (i) => i._id === currentProject?._id
      );

      const data = currentClient?._id;

      if (projectIndex && clientIndex !== null) {
        await changeClient(clientsList[clientIndex]);
        await changeProject(clientsList[clientIndex]?.projects[projectIndex]);
      }
    } catch (err) {
      console.log(err);
    }
  }, [clientDetails]);
  React.useEffect(() => {
    try {
      currentClient?.projects?.map((pro) => {
        rowPush.push(
          createData(
            `${pro.name}`,
            pro.consumeTime,
            pro.budgetTime,
            pro.employees.length,
            pro._id
          )
        );
      });
      setRows(rowPush);
      setRowsPerPage(rows.length);
      setSelected([]);
    } catch (err) {
      console.log(err);
    }
  }, [currentClient, currentProject, clientDetails]);

  const handleMemberAdded = async (e) => {
    e.preventDefault();
    try {
      const data = [currentProject._id, newMember];
      await addProjectMember(data, dispatchaddProjectMember);
      await getClient(dispatchClientDetails);
      // setRowsPerPage(rows.length + 1);

      // console.log(currentProject);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = async (e, value) => {
    e.preventDefault();
    try {
      const member = projectsList?.filter((emp) =>
        emp.name === value ? emp : ""
      );
      if (member.length === 0) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      window.scroll({
        behavior: "smooth",
      });
      outerref.current.scrollTop =
        400 +
        tableListRef.current.scrollHeight * projectsList.indexOf(member[0]);
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
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Paper
        // elevation={3}
        sx={{
          pb: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AutoComplete
          disablePortal
          onChange={handleSearch}
          id="project-search"
          options={projectNameList}
          sx={{
            width: 300,
            height: 10,
            pb: 1,
            mb: 4,
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search Projects" />
          )}
        />
      </Paper>
      <EnhancedTableToolbar
        numSelected={selected.length}
        selected={selected}
        projectsList={projectsList}
        clientsList={clientsList}
        currentProject={currentProject}
        currentClient={currentClient}
        clientIndex={clientIndex}
        projectIndex={projectIndex}
        changeClient={(cli) => changeClient(cli)}
        changeProject={(pro) => changeProject(pro)}
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
                        <TableCell align="right">{row.projectHours}</TableCell>
                        <TableCell align="right">{row.internalHours}</TableCell>
                        <TableCell align="right">{row.noOfEmployees}</TableCell>
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
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </Box>
  );
}
