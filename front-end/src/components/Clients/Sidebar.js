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
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { ClientsContext } from "../../contexts/ClientsContext";
import { addClient, getClient } from "../../api/clients api/clients";
//----------------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function Sidebar() {
  const classes = useStyles();
  // const { } = useContext(ClientsContext);
  // state variable for input box to pass in as the new client value.
  const [newClientValue, setnewClientValue] = useState();
  const [newClientError, setnewClientError] = useState(false);

  // contexts
  const {
    clients,
    currentClient,
    changeClient,
    dispatchAddClient,
    // addClient,
    client,
    clientDetails,
    dispatchClientDetails,
  } = useContext(ClientsContext);

  useEffect(() => {
    getClient(dispatchClientDetails);
  }, [dispatchClientDetails]);

  // labels for search box(autocomplete)
  // const clientsList = clients.map((client) => client.name);

  let clientsList = [];
  if (clientDetails.loader === false) {
    clientsList = clientDetails.client.data;
  }

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

  // change currenclient on clients name click
  const handleClick = (e) => {
    const client = clientsList.filter((client) =>
      client.name === e.target.textContent ? client : ""
    );
    changeClient(client[0]);
  };

  // add client in submit
  // not working properly , add proper validation Dr. Kamal Singh
  const handleSubmit = (e) => {
    e.preventDefault();
    setnewClientError(false);
    if (newClientValue !== "") {
      // addClient({ name: newClientValue }, dispatchAddClient);
      setnewClientValue("");
    } else {
      setnewClientError(true);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        margin: "10px",
        height: "auto",
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
          sx={{
            width: "95%",
            "& .MuiTextField-root": { m: 1, mb: 2 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <Autocomplete
              onChange={handleSearch}
              disablePortal
              id="combo-box-demo"
              options={clientsList.map((client) => client.name)}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Search client" />
              )}
            />
          </div>
        </Box>

        {/* clients list flex container */}
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flexGrow:"1",
            overflowY:"auto"
          }}
        >
          <TreeView
            fullWidth
            // className={classes.root}
            sx={{ width: "100%"}}
          >
            {clientsList.map((client) => (
              <TreeItem
                onClick={handleClick}
                nodeId={clients.indexOf(client) + 1}
                className={classes.treeItem}
                label={<Typography variant="h4">{client.name}</Typography>}
              >
                <Divider variant="fullWidth" light={false} />
              </TreeItem>
            ))}
          </TreeView>
        </Box>

        {/* INPUT BOX, add validations, connect to context */}
        <Box
          sx={{
            boxSizing: "border-box",
            width: "95%",
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
