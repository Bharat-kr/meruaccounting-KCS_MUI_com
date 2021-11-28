import * as React from 'react';
import { useContext, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  styled,
  Paper,
  Link,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch
} from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import EdiText from 'react-editext';
import Snackbar from '../Snakbar';
import { UserContext, convertString } from '../../contexts/UserContext';
import { ClientsContext } from '../../contexts/ClientsContext';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

// const handleSwitchChange = (e, project, user) => {
//   if (project.Projectmembers.includes(user)) {
//     project.Projectmembers.splice(project.Projectmembers.indexOf(user), 1);
//     console.log(project.Projectmembers);
//     // changeProjectmembers(user);
//   }
// };
export default function Main(props) {
  const { value, index, ...other } = props;
  const { User } = useContext(UserContext);
  const { clients, changeProjectmembers } = useContext(ClientsContext);
  const [Checked, setChecked] = useState();
  const handleLabelChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const Labelconfig = function () {
    return (
      <>
        {clients.map((client) =>
          client.projects.map((pro) => (
            <FormControlLabel
              sx={{ display: 'block', pt: 1, fontWeight: 10 }}
              control={<Switch checked={pro.Projectmembers.includes(User[index].name)} />}
              // clients.projects.map((pro) => ))
              label={`${client.name}(${pro.name})`}
              // onChange={(e) => {
              //   handleSwitchChange(e, pro, User.name);
              // }}
            />
          ))
        )}
      </>
    );
  };

  return (
    <>
      {value === index && (
        <Container
          component="div"
          sx={{ border: 1, height: '100%', overflow: 'scroll' }}
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          <Typography sx={{ overflow: 'auto' }}>
            {' '}
            <Box sx={{ flexGrow: 1 }}>
              <Grid sx={{ display: 'flex', justifyContent: 'space-between' }} spacing={0}>
                <Grid xs={4}>
                  <Typography sx={{ fontSize: 40 }}>{User[index].name}</Typography>
                  <Divider />
                  <Typography variant="body1">{User[index].email}</Typography>
                  <Grid xs={8} sx={{ mt: 2 }}>
                    <Typography variant="h4">payrate</Typography>
                    <EdiText
                      type="number"
                      value="15"
                      onCancel={(v) => console.log('CANCELLED: ', v)}
                      onSave={(v) => console.log('Save')}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ padding: 1 }}>
                  <Link
                    data-key="1"
                    sx={{ padding: 1 }}
                    onClick={(e) => console.log(e.currentTarget.dataset.key)}
                  >
                    <PauseIcon sx={{ fontSize: 'small' }} />
                    Pause{' '}
                  </Link>
                  <Link sx={{ padding: 1 }}>
                    <DeleteIcon sx={{ fontSize: 'small' }} /> Delete
                  </Link>
                  <Link sx={{ padding: 1 }}>
                    <ArchiveIcon sx={{ fontSize: 'small' }} />
                    Archive
                  </Link>
                </Box>
              </Grid>
            </Box>
            <Box sx={{ mt: 2 }}>
              <FormControl component="fieldset" sx={{ pt: 2 }}>
                <Typography variant="h4">Role({User[index].role})</Typography>
                <RadioGroup
                  aria-label="Role"
                  defaultValue={User[index].role}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="Admin"
                    control={<Radio />}
                    label="Admin - full control over Team, Projects & Settings. Does not have access to owner's My Account page settings."
                  />
                  <FormControlLabel
                    value="Manager"
                    control={<Radio />}
                    label="Manager - can see selected user's Timeline & Reports (but not rates)"
                  />
                  <FormControlLabel
                    value="Employee"
                    control={<Radio />}
                    label="Employee - can see their own data only"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              <Typography variant="h5">Manage for</Typography>
              <Typography varinat="body2">
                If enabled, {User[index].name} will be able to see selected user's Timeline and
                Reports, but not rates.
              </Typography>
              <Typography varinat="h6">
                {User.map((user) => (
                  <FormControlLabel
                    sx={{ pt: 1, fontWeight: 10 }}
                    control={<Switch />}
                    label={user.name}
                  />
                ))}
              </Typography>
            </Box>
            <Box sx={{ pt: 2 }}>
              <Typography variant="h5">Projects</Typography>
              <Link sx={{ pr: 1 }}>Add all</Link>
              <Link sx={{ pl: 1 }}>Remove all</Link>
              <Container sx={{ display: 'block' }}>{Labelconfig()}</Container>
            </Box>
            <Box sx={{ pt: 2, fontSize: '20px' }}>
              <Typography variant="h4">Effective Settings</Typography>
              {Object.keys(User[index].Settings).map((keyName, keyIndex) => (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'rows' }}>
                    <Typography varihant="h6" sx={{ pr: 2, fontSize: '20px', color: 'success' }}>
                      {convertString(keyName)}
                      {/* {console.log(index)} */}
                    </Typography>
                    <RouterLink to="/dashboard/settings" sx={{ pr: 1 }}>
                      {User[index].Settings[keyName] === true
                        ? 'On'
                        : User[index].Settings[keyName]}
                    </RouterLink>
                  </Box>
                </>
              ))}
            </Box>
          </Typography>
        </Container>
      )}
    </>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};
