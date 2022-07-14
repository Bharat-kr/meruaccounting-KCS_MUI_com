import React, { useContext, useState, useRef, useEffect } from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { ClientsContext } from "../../contexts/ClientsContext";
import EnhancedTable from "./projectList";
import {
  deleteClient,
  editClient,
  getClient,
} from "../../api/clients api/clients";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { useSnackbar } from "notistack";
import Confirmation from "../Confirmation";

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
export default function Header(props) {
  const {
    // currentClient, \
    // clientsList,
    ...others
  } = props;
  // to focus edit name of client
  // getClient(dispatchClientDetails);
  const [clientName, setClientName] = useState("");
  const outerref = useRef();
  const inputRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const handleEditClick = (e) => {
    inputRef.current.focus();
  };

  const classes = useStyles();
  const {
    currentClient,
    changeClient,
    dispatchDeleteClient,
    dispatchEditClient,
    dispatchClientDetails,
    deletedClient,
    clientDetails,
    clientsList,
  } = useContext(ClientsContext);
  let projectList = [];
  useEffect(async () => {
    // getClientPro(JSON.stringify(id));
    setClientName(currentClient?.name);
  }, [currentClient]);
  const clientIndex = clientsList?.findIndex(
    (i) => i._id === currentClient?._id
  );

  useEffect(async () => {
    if (clientsList !== null) {
      await changeClient(clientsList[clientIndex]);
      // await changeProject(clientsList[clientIndex]?.projects[projectIndex]);
    }
  }, [clientDetails]);
  if (clientDetails?.loader === false) {
    projectList = currentClient?.projects;
  }
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (clientName !== "") {
        const data = [currentClient._id, { name: clientName }];
        const res = await editClient(data, dispatchEditClient);
        await getClient(dispatchClientDetails);
        if (!res.data) {
          throw new Error(res);
        }
        enqueueSnackbar("Client edited", { variant: "success" });
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: "info" });
    }
  };

  const handleDeleteClient = async (e) => {
    try {
      const data = currentClient._id;
      const clientIndex = clientsList.findIndex(
        (i) => i._id === currentClient._id
      );
      const lastIn = clientsList.indexOf(clientsList.slice(-1)[0])
        ? clientsList.indexOf(clientsList.slice(-1)[0])
        : 0;
      await deleteClient(data, dispatchDeleteClient);
      await getClient(dispatchClientDetails);
      if (clientIndex === lastIn) {
        changeClient(clientsList[lastIn - 1]);
      } else {
        changeClient(clientsList[clientIndex + 1]);
      }
      // enqueueSnackbar("Client removed ", { variant: "success" });
    } catch (err) {
      console.log(err);
      // enqueueSnackbar(err.message, { variant: "info" });
    }
    enqueueSnackbar(
      deletedClient.error ? deletedClient.error : "Client removed ",
      {
        variant: deletedClient.error ? "info" : "success",
      }
    );
  };
  const createdOn = moment(currentClient?.createdAt).format("DD-MM-YYYY");

  //confirmation modal
  const [ConfirmModal, setConfirmModal] = React.useState(false);

  //handle modal open
  const handleOpen = () => {
    setConfirmModal(true);
  };

  //handle modal close
  const handleClose = () => {
    setConfirmModal(false);
  };

  return currentClient === undefined || "" ? (
    <Box
      component="div"
      sx={{
        width: "70%",
        flexGrow: "1",
        overflow: "auto",
        // margin: "10px 10px 10px 10px",
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
          // ml: 2,
          overflow: "auto",
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
      {/* grid container 40 60 */}
      <Box
        ref={outerref}
        component="div"
        sx={{
          width: "70%",
          flexGrow: "1",
          overflow: "auto",
          m: 1,
        }}
      >
        <Paper
          component="div"
          elevation={3}
          sx={{
            zIndex: 1,
            overflow: "visible",
            height: "100%",
            position: "relative",
            display: "grid",
            gridTemplateRows: "30% 70%",
          }}
        >
          <Box sx={{ m: 1 }}>
            <h1 style={{ backgroundColor: "#fff" }}>
              <form onSubmit={handleEditSubmit} style={{ display: "inline" }}>
                <input
                  ref={inputRef}
                  onChange={(e) => setClientName(e.target.value)}
                  type="text"
                  className={classes.input}
                  value={clientName}
                />
              </form>
              <div
                style={{
                  float: "right",
                }}
              >
                <IconButton>
                  <EditIcon onClick={handleEditClick} />
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={handleOpen} />
                </IconButton>
              </div>
            </h1>
            <Typography sx={{}} variant="subtitle1">
              <RouterLink
                to="/dashboard/projects"
                style={{
                  textDecoration: "none",
                  color: "green",
                  fontWeight: "bold",
                }}
                onClick={changeClient(clientsList[clientIndex])}
              >
                Assign Projects
              </RouterLink>
            </Typography>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mb: 5,
                pb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  Created on : {createdOn ? createdOn : ""}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  variant="body1"
                ></Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  Created By :{" "}
                  {`${currentClient?.createdBy?.firstName} ${currentClient?.createdBy?.lastName}`}
                </Typography>
                <Typography variant="body1"></Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
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
              {currentClient?.projects?.length === 0 ? (
                <Box>
                  <Typography variant="h5">
                    No Projects in this Client
                  </Typography>
                  <RouterLink
                    to="/dashboard/projects"
                    style={{
                      textDecoration: "none",
                      color: "green",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      {
                      }
                      changeClient(clientsList[clientIndex]);
                    }}
                  >
                    Add Project
                  </RouterLink>
                </Box>
              ) : (
                <EnhancedTable outerref={outerref} />
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
      <Confirmation
        open={ConfirmModal}
        handleClose={handleClose}
        onConfirm={handleDeleteClient}
        detail={{ type: "Client", name: currentClient.name }}
      />
    </>
  );
}
