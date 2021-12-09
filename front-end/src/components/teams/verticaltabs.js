import * as React from 'react';
import { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Box, Paper, styled, OutlinedInput, TextField, Autocomplete, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { RestaurantRounded } from '@material-ui/icons';
import Main from './Main';
import { UserContext } from '../../contexts/UserContext';
import { ClientsContext } from '../../contexts/ClientsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '700px',
    width: '100%',
    margin: 'auto',
    display: 'grid',
    gridTemplateColumns: '30% 70%',
    backgroundColor: '#fdfdff'
  }
}));

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
  const classes = useStyles();
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

  const handleSubmit = () => {
    RestaurantRounded(console.log('hello'));
  };
  const UsersList = [];
  clients.forEach((client) => {
    // eslint-disable-next-line prefer-template
    User.map((User) => UsersList.push(User.name));
  });
  return (
    <div className={classes.root}>
      <Box
        component="div"
        sx={{
          margin: '10px',
          // maxHeight: '70vh',
          height: 'auto'
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
          <Autocomplete
            onChange={handleSearch}
            disablePortal
            id="combo-box-demo"
            options={UsersList}
            renderInput={(params) => <TextField {...params} fullWidth label="Search members" />}
          />
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
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
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              // onChange={(e) => setnewClientValue(e.target.value)}
              required
              fullWidth
              label="Add new client"
              // error={newClientError}
              sx={{ mb: 1 }}
            />

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1 }}>
              Submit
            </Button>
          </form>
        </Paper>
      </Box>

      {/* HEADER */}
      <Box component="div" sx={{ margin: '10px 10px 10px 0', overflow: 'auto' }}>
        {/* grid container 40 60 */}
        <Paper
          component="div"
          elevation={3}
          sx={{
            overflow: 'visible',

            position: 'relative'
            // display: 'grid',
            // gridTemplateRows: '30% 70%'
          }}
        >
          <Box>
            {User.map((user) => (
              <Main value={value} index={User.indexOf(user)} sx={{ overflow: 'hidden' }} />
            ))}
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
