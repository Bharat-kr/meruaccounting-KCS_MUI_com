import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Paper,
  Typography,
  Divider,
  Autocomplete,
  TextField,
  Link,
  Button,
  Fab,
} from "@mui/material";

import FloatingForm from "../_dashboard/muicomponents/FloatingForm";
import SearchBar from "../SearchBar";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { TreeItem, TreeView } from "@mui/lab";
import Treeview from "../Treeview";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import Switch from "@mui/material/Switch";
import { ClientsContext } from "../../contexts/ClientsContext";
import { projectContext } from "../../contexts/ProjectsContext";
import { getClient, getClientProjects } from "../../api/clients api/clients";
import { editProject, deleteProject } from "../../api/projects api/projects";
import AddIcon from "@mui/icons-material/Add";
import { display } from "@mui/material/node_modules/@mui/system";
import EnhancedTable from "../Projects/ProjectMemers";
import { indexOf } from "lodash";
//---------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#000",
    width: "fit-content",
    maxWidth: "50%",
    wordWrap: "break-word",
    height: "30px",
    fontSize: "30px",
    fontWeight: "bold",
    border: "none",
    background: "#fff",
    transition: "width 0.4s ease-in-out",
    "& :focus": { width: "100%" },
  },
}));
export default function Header(props) {
  const {
    // newClientValue,
    currentClient,
    // currentProject,
    setcurrentProject,
    setcurrentClient,
    ...other
  } = props;
  // const [currentClient, setCurrentClient] = useState(currentClient);
  // const [currentProject, setCurrentProject] = useState(currentProject);

  // console.log(currentClient, currentProject);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, "firstName") || ""} ${
          params.getValue(params.id, "lastName") || ""
        }`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const classes = useStyles();
  // to focus edit name of client
  const inputRef = useRef();
  //context
  const {
    clients,
    // currentClient,
    currentProject,
    changeProject,
    updateClient,
    dispatchClientDetails,
    dispatchClientProjectDetails,
  } = useContext(ClientsContext);
  const { dispatchEditProject, dispatchDeleteProject } =
    useContext(projectContext);
  const [mockTeamLeader, setMockTeamLeader] = useState("");
  const [projectName, setprojectName] = useState("");
  const handleEditClick = (e) => {
    inputRef.current.focus();
  };
  const test = useRef(false);
  useEffect(() => {
    setprojectName(`${currentProject.name}`);
  }, [currentClient, currentProject]);
  const mockEmployeeList = ["Ayush", "Kamal", "Shrey", "Bharat"];
  const handleSearch = (e, value) => {
    const employee = mockEmployeeList.filter((emp) =>
      emp == value ? emp : ""
    );
    return setMockTeamLeader(employee[0]);
  };
  const handleEdit = () => {};
  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("hello", projectName);
    editProject(currentProject._id, { name: projectName }, dispatchEditProject);
    // changeProject(projectName);
    // getClient(dispatchClientDetails);
  };
  console.log(currentClient);
  const handleProjectDelete = async (e) => {
    console.log(currentProject._id);
    const data = { projectId: `${currentProject._id}` };
    await deleteProject(currentProject._id, dispatchDeleteProject);
    changeProject(
      currentClient.projects[currentClient.projects.indexOf(currentProject) - 1]
    );
    await getClient(dispatchClientDetails);
    console.log(currentClient);
  };
  const handleClick = function () {};
  const handleSwitchChange = (e, client, project, member) => {
    const newClient = client;

    const index = newClient.projects.indexOf(currentProject);
    const members = newClient.projects[index].Projectmembers;
    if (members.includes(member)) {
      newClient.projects[index].Projectmembers.splice(
        members.indexOf(member),
        1
      );
      updateClient(newClient, clients.indexOf(currentClient));
    } else {
      newClient.projects[index].Projectmembers.push(member);
      updateClient(newClient, clients.indexOf(currentClient));
    }
    console.log("hello");
  };
  console.log(currentProject);
  return (
    <>
      <Box
        component="div"
        sx={{
          width: "70%",
          flexGrow: "1",
          overflowX: "hidden",
          overflowY: "auto",
          margin: "10px 10px 10px 0",
        }}
      >
        {/* grid container 40 60 */}
        <Paper
          component="div"
          elevation={3}
          sx={{
            overflow: "visible",
            height: "100%",
            position: "relative",
            display: "grid",
            gridTemplateRows: "30% 70%",
          }}
        >
          <Box sx={{ m: 1 }}>
            <div></div>
            <h3 style={{ backgroundColor: "#fff" }}>
              <form onSubmit={handleEditSubmit} style={{ display: "inline" }}>
                <input
                  onClick={handleClick}
                  onChange={(e) => setprojectName(e.target.value)}
                  type="text"
                  ref={inputRef}
                  className={classes.input}
                  value={projectName}
                />
              </form>

              <div
                style={{
                  float: "right",
                }}
              >
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  onClick={handleEditClick}
                >
                  <EditIcon />
                </button>
                <button onClick={handleProjectDelete} type="button" style={{}}>
                  <DeleteIcon />
                </button>
              </div>
            </h3>
            <Typography
              variant="h4"
              sx={{
                mt: 2,
                display: "block",
                width: "100%",
              }}
            >
              Project Leader
            </Typography>
            <div
              style={{
                width: "100%",
                float: "left",
                paddingTop: "20px",
                display: "flex",
                // justifyContent: "left",
                marginLeft: "2px",
              }}
            >
              <Paper
                elevation={3}
                // variant="h4"
                sx={{
                  textAlign: "center",
                  color: "red",
                  fontSize: "25px",
                  width: 150,
                  mt: 2,
                  mr: 2,
                }}
              >
                {mockTeamLeader}
              </Paper>

              <SearchBar
                label="Assign Project Leader"
                handleSearch={handleSearch}
                id="combo-box-demo"
                options={["Ayush", "Shrey", "Kamal", "Bharat"]}
                sx={{ width: 100 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select New Team Leader" />
                )}
              />
            </div>
            <hr />
            <Paper elevation={2} sx={{ pt: 1 }}>
              <Typography variant="h5" sx={{ pt: 5 }}>
                Total Project Hours: <Link>150hr</Link>
              </Typography>
              <Typography variant="h5" sx={{ pt: 1 }}>
                Total Internal Hours:<Link>30hr</Link>
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ pt: 1 }}>
              <hr />
              <Box
                sx={{
                  display: "flex ",
                  justifyContent: "space-between",
                  pt: 2,
                  pb: 2,
                }}
              >
                <div
                  style={{
                    display: "flex ",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" sx={{ pt: 1 }}>
                    Project Members
                  </Typography>
                  <FloatingForm
                    toolTip="Add Member"
                    color="primary"
                    icon={<AddIcon />}
                  >
                    <form
                      // onSubmit={handleSubmit}
                      noValidate
                      autoComplete="off"
                      style={{ padding: "10px" }}
                    >
                      <TextField
                        // onChange={(e) => setNewTeam(e.target.value)}
                        required
                        fullWidth
                        label="Add new Member"
                        // error={newClientError}
                        sx={{}}
                      />
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1 }}
                      >
                        Submit
                      </Button>
                    </form>
                  </FloatingForm>
                </div>
                <div
                  style={{
                    display: "inherit",
                    width: "300px",
                    alignItems: "center",
                  }}
                >
                  <SearchBar
                    label="Search Member"
                    handleSearch={handleSearch}
                    id="combo-box-demo"
                    options={["Ayush", "Shrey", "Kamal", "Bharat"]}
                    renderInput={(params) => (
                      <TextField {...params} label="Select New Team Leader" />
                    )}
                  />
                </div>
              </Box>
              <EnhancedTable />
            </Paper>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
