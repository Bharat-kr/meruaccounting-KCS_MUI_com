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
import Treeview from "../Treeview";
import SearchBar from "../SearchBar";
import { getClientProjects, getClient } from "../../api/clients api/clients";
//-------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function Sidebar() {
  const classes = useStyles();

  // state variable for input box to pass in as the new client value.
  const [newClientValue, setnewClientValue] = useState();
  const [newClientError, setnewClientError] = useState(false);
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
  useEffect(() => {
    getClient(dispatchClientDetails);
  }, []);
  let clientsList = [];
  if (clientDetails.loader === false) {
    clientsList = clientDetails.client.data;
  }

  // useEffect(() => {
  //   getClientProjects(
  //     { clientId: currentClient._id },
  //     dispatchClientProjectDetails
  //   );
  // }, [checkclientDetails]);
  // change currentclient on search
  const handleSearch = (e, value) => {
    const client = clientsList.filter((client) =>
      client.name === value ? client : ""
    );
    if (client.length === 0) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    return changeClient(client[0]);
  };

  // change currenclient on projects name click
  const handleClick = (e) => {
    // console.log(e)
    const client = clientsList.filter((client) =>
      client.name === e.target.textContent ? client : ""
    );
    changeClient(client[0]);
    // changeProject(project[0]);
  };
  const handleProjectClick = (e) => {
    const client = clientsList.filter((client) =>
      client.name === e.target.dataset.client ? client : ""
    );
    changeClient(client[0]);
    const project = client[0].projects.filter((project) =>
      project.name === e.target.dataset.project ? project : ""
    );

    changeProject(project[0]);
  };
  // add client in submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setnewClientError(false);
    if (newClientValue === "") {
      setnewClientError(true);
    }
    const newClient = {
      name: newClientValue,
      members: [],
      id: clients.length + 1,
      projects: [],
    };
    addClient(newClient);
    setnewClientValue("");
  };

  return (
    <Box
      component="div"
      sx={{
        margin: "10px",
        // height: "70vh",
        flexGrow:"1"
      }}
    >
      <Paper
        component="div"
        elevation={3}
        sx={{
          overflow: "hidden",
          height: "100%",
          display:"flex",
          flexDirection:"column"
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
            options={clientsList}
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
          {clientsList.map((client) => (
            <Treeview
              parentName={client.name}
              className={classes.root}
              sx={{ width: "100%" }}
              onClick={handleClick}
              id={client._id}
            >
              {client.projects.map((project) => {
                return (
                  <TreeItem
                    nodeId={1 + client.projects.indexOf(project) + 1}
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
              onChange={(e) => setnewClientValue(e.target.value)}
              required
              fullWidth
              label="Add new client"
              error={newClientError}
              sx={{}}
            />

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
