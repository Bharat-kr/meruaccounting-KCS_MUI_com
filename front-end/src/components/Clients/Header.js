import React, { useContext, useState, useRef, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { ClientsContext } from "../../contexts/ClientsContext";
import { getClientPro, getClientProjects } from "../../api/clients api/clients";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#000",
    width: "50%",
    maxWidth: "fit-content",
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
  // to focus edit name of client
  // const {getClient,dispatchClientDetails}=useContext(ClientsContext)
  // getClient(dispatchClientDetails);

  const inputRef = useRef();
  const handleEditClick = (e) => {
    inputRef.current.focus();
  };

  const classes = useStyles();
  const {
    currentClient,
    updateClient,
    clientProjectDetails,
    dispatchClientProjectDetails,
  } = useContext(ClientsContext);
  const id = { clientId: currentClient._id };
  console.log(id);
  let projectList = [];
  useEffect(() => {
    // getClientPro(JSON.stringify(id));
    getClientProjects(id, dispatchClientProjectDetails);
  }, [currentClient]);
  if (
    clientProjectDetails.clientProjectDetails &&
    clientProjectDetails.loader === false
  ) {
    projectList = clientProjectDetails.clientProjectDetails.projects;
  }
  // Object.keys(clientProjectDetails).map((keyName, keyIndex) =>
  //   console.log(keyName, keyIndex)
  // );

  return currentClient === "" ? (
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
      <Paper
        component="div"
        elevation={3}
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          ml: 1,
          overflow: "visible",
          height: "100%",
        }}
      >
        <Box
          component="img"
          src="/svgs/client.svg"
          sx={{ width: 100, height: 70, backgroundColor: "white" }}
        />
        <Typography variant="h5">No Client Selected</Typography>
      </Paper>
    </Box>
  ) : (
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
                value={currentClient.name}
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
            <Typography sx={{}} variant="subtitle1">
              Assign Projects
            </Typography>
          </Box>

          <Box sx={{ m: 1 }}>
            <h2 style={{}}>Assigned Projects</h2>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                m: 1,
              }}
            >
              {projectList.map((project) => (
                <Typography variant="subtitle1" sx={{ width: 1 }}>
                  {project.name}
                  <span style={{ float: "right" }}>{project.rate} rs/hr</span>
                </Typography>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
