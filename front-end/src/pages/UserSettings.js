// import './UserDetails.css';
import {
  CssBaseline,
  Box,
  Typography,
  Divider,
  Paper,
  TextField,
  FormControl,
  Autocomplete,
  Button
} from '@mui/material';
import PageHeader from '../components/PageHeader';

import Page from '../components/Page';

export default function UserDetails() {
  return (
    <>
      <CssBaseline />
      <Page title="usersettings">
        <Box component="div" sx={{ width: '95%', margin: 'auto' }}>
          <PageHeader title="User Settings" />
          <Paper elevation="3" maxWidth="lg" sx={{ p: 1 }}>
            <Typography variant="h4">Profile Settings</Typography>
            <Divider />
            <FormControl sx={{ m: 1 }}>
              <TextField
                sx={{ mt: 3 }}
                required
                id="filled-required"
                label="Name"
                defaultValue="Name"
              />
              <TextField
                sx={{ mt: 3 }}
                required
                id="filled-required"
                label="email"
                defaultValue="Email"
              />
              <TextField
                sx={{ mt: 3 }}
                required
                id="filled-required"
                label="company"
                defaultValue="Company"
              />
              <Autocomplete
                disablePortal
                id="TimeZone"
                options={['IST', 'UTC', 'LST']}
                sx={{ width: 300, mt: 3 }}
                defaultValue="IST"
                renderInput={(params) => <TextField {...params} label="Time-Zone" />}
              />
              <Autocomplete
                disablePortal
                id="dateFormat"
                options={['day/month/year', 'month/day/year']}
                sx={{ width: 300, mt: 3 }}
                defaultValue="day/month/year"
                renderInput={(params) => <TextField {...params} label="Date-Format" />}
              />
              <Autocomplete
                disablePortal
                id="country"
                options={['India', 'Others']}
                sx={{ width: 300, mt: 3 }}
                defaultValue="India"
                renderInput={(params) => <TextField {...params} label="Country" />}
              />
              <Button variant="contained" sx={{ mt: 3, width: 150 }}>
                Save
              </Button>
            </FormControl>
          </Paper>
        </Box>
      </Page>
    </>
  );
}
