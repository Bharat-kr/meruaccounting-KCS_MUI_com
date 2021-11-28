import * as React from 'react';
import { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Box, styled, OutlinedInput, TextField, Autocomplete } from '@mui/material';
import Main from './Main';
import { UserContext } from '../../contexts/UserContext';
import { ClientsContext } from '../../contexts/ClientsContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const { clients, changeClient } = useContext(ClientsContext);
  const { User } = useContext(UserContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearch = (e, value) => {
    const client = clients.filter((client) => (client.name === value ? client : ''));
    if (client.length === 0) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    return changeClient(client[0]);
  };
  const UsersList = [];
  clients.forEach((client) => {
    // eslint-disable-next-line prefer-template
    User.map((User) => UsersList.push(User.name));
  });
  return (
    <Box
      sx={{
        maxHeight: '70vh',
        height: '70vh',
        width: '100%',
        // margin: 'auto',
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        backgroundColor: '#fdfdff'
      }}
    >
      <Box>
        <div>
          <Autocomplete
            onChange={handleSearch}
            disablePortal
            id="combo-box-demo"
            options={UsersList}
            renderInput={(params) => <TextField {...params} fullWidth label="Search members" />}
          />
        </div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: 'divider', display: 'block', width: '100%' }}
        >
          {User.map((user) => (
            <Tab
              selectionFollowsFocus="true"
              label={
                <Typography
                  sx={{ textAlign: 'left', width: '100%', fontWeight: 'Bold' }}
                  variant="h6"
                >
                  {user.name}{' '}
                </Typography>
              }
              {...a11yProps(`${User.indexOf(user) + 1}`)}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        {User.map((user) => (
          <Main value={value} index={User.indexOf(user)} sx={{ overflow: 'hidden' }} />
        ))}
      </Box>
    </Box>
  );
}
