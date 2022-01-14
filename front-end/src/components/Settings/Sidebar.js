/* eslint-disable consistent-return */
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SettingsMain from './SettingsMain';
import { convertString } from '../../contexts/UserContext';

function TabPanel(props) {
  const { children, value, index, heading, subheading, ...other } = props;

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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '750px',
    width: '100%',
    margin: 'auto',
    display: 'grid',
    gridTemplateColumns: '30% 70%',
    backgroundColor: '#fdfdff'
  }
}));

export default function Sidebar() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // let i = -1;
  // let j = -1;

  const effectiveArr = {
    ScreenShotPerHour:
      'How frequently screenshots will be taken .This number is an average since screenshots are taken at random intervals',
      AppsAndUrlTracking:
      'Track How frequent;y they were using KeyBoard and Mouse.',
      AppsAndUrlTracking:
      'Track what applications your team members use and what websites they visit.',
    WeeklyTimeLimit:
      'Number of hours your employees are allowed to work. The tracking will stop when the limit is reached.The time zone for the time limit is always UTC',
    AutoPause:
      'Tracking will automatically pause after the specified period of inactivity and will automatically resume when user becomes active again.',
    OfflineTime:
      'Allow user to add time not tracked by the program to their timeline manually. It is often used to account for work away from a computer.',
    NotifyUser:
      'Every time a screenshot is taken – a small notification will pop up for a couple of seconds next to the system tray saying that a Screenshot was taken.',
    WeekStart:
      'When does your week start? This will be used when showing totals for a week or setting weekly time limits.',
    CurrencySymbol:
      'The symbol (e.g. $, €, £) will be shown when you set hourly pay rates for your employees and everywhere where money is shown (like total amount spent today or on a specific project).',
  };

  return (
    <div className={classes.root}>
      {/* SIDEBAR */}
      <Box
        component="div"
        sx={{
          margin: '10px',
          maxHeight: '60vh',
          height: 'auto'
        }}
      >
        <Paper
          component="div"
          elevation={3}
          sx={{
            overflowY: 'auto',
            height: '100%',
            position: 'relative'
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            {Object.keys(effectiveArr).map((keyName, keyIndex) => (
              <Tab
                sx={{}}
                label={
                  <Typography
                    sx={{ textAlign: 'left', width: '100%', fontWeight: 'Bold' }}
                    variant="h6"
                  >
                    {convertString(keyName)}
                  </Typography>
                }
                {...a11yProps(keyIndex)}
              />
              // console.log(effectiveArr[keyName], keyIndex)
            ))}
            {/* <Tab label={effectiveArr[3].key} {...a11yProps(2)} />; //{' '}
            <Tab label={effectiveArr[4].key} {...a11yProps(3)} />; console.log(key); */}
          </Tabs>
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
            {Object.keys(effectiveArr).map((keyName, keyIndex) => (
              <SettingsMain
                value={value}
                index={keyIndex}
                heading={keyName}
                subheading={effectiveArr[keyName]}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
