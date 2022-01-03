import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Paper,
  Typography,
  Divider,
  Autocomplete,
  TextField,
  Link,
} from "@mui/material";
import SearchBar from "../SearchBar";
import CollapsibleTable from "../Projects/ProjectMemers";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { TreeItem, TreeView } from "@mui/lab";
import Treeview from "../Treeview";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import Switch from "@mui/material/Switch";
import { ClientsContext } from "../../contexts/ClientsContext";
import { getClientProjects } from "../../api/clients api/clients";
import AddIcon from "@mui/icons-material/Add";
import { display } from "@mui/material/node_modules/@mui/system";
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
export default function Header() {
  const classes = useStyles();
  // to focus edit name of client
  const inputRef = useRef();
  const [mockTeamLeader, setMockTeamLeader] = useState("");
  const handleEditClick = (e) => {
    inputRef.current.focus();
  };
  const test = useRef(false);

  // contexts
  const {
    clients,
    currentClient,
    currentProject,
    changeProject,
    updateClient,
    dispatchClientProjectDetails,
  } = useContext(ClientsContext);

  useEffect(() => {
    // getClientProjects(currentClient._id, dispatchClientProjectDetails);
    // console.log("hey");
  }, [currentClient]);
  const mockEmployeeList = ["Ayush", "Kamal", "Shrey", "Bharat"];
  // console.log(currentClient);
  const handleSearch = (e, value) => {
    console.log(value);
    const employee = mockEmployeeList.filter((emp) =>
      emp == value ? emp : ""
    );
    console.log(employee);
    return setMockTeamLeader(employee[0]);
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
      <Box component="div" sx={{ margin: "10px 10px 10px 0" }}>
        {/* grid container 40 60 */}
        <Paper
          component="div"
          elevation={3}
          sx={{
            overflow: "visible",
            height: "100%",
            // position: "relative",
            display: "flex",
            // gridTemplateRows: "30% 70%",
            flexDirection: "column",
          }}
        >
          <Box sx={{ m: 1, display: "block" }}>
            <div></div>
            <h3 style={{ backgroundColor: "#fff" }}>
              <input
                onClick={handleClick}
                type="text"
                ref={inputRef}
                className={classes.input}
                value={currentProject.name}
              />
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
                <button type="button" style={{}}>
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
              <Typography variant="h5" sx={{ pt: 1 }}>
                Project Members
              </Typography>
              <CollapsibleTable />
            </Paper>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
