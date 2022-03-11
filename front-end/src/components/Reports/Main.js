import * as React from "react";
import PropTypes from "prop-types";
import { Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DatePicker from "./DatePicker";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
// components
import Graphs from "./Graphs";
import SelectEmployees from "./SelectEmployees";
import SelectProjects from "./SelectProjects";
import SelectClients from "./SelectClients";
import SelectGroup from "./SelectGroup";
import SaveReport from "./SaveReport";

// contexts and apis
import { teamContext } from "../../contexts/TeamsContext";
import { ClientsContext } from "../../contexts/ClientsContext";
import { reportsContext } from "../../contexts/ReportsContext";
import { getReports } from "../../api/reports api/reports";

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
  const [employees, setemployees] = React.useState([]);
  const [projects, setprojects] = React.useState([]);
  const [clients, setclients] = React.useState([]);
  const [group, setgroup] = React.useState([
    { label: "Group by project", value: "P" },
    { label: "Group by employee", value: "E" },
  ]);
  const [saveReportsOptions, setSaveReportOptions] = React.useState();
  const componentMounted = React.useRef(true); // (3) component is mounted

  // ////////////////////////////////
  const [ans, setAns] = React.useState([]);

  const getAns = async () => {
    const { data } = await axios.post("/report/options");
    console.log(data.employeeOptions[0]);
    console.log([1, 2]);
    setAns(data.employeeOptions[0].members);
  };

  React.useEffect(() => {
    getAns();
  }, []);
  // ////////////////////////////////

  // React.useEffect(async () => {
  //   const { data } = await axios.post("/report/options");
  //   if (componentMounted.current) {
  //     // setemployeeOptions(data?.employeeOptions?.members);
  //   }
  //   return () => {
  //     componentMounted.current = false; // This worked for me
  //   };
  // }, []);

  // tab panels value
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleReportClick = async () => {
    const dateOne = date ? date[0].format("DD/MM/YYYY") : null;
    const dateTwo = date ? date[1].format("DD/MM/YYYY") : null;
    const userIds = employees.length ? employees : null;
    const projectIds = projects.length ? projects : null;
    const clientIds = clients.length ? clients : null;
    let groupBy = "";
    group.forEach((g) => {
      groupBy = groupBy.concat(g.value);
    });
    const options = {
      clientIds,
      projectIds,
      userIds,
      dateOne,
      dateTwo,
      groupBy,
    };
    setSaveReportOptions(options);
    console.log(options);
    getReports(dispatchGetReports, options);
    console.log(reports);
  };

  // make select employee options
  React.useEffect(() => {
    let array = [];
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
      setemployeeOptions((prev) => [...array]);
    });
  }, [getTeams, clients, projects]);

  //   make select project options
  React.useEffect(() => {
    let array = [];

    if (clientDetails?.loader === false) {
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
  }, [clientDetails, clients, employees]);

  //   make select client options
  console.log(clientDetails?.client?.data);
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
        <SelectClients
          options={clientOptions}
          setClients={(newValue) => {
            setclients(newValue);
          }}
        />
        <SelectProjects
          options={projectOptions}
          setProjects={(newValue) => {
            setprojects(newValue);
          }}
        />
        <SelectGroup
          setGroup={(newValue) => {
            console.log(newValue);
            setgroup(newValue);
          }}
        />
        <Box
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={handleReportClick}
            variant="contained"
            endIcon={<SendIcon />}
          >
            generate Reports
          </Button>
          {!reports.loader ? (
            <SaveReport options={saveReportsOptions}></SaveReport>
          ) : null}
        </Box>
        {!reports.loader ? <Graphs style={{ margin: 10 }}></Graphs> : null}
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
