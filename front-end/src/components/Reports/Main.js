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
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Graphs from "./Graphs";

// contexts and apis
import { teamContext } from "../../contexts/TeamsContext";
import { ClientsContext } from "../../contexts/ClientsContext";
import { reportsContext } from "../../contexts/ReportsContext";
import {
  getReportsByUser,
  getReportsClient,
  getReportsProject,
  getReports,
} from "../../api/reports api/reports";

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
  //
  const { reports, dispatchGetReports } = React.useContext(reportsContext);

  // variable for date, employees, and projects
  const [date, setdate] = React.useState(null);
  const [employeeOptions, setemployeeOptions] = React.useState([]);
  const [projectOptions, setprojectOptions] = React.useState([]);
  const [clientOptions, setclientOptions] = React.useState([]);
  const [employees, setemployees] = React.useState(null);
  const [projects, setprojects] = React.useState(null);
  const [clients, setclients] = React.useState(null);

  // tab panels value
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleReportClick = async () => {
    const dateOne = date ? date[0].format("DD/MM/YYYY") : null;
    const dateTwo = date ? date[1].format("DD/MM/YYYY") : null;
    const userId = employees ? employees._id : null;
    const projectId = projects ? projects._id : null;
    const clientId = clients ? clients._id : null;
    const options = {
      clientId,
      projectId,
      userId,
      dateOne,
      dateTwo,
    };
    //   getReportsByUser,
    // getReportsClient,
    // getReportsProject,
    // getReports,
    // dispatchGetReports
    getReports(dispatchGetReports, options);
    console.log(reports);
  };

  React.useEffect(() => {
    console.log(reports);
  }, [reports]);

  //   make select employee options
  console.log(getTeams.getTeam);
  React.useEffect(() => {
    let array = [];
    if (clients) {
      array = [];
      clientDetails.client.data.map((client) => {
        // const found = clients.some((el) => el._id === client._id);
        const found = clients._id === client._id;
        if (found) {
          client.projects.map((project) => {
            project.employees.map((employee) => {
              let newOption = {
                _id: employee._id,
                name: `${employee.firstName} ${employee.lastName}`,
              };
              let exists = array.some((el) => el._id === newOption._id);
              if (!exists) {
                array.push(newOption);
              }
            });
          });
          console.log(array);
          setemployeeOptions([...array]);
        } else return;
      });
    } else if (projects && !clients) {
      clientDetails.client.data.map((client) => {
        client.projects.map((project) => {
          // const found = projects.some((el) => el._id === project._id);
          const found = projects._id === project._id;
          if (found) {
            project.employees.map((employee) => {
              let newOption = {
                _id: employee._id,
                name: `${employee.firstName} ${employee.lastName}`,
              };
              let exists = array.some((el) => el._id === newOption._id);
              if (!exists) {
                array.push(newOption);
              }
            });
          } else return;
        });
        console.log(array);
        setemployeeOptions([...array]);
      });
    } else {
      console.log("no client selected");
      getTeams.getTeam.map((team) => {
        team.members.map((member) => {
          let newOption = {
            _id: member._id,
            name: `${member.firstName} ${member.lastName}`,
          };
          let exists = array.some((el) => el._id === newOption._id);
          if (!exists) {
            array.push(newOption);
          }
        });
        console.log(array);
        setemployeeOptions((prev) => [...array]);
      });
    }
  }, [getTeams, clients, projects]);

  console.log(clientDetails.client.data);
  //   make select project options
  React.useEffect(() => {
    let array = [];
    if (clients) {
      array = [];
      console.log("clients selected");
      clientDetails.client.data.map((client) => {
        client.projects.map((project) => {
          // const found = clients.some((el) => el._id === client._id);
          const found = clients._id === client._id;
          if (found) {
            project.employees.map((employee) => {
              let newOption = {
                _id: project._id,
                name: project.name,
              };
              let exists = array.some((el) => el._id === newOption._id);
              if (!exists) {
                array.push(newOption);
              }
            });
          } else return;
        });
        console.log(array);
        setprojectOptions([...array]);
      });
    } else {
      if (clientDetails.loader === false) {
        clientDetails.client.data.map((client) => {
          client.projects.map((project) => {
            let newOption = {
              _id: project._id,
              name: project.name,
            };
            let exists = array.some((el) => el._id === newOption._id);
            if (!exists) {
              array.push(newOption);
            }
          });
          setprojectOptions((prev) => [...array]);
        });
      } else return;
    }
  }, [clientDetails, clients, employees]);

  //   make select client options
  console.log(clientDetails.client.data);
  React.useEffect(() => {
    if (clientDetails.loader === false) {
      clientDetails.client.data.map((client) => {
        let newOption = {
          _id: client._id,
          name: client.name,
        };
        let index = clientOptions.findIndex((x) => x._id === client._id);
        if (index === -1) setclientOptions((prev) => [...prev, newOption]);
      });
    } else return;
  }, [clientDetails, projects, employees]);

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
        <Button
          onClick={handleReportClick}
          variant="contained"
          endIcon={<SendIcon />}
        >
          generate Reports
        </Button>
        {/* {!reports.loader ? <div>hello</div> : null} */}
        {!reports.loader ? (
          <Graphs reports={reports} style={{ margin: 10 }}></Graphs>
        ) : null}
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
