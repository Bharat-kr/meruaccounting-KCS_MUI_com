/* eslint-disable consistent-return */
import React, { useContext, useRef, useEffect, useState } from 'react';
import { Grid, List, Paper, Autocomplete, Typography, Button, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TreeItem } from '@mui/lab';
import { ClientsContext } from '../../contexts/ClientsContext';
import Treeview from '../Treeview';
import SearchBar from '../SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function Sidebar() {
  const classes = useStyles();

  // state variable for input box to pass in as the new client value.
  const [newClientValue, setnewClientValue] = useState();
  const [newClientError, setnewClientError] = useState(false);

  // contexts
  const { clients, currentClient, changeClient, addClient, currentProject, changeProject } =
    useContext(ClientsContext);

  // labels for search box(autocomplete)
  const projectsList = [];
  clients.forEach((client) => {
    // eslint-disable-next-line prefer-template
    client.projects.map((project) => projectsList.push(client.name + ':' + project.name));
  });

  // change currentclient on search
  const handleSearch = (e, value) => {
    const client = clients.filter((client) => (client.name === value ? client : ''));
    if (client.length === 0) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    return changeClient(client[0]);
  };

  // change currenclient on projects name click
  const handleClick = (e) => {
    const client = clients.filter((client) =>
      client.name === e.target.dataset.client ? client : ''
    );
    changeClient(client[0]);
    const project = client[0].projects.filter((project) =>
      project.name === e.target.textContent ? project : ''
    );

    changeProject(project[0]);
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
        <SearchBar handleSearch={handleSearch} label="Search Project" options={projectsList} />

        {/* clients and project tree view flex container */}
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          {clients.map((client) => (
            <Treeview parentName={client.name}>
              {client.projects.map((project) => (
                <TreeItem
                  nodeId={1 + client.projects.indexOf(project) + 1}
                  label={
                    <Typography data-client={client.name} onClick={handleClick} variant="h5">
                      {project.name}
                    </Typography>
                  }
                />
              ))}
            </Treeview>
          ))}
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
