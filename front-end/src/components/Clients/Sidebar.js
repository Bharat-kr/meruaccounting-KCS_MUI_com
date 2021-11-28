/* eslint-disable consistent-return */
import React, { useContext, useRef, useEffect, useState } from 'react';
import { Grid, List, Paper, Autocomplete, Typography, Button, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { ClientsContext } from '../../contexts/ClientsContext';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function Sidebar() {
  const classes = useStyles();

  // state variable for input box to pass in as the new client value.
  const [newClientValue, setnewClientValue] = useState();
  const [newClientError, setnewClientError] = useState(false);

  // contexts
  const { clients, currentClient, changeClient, addClient } = useContext(ClientsContext);

  // labels for search box(autocomplete)
  const clientsList = clients.map((client) => client.name);

  // change currentclient on search
  const handleSearch = (e, value) => {
    const client = clients.filter((client) => (client.name === value ? client : ''));
    if (client.length === 0) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    return changeClient(client[0]);
  };

  // change currenclient on clients name click
  const handleClick = (e) => {
    const client = clients.filter((client) => (client.name === e.target.textContent ? client : ''));
    changeClient(client[0]);
  };

  // add client in submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setnewClientError(false);
    if (newClientValue === '') {
      setnewClientError(true);
    }
    const newClient = {
      name: newClientValue,
      members: [],
      id: clients.length + 1,
      projects: []
    };
    addClient(newClient);
    setnewClientValue('');
  };

  return (
    <Box
      component="div"
      sx={{
        margin: '10px',
        maxHeight: '70vh',
        height: '70vh'
      }}
    >
      <Paper
        component="div"
        elevation={3}
        sx={{
          overflow: 'hidden',
          height: '100%',
          position: 'relative'
        }}
      >
        {/* search box */}
        <Box
          sx={{
            width: '95%',
            '& .MuiTextField-root': { m: 1, mb: 2 }
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <Autocomplete
              onChange={handleSearch}
              disablePortal
              id="combo-box-demo"
              options={clientsList}
              renderInput={(params) => <TextField {...params} fullWidth label="Search client" />}
            />
          </div>
        </Box>

        {/* clients list flex container */}
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxHeight: '72%'
          }}
        >
          <TreeView
            fullWidth
            className={classes.root}
            sx={{ width: '100%', overflowY: 'auto', overflowX: 'visible' }}
          >
            {clients.map((client) => (
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
            boxSizing: 'border-box',
            width: '95%',
            position: 'absolute',
            bottom: '0',

            '& > :not(style)': { m: 1 }
          }}
        >
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
