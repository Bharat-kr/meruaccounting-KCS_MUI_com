/* eslint-disable consistent-return */
import React, { useContext, useRef, useEffect, useState } from 'react';
import {
  Grid,
  List,
  Paper,
  Autocomplete,
  TextField,
  Typography,
  Button,
  Divider,
  Container,
  Radio,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  RadioGroup,
  Switch
} from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { ClientsContext } from '../../contexts/ClientsContext';
import { UserContext } from '../../contexts/UserContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function checkheading(index) {
  const days = ['Sun', 'Mon'];

  if (index === 0) {
    return (
      <>
        <FormControlLabel value="Take" control={<Radio />} label="Take" />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={days}
          sx={{ width: 240, margin: '2px 10px 2px 10px' }}
          renderInput={(params) => (
            <TextField {...params} label={`Screenshot per hour  :  ${12}`} />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={['Allow Blur', 'Blur All', 'Disallow']}
          sx={{ width: 240, margin: '2px 10px 2px 10px' }}
          renderInput={(params) => <TextField {...params} label="Allow blur" />}
        />
        <FormControlLabel value="Do not Take" control={<Radio />} label="Do not take" />
      </>
    );
  }
  if (index === 1 || index === 2) {
    return (
      <>
        <FormControlLabel value="Track" control={<Radio />} label="Track" />
        <FormControlLabel value="Do not track" control={<Radio />} label="Do not track" />
      </>
    );
  }
  if (index === 3) {
    return (
      <>
        <FormControlLabel value="Limit" control={<Radio />} label="Limit" />

        <TextField
          sx={{ m: 1.5 }}
          id="outlined-number"
          label="Hours per week"
          type="number"
          defaultValue="100"
          InputLabelProps={{
            shrink: true
          }}
        />

        <FormControlLabel value="Do not limit" control={<Radio />} label="Do not limit" />
      </>
    );
  }
  if (index === 4) {
    return (
      <>
        <FormControlLabel value="Pause" control={<Radio />} label="Pause after" />
        <TextField
          sx={{ m: 1.5 }}
          id="outlined-number"
          label="Time limit"
          type="number"
          defaultValue="100"
          InputLabelProps={{
            shrink: true
          }}
        />{' '}
        <Typography sx={{ mt: 3, mr: 2, fontSize: '20px' }}> minutes of user activity</Typography>
        <FormControlLabel value="Do not pause" control={<Radio />} label="Do not pause" />
      </>
    );
  }
  if (index === 5) {
    return (
      <>
        <FormControlLabel value="Allow" control={<Radio />} label="Allow" />
        <FormControlLabel value="Disallow" control={<Radio />} label="Disallow" />
      </>
    );
  }
  if (index === 6) {
    return (
      <>
        <FormControlLabel value="Notify" control={<Radio />} label="Notify" />
        <FormControlLabel value="Do not notify" control={<Radio />} label="Do not notify" />
      </>
    );
  }
  if (index === 7) {
    return (
      <>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={days}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={days[0]} />}
        />
      </>
    );
  }
  if (index === 8) {
    return (
      <>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={days}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={days[0]} />}
        />
      </>
    );
  }
}

function userChange(user) {
  return <>Hello{user}</>;
}

export default function SettingsMain(props) {
  const { value, index, heading, subheading, ...other } = props;
  const { User } = useContext(UserContext);
  const { clients } = useContext(ClientsContext);
  const effectiveArr = [
    'Screenshot,Activity Level tracking',
    'Apps & Urls tracking',
    'Weekly time limit after',
    'Auto-pause tracking after',
    'Allow adding Offline time',
    'Notify when Screenshot is taken',
    'Week starts on',
    'Currency symbol',
    'Employee desktop application settings'
  ];
  const test = false;
  return (
    <>
      {value === index && (
        <Container
          component="div"
          sx={{}}
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          <Typography variant="h3">{heading}</Typography>
          <Divider />
          <Box sx={{ height: '60px', width: '100%', bgcolor: '#bdf2bf' }}>{subheading}</Box>
          <Box>
            {/* <FormLabel component="legend">Gender</FormLabel> */}

            <FormControl component="fieldset">
              <RadioGroup row aria-label="option" name="row-radio-buttons-group">
                {checkheading(index)}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography varinat="h3" sx={{ fontWeight: 'bold' }}>
              Individual Settings
            </Typography>
            <Typography>
              If enabled, individual settings will be used instead of the team Settings
            </Typography>
            <Box>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={User.map((user) => user.name)}
                sx={{ width: 300, mt: 4 }}
                renderInput={(params) => <TextField {...params} label="User" />}
              />
              {User.map((user) => (
                <FormGroup>
                  <FormControlLabel
                    control={<Switch />}
                    label={user.name}
                    onChange={userChange(user.name)}
                  />
                  {/* {userChange()} */}
                  {test && <div>hello</div>}
                </FormGroup>
              ))}
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
