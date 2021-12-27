import React, { useContext, useState, useRef, useEffect } from "react";
import { Paper, Typography, Divider } from "@mui/material";
import { TreeItem } from "@mui/lab";
import Treeview from "../Treeview";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { ClientsContext } from "../../contexts/ClientsContext";
import { getClientProjects } from "../../api/clients api/clients";
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

  // console.log(currentClient);
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
            position: "relative",
            display: "grid",
            gridTemplateRows: "30% 70%",
          }}
        >
          <Box sx={{ m: 1 }}>
            <h1 style={{ backgroundColor: "#fff" }}>
              <input
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
            </h1>
            <div
              style={{
                float: "right",
                paddingTop: "20px",
              }}
            >
              {/* <input
                type="text"
                ref={inputRef}
                className={classes.input}
                value={currentProject.name}
              /> */}
              To be team laeder here
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
          </Box>

          <Box sx={{ m: 1 }}>
            <h2 style={{}}>Teams</h2>
            <Treeview>
              <TreeItem>hello</TreeItem>
            </Treeview>

            <Divider />
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                m: 1,
              }}
            ></Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
