import React, { useContext, useState, useRef } from 'react';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { ClientsContext } from '../../contexts/ClientsContext';

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#000',
    width: '50%',
    maxWidth: 'fit-content',
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
  // to focus edit name of client
  const inputRef = useRef();
  const handleEditClick = (e) => {
    inputRef.current.focus();
  };

  const classes = useStyles();
  const { currentClient } = useContext(ClientsContext);

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
                value={currentClient.name}
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
              Assign Projects
            </Typography>
          </Box>

          <Box sx={{ m: 1 }}>
            <h2 style={{}}>Assigned Projects</h2>
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
              {currentClient.projects.map((project) => (
                <Typography variant="subtitle1" sx={{ width: 1 }}>
                  {project.name}
                  <span style={{ float: 'right' }}>{project.rate} rs/hr</span>
                </Typography>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
