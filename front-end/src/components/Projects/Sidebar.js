/* eslint-disable consistent-return */
import React, { useContext, useRef, useEffect, useState } from "react";
import {
  Grid,
  List,
  Paper,
  Autocomplete,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TreeItem, TreeView } from "@mui/lab";
import { ClientsContext } from "../../contexts/ClientsContext";
import { projectContext } from "../../contexts/ProjectsContext";
import Treeview from "../Treeview";
import SearchBar from "../SearchBar";
import { getClientProjects, getClient } from "../../api/clients api/clients";
import { createProject } from "../../api/projects api/projects";
import Header from "./Header";
//-------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function Sidebar() {
  const classes = useStyles();

  // state variable for input box to pass in as the new client value.
  const [newClientValue, setnewClientValue] = useState();
  const [newClientError, setnewClientError] = useState(false);
  const [newProjectValue, setnewProjectValue] = useState();
  // contexts
  const {
    clients,
    currentClient,
    changeClient,
    addClient,
    currentProject,
    changeProject,
    client,
    clientDetails,
    dispatchClientDetails,
    clientProjectDetails,
    dispatchClientProjectDetails,
  } = useContext(ClientsContext);
  // const [currentClient, changeClient] = useState("");
  // const [currentProject, changeProject] = useState("");
  const { dispatchCreateProject } = useContext(projectContext);

  useEffect(async () => {
    await getClient(dispatchClientDetails);
  }, []);
  let clientsList = [];

  if (clientDetails.loader === false) {
    clientsList = clientDetails?.client?.data[0];
  }
  // useEffect(() => {
  //   if (clientDetails.length > 0) {
  //     changeClient(clientDetails?.client?.data[0]);
  //     changeProject(clientDetails?.client?.data[0].projects[0]);
  //   }
  // }, []);
  const projectList = [];
  useEffect(() => {
    if (clientDetails.loader === false) {
      clientDetails?.client?.data[0].map((client) => {
        client.projects.map((pro) => {
          projectList.push(client.name + ":" + pro.name);
        });
      });
    }
  }, [clientDetails, currentClient, currentProject]);
  // useEffect(() => {
  //   getClientProjects(
  //     { clientId: currentClient._id },
  //     dispatchClientProjectDetails
  //   );
  // }, [checkclientDetails]);
  // change currentclient on search
  const differentiateFunction = (str) => {
    if (str !== null) {
      return str.split(":");
    }

    // return arr;
  };

  const handleSearch = (e, value) => {
    const val = differentiateFunction(value);
    if (val !== null) {
      const client = clientsList?.filter((client) =>
        client.name === val[0] ? client : ""
      );
      const project = client[0].projects?.filter((pro) =>
        pro.name == val[1] ? pro : ""
      );
      if (client.length === 0) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      changeClient(client[0]);
      changeProject(project[0]);
    }
  };
  // change currenclient on projects name click
  const handleClick = (e) => {
    const client = clientsList.filter((client) =>
      client.name === e.target.textContent ? client : ""
    );
    changeClient(client[0]);
  };
  const handleProjectClick = (e) => {
    const client = clientsList.filter((client) =>
      client.name === e.target.dataset.client ? client : ""
    );
    changeClient(client[0]);
    setnewClientValue(client[0]);
    const project = client[0].projects.filter((project) =>
      project.name === e.target.dataset.project ? project : ""
    );

    changeProject(project[0]);
  };
  console.log(newClientValue);
  console.log(currentProject);
  // add client in submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setnewClientError(false);
      if (newProjectValue === "" || currentClient === null) {
        setnewClientError(true);
        return;
      }
      if (currentClient !== null) {
        const data = { name: newProjectValue, clientId: currentClient._id };
        await createProject(data, dispatchCreateProject);
        await getClient(dispatchClientDetails);
      }
    } catch (error) {
      console.log("Choose A client ,to be display in popup");
    }
  };

  return (
    <Box
      component="div"
      sx={{
        margin: "10px",
        // height: "70vh",
        flexGrow: "1",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Paper
        component="div"
        elevation={3}
        sx={{
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // position: "relative",
        }}
      >
        {/* search box */}
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <SearchBar
            handleSearch={handleSearch}
            label="Search Project"
            options={projectList}
          />
        </Box>

        {/* clients and project tree view flex container */}
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            alignItems: "flex-start",
            overflowY: "auto",
          }}
        >
          {clientsList.length > 0 &&
            clientsList.map((client) => (
              <Treeview
                parentName={client.name}
                key={client.name}
                className={classes.root}
                sx={{ width: "100%" }}
                onClick={handleClick}
                id={client._id}
              >
                {client.projects.map((project) => {
                  return (
                    <TreeItem
                      id={project._id}
                      key={project.name}
                      label={
                        <Typography
                          data-client={client.name}
                          data-project={project.name}
                          onClick={handleProjectClick}
                          variant="h6"
                        >
                          {project.name}
                        </Typography>
                      }
                      id={project._id}
                    />
                  );
                })}
              </Treeview>
            ))}
        </Box>

        {/* INPUT BOX, add validations, connect to context */}
        <Box
          sx={{
            boxSizing: "border-box",
            width: "95%",
            // position: "absolute",
            // bottom: "0",

            "& > :not(style)": { m: 1 },
          }}
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <TextField
              onChange={(e) => setnewProjectValue(e.target.value)}
              required
              fullWidth
              label="Add new project"
              error={newClientError}
              sx={{}}
            />

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1 }}>
              Add
            </Button>
          </form>
        </Box>
      </Paper>
      <Header
        currentClient={newClientValue}
        currentProject={currentProject}
        setcurrClient={changeClient}
        setCurrProjct={changeProject}
      />
    </Box>
  );
}
