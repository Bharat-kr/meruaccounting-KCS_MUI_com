/* eslint-disable consistent-return */
import React, { useContext, useEffect, useState, useRef } from "react";
import { Paper, Typography, Button, CircularProgress } from "@mui/material";
import { LoadingButton, TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ClientsContext } from "../../contexts/ClientsContext";
import { projectContext } from "../../contexts/ProjectsContext";
import SearchBar from "../SearchBar";
import { getClient } from "../../api/clients api/clients";
import { createProject } from "../../api/projects api/projects";
import Header from "./Header";
import Snackbars from "../../_helpers/snackBar";
import { capitalize } from "../../_helpers/Capitailze";
import { lowerCase } from "../../_helpers/LowerCase";
import { useSnackbar } from "notistack";
import { loginContext } from "../../contexts/LoginContext";
import { Role } from "../../_helpers/role";

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
  const { loginC } = useContext(loginContext);
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
  const { dispatchCreateProject, createdProject } = useContext(projectContext);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loaderAddProject, setLoaderAddProject] = React.useState(false);
  const [projectList, setProjectList] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const searchRef = useRef("");
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  let clientsList = [];

  if (clientDetails.loader === false) {
    clientsList = clientDetails?.client?.data;
  }

  useEffect(() => {
    try {
      // if (clientDetails !== null) {
      //   changeClient(clientDetails?.client?.data[0]);
      //   changeProject(clientDetails?.client?.data[0].projects[0]);
      // }
      // changeClient(
      //   clientDetails?.client?.data[
      //     clientDetails.client.data.indexOf(currentClient)
      //   ]
      // );
      // changeProject(
      //   clientDetails?.client?.data[
      //     clientDetails.client.data.indexOf(currentClient)
      //   ].projects[currentClient.projects.indexOf(currentProject)]
      // );
    } catch (error) {
      console.log(error.message);
    }
  }, [clientDetails]);
  useEffect(() => {
    let prolist = [];
    if (clientDetails.loader === false) {
      clientDetails?.client?.data.map((client) => {
        client.projects.map((pro) => {
          prolist.push(client.name + ":" + pro.name);
        });
        setProjectList(prolist);
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
  // console.log(currentClient, currentProject);
  console.log(clientDetails);
  const differentiateFunction = (str) => {
    if (str !== null) {
      return str.split(":");
    }

    // return arr;
  };

  const handleSearch = (e, value) => {
    try {
      const val = differentiateFunction(value);
      if (val !== null) {
        const client = clientsList?.filter((client) =>
          client.name === val[0] ? client : ""
        );
        setExpanded((oldExpanded) => [`${client[0]._id}`]);
        const project = client[0].projects?.filter((pro) =>
          pro.name == val[1] ? pro : ""
        );
        if (client.length === 0) {
          // eslint-disable-next-line no-useless-return
          return;
        }
        setnewProjectValue(project[0]);

        changeProject(project[0]);
        setSelected((oldSelected) => [`${project[0]._id + client[0]._id}`]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // change currenclient on projects name click
  const handleClick = (e) => {
    const client = clientsList.filter((client) =>
      client.name === e.target.textContent ? client : ""
    );
    setnewClientValue(client[0]);
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
    setnewProjectValue(project[0]);
    changeProject(project[0]);
  };
  // add client in submit
  const handleSubmit = async (e) => {
    setLoaderAddProject(true);
    try {
      e.preventDefault();
      setOpen(true);
      setnewClientError(false);
      if (newProjectValue === "" || currentClient === null) {
        setnewClientError(true);
      }
      if (currentClient !== null) {
        const data = {
          name: capitalize(newProjectValue),
          clientId: currentClient._id,
        };
        await createProject(data, dispatchCreateProject);
        await getClient(dispatchClientDetails);
      }
      searchRef.current.value = "";
      setLoaderAddProject(false);
      enqueueSnackbar("Successfully Created Project", { varinat: "success" });
    } catch (error) {
      console.log(error);
      if (currentClient === null || "") {
        enqueueSnackbar("Choose A client", { varinat: "info" });
      } else enqueueSnackbar(error.message, { varinat: "warning" });
      setLoaderAddProject(false);
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
        scrollbar: "auto",
      }}
    >
      <Paper
        component="div"
        elevation={3}
        sx={{
          overflow: "hidden",
          height: "100%",
          width: "28.5%",
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
        {clientDetails?.client?.loader && (
          <Box
            sx={{
              display: "flex",
              flexGrow: "1",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* clients and project tree view flex container */}
        {!clientDetails?.loader && (
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
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                height: 240,
                flexGrow: 1,
                // maxWidth: 400,
                overflowY: "auto",
                width: "100%",
              }}
              className={classes.root}
              expanded={expanded}
              selected={selected}
              onNodeToggle={handleToggle}
              onNodeSelect={handleSelect}
            >
              {clientsList?.length > 0 &&
                clientsList.map((client) => (
                  <TreeItem
                    nodeId={client._id.toString()}
                    label={
                      <Typography
                        sx={{
                          color: "#637381",
                          fontSize: "1.5rem",
                          fontWeight: "700",
                        }}
                      >
                        {client.name}
                      </Typography>
                    }
                    key={client._id}
                    onClick={handleClick}
                    id={client._id}
                  >
                    {client.projects.map((project) => {
                      return (
                        <TreeItem
                          nodeId={(project._id + client._id).toString()}
                          id={project._id}
                          key={project._id}
                          label={
                            <Typography
                              sx={{
                                color: "#2a3641",
                                fontSize: "1.2rem",
                                fontWeight: "700",
                              }}
                              data-client={client.name}
                              data-project={project.name}
                              onClick={handleProjectClick}
                            >
                              {project.name}
                            </Typography>
                          }
                        />
                      );
                    })}
                  </TreeItem>
                ))}
            </TreeView>
          </Box>
        )}

        <Box
          sx={{
            boxSizing: "border-box",
            width: "95%",
            "& > :not(style)": { m: 1 },
          }}
        >
          {loginC && Role.indexOf(loginC.userData.role) <= 2 && (
            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              style={{ width: "100%" }}
            >
              <TextField
                inputRef={searchRef}
                onChange={(e) => setnewProjectValue(e.target.value)}
                required
                fullWidth
                label="Add new project"
                error={newClientError}
                sx={{}}
              />

              <LoadingButton
                fullWidth
                type="submit"
                loading={loaderAddProject}
                loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
              >
                Add Project
              </LoadingButton>
            </form>
          )}
        </Box>
      </Paper>
      <Header
        clientsList={clientsList}
        currentClient={newClientValue}
        currentProject={newProjectValue}
        setcurrClient={changeClient}
        setCurrProjct={changeProject}
      />
    </Box>
    /* {open === true ? (
        <Snackbars
          sx={{ display: "none", position: "absolute", zIndex: -10000 }}
          message={"hello"}
          open={open}
          setOpen={(val) => {
            setOpen(val);
          }}
        />
      ) : (
        ""
      )} */
  );
}
