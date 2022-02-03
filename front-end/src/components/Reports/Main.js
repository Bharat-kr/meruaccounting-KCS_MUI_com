import * as React from "react";
import PropTypes from "prop-types";
import { Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DatePicker from "./DatePicker";
import SelectEmployees from "./SelectEmployees";
import SelectProjects from "./SelectProjects";
import SelectClients from "./SelectClients";

// contexts and apis
import { teamContext } from "../../contexts/TeamsContext";
import { ClientsContext } from "../../contexts/ClientsContext";

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
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//////////////////////////panelllllll
export default function Main() {
  // tab panels value
  const [value, setValue] = React.useState(0);
  //
  const { getTeams } = React.useContext(teamContext);
  //
  const { clientDetails } = React.useContext(ClientsContext);

  // variable for date, employees, and projects
  const [date, setdate] = React.useState([]);
  const [employeeOptions, setemployeeOptions] = React.useState([]);
  const [projectOptions, setprojectOptions] = React.useState([]);
  const [clientOptions, setclientOptions] = React.useState([]);
  const [employees, setemployees] = React.useState([]);
  const [projects, setprojects] = React.useState([]);
  const [clients, setclients] = React.useState([]);

  // tab panels value
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   make select employee options
  console.log(getTeams.getTeam);
  React.useEffect(() => {
    getTeams.getTeam.map((team) => {
      team.members.map((member) => {
        let newOption = {
          _id: member._id,
          name: `${member.firstName} ${member.lastName}`,
        };
        let index = employeeOptions.findIndex((x) => x._id === member._id);
        index === -1
          ? setemployeeOptions((prev) => [...prev, newOption])
          : console.log("object already exists");
      });
    });
  });

  // this will return a true false value to push it or not
  // function empPro(newObject) {
  //   if (employees.length !== 0 || projects.length !== 0) {
  //     // another if
  //     if (employees.length !== 0 && projects.length === 0) {
  //     }
  //   } else {
  //     // normal
  //   }
  // }

  //   make select project options
  React.useEffect(() => {
    if (clientDetails.loader === false) {
      clientDetails.client.data.map((client) => {
        client.projects.map((project) => {
          let newOption = {
            _id: project._id,
            name: project.name,
          };
          let index = projectOptions.findIndex((x) => x._id === project._id);
          index === -1
            ? setprojectOptions((prev) => [...prev, newOption])
            : console.log("object already exists");
        });
      });
    } else return;
  }, [clientDetails, projects, employees]);

  //   make select client options
  console.log(clientDetails.client.data);
  React.useEffect(() => {
    if (clientDetails.loader === false) {
      clientDetails.client.data.map((client) => {
        let newOption = {
          _id: client._id,
          name: client.name,
        };
        // if(employees.length === 0 && projects.length === 0 ){
        // let index = clientOptions.findIndex((x) => x._id === client._id)
        //  }
        // else if(employees.length !== 0 && projects.length === 0 )
        // else if(employees.length === 0 && projects.length !== 0 )
        // else
        let index = clientOptions.findIndex((x) => x._id === client._id);
        index === -1
          ? setclientOptions((prev) => [...prev, newOption])
          : console.log("object already exists");
      });
    } else return;
  }, [clientDetails, projects, employees, clients]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
          <Tab label="Weekly Report" {...a11yProps(2)} />
          <Tab label="Saved Report" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DatePicker
          setDate={(newValue) => {
            setdate(newValue);
          }}
        />
        <SelectEmployees
          options={employeeOptions}
          setEmployees={(newValue) => {
            setemployees(newValue);
          }}
        />
        <SelectProjects
          options={projectOptions}
          setProjects={(newValue) => {
            setprojects(newValue);
          }}
        />
        <SelectClients
          options={clientOptions}
          setClients={(newValue) => {
            setclients(newValue);
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        hello
      </TabPanel>
      <TabPanel value={value} index={2}>
        {" "}
        hello
      </TabPanel>
      <TabPanel value={value} index={3}>
        {" "}
        hello
      </TabPanel>
    </Box>
  );
}
