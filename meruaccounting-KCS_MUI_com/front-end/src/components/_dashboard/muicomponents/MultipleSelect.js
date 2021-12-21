import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { OutlinedInput, Grid, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];
const clientNames = ['MeruAccounting', 'Microsoft', 'Google'];
const projectNames = ['Appdev', 'Research', 'Webdev'];
const groupNames = ['Group by Client', 'Group by Task', 'Group by Project'];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function MultipleSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [clients, setClients] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [group, setGroups] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    setClients(typeof value === 'string' ? value.split(',') : value);
    setProjects(typeof value === 'string' ? value.split(',') : value);
    setGroups(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 2, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Select Employee and Groups</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Select Employee and Groups" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Select Clinet</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={clients}
          onChange={handleChange}
          input={<OutlinedInput label="Select clients" />}
          MenuProps={MenuProps}
        >
          {clientNames.map((client) => (
            <MenuItem key={client} value={client} style={getStyles(client, clients, theme)}>
              {client}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Select Project</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={projects}
          onChange={handleChange}
          input={<OutlinedInput label="Select projects" />}
          multiple
          MenuProps={MenuProps}
        >
          {projectNames.map((project) => (
            <MenuItem key={project} value={project} style={getStyles(project, projects, theme)}>
              {project}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 2, width: 300 }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Note contains text" variant="outlined" />
        <FormControl sx={{ m: 2, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Group by</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={group}
            onChange={handleChange}
            input={<OutlinedInput label="Group by" />}
            multiple
            MenuProps={MenuProps}
          >
            {groupNames.map((group) => (
              <MenuItem key={group} value={group} style={getStyles(group, projects, theme)}>
                {group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
