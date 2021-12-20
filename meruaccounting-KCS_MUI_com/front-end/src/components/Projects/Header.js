import React, { useContext, useState, useRef } from 'react';
import { Paper, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { ClientsContext } from '../../contexts/ClientsContext';

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#000',
    width: 'fit-content',
    maxWidth: '50%',
    wordWrap: 'break-word',
    height: '30px',
    fontSize: '30px',
    fontWeight: 'bold',
    border: 'none',
    background: '#fff',
    transition: 'width 0.4s ease-in-out',
    '& :focus': { width: '100%' }
  }
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
  const { clients, currentClient, currentProject, changeProject, updateClient } =
    useContext(ClientsContext);

  const handleSwitchChange = (e, client, project, member) => {
    const newClient = client;

    const index = newClient.projects.indexOf(currentProject);
    const members = newClient.projects[index].Projectmembers;
    if (members.includes(member)) {
      newClient.projects[index].Projectmembers.splice(members.indexOf(member), 1);
      updateClient(newClient, clients.indexOf(currentClient));
    } else {
      newClient.projects[index].Projectmembers.push(member);
      updateClient(newClient, clients.indexOf(currentClient));
    }
    console.log('hello');
  };

  return (
    <>
      <Box component="div" sx={{ margin: '10px 10px 10px 0' }}>
        {/* grid container 40 60 */}
        <Paper
          component="div"
          elevation={3}
          sx={{
            overflow: 'visible',
            height: '100%',
            position: 'relative',
            display: 'grid',
            gridTemplateRows: '30% 70%'
          }}
        >
          <Box sx={{ m: 1 }}>
            <h1 style={{ backgroundColor: '#fff' }}>
              <input
                type="text"
                ref={inputRef}
                className={classes.input}
                value={currentProject.name}
              />
              <div
                style={{
                  float: 'right'
                }}
              >
                <button type="button" style={{ marginRight: '5px' }} onClick={handleEditClick}>
                  <EditIcon />
                </button>
                <button type="button" style={{}}>
                  <DeleteIcon />
                </button>
              </div>
            </h1>
            <Typography sx={{}} variant="subtitle1">
              {currentClient.name}
            </Typography>
          </Box>

          <Box sx={{ m: 1 }}>
            <h2 style={{}}>Assignees</h2>
            <Typography sx={{ display: 'inline', m: 2, ml: 0 }} variant="subtitle2">
              {' '}
              Add all{' '}
            </Typography>
            <Typography sx={{ display: 'inline', m: 2 }} variant="subtitle2">
              {' '}
              Remove all{' '}
            </Typography>
            <Divider />
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                m: 1
              }}
            >
              <FormControl component="fieldset" variant="standard">
                {/* <FormLabel component="legend">Assignees</FormLabel> */}
                <FormGroup>
                  {currentClient.Clientmembers.map((member) => (
                    <FormControlLabel
                      checked={currentProject.Projectmembers.includes(member)}
                      onChange={(e) => {
                        handleSwitchChange(e, currentClient, currentProject, member);
                      }}
                      control={<Switch name={member} />}
                      label={member}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
