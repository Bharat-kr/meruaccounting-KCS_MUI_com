import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Paper } from "@mui/material";
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
import ByEp from "./ByEp";
import ByPr from "./ByPr";
import ByCl from "./ByCL";
import ByDetailed from "./ByDetailed";
import ByAppsUrl from "./ByApp&Url";

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
    { label: "Group by employee", value: "E" },
    // { label: "Group by project", value: "P" },
  ]);
  const [saveReportsOptions, setSaveReportOptions] = React.useState();
  const componentMounted = React.useRef(true); // (3) component is mounted

  // for options
  const getOptions = async () => {
    const { data } = axios.post("/report/options").then((res) => {
      setprojectOptions(res.data.projectsClientsOptions[0].projects);
      // setprojects(res.data.projectsClientsOptions[0].projects);
      setclientOptions(res.data.projectsClientsOptions[0].clients);
      // setclients(res.data.projectsClientsOptions[0].clients);
      const empArr = Array.from(
        res.data.employeesOptions[0].members,
        function mapFn(mem, index) {
          return { _id: mem._id, name: `${mem.firstName} ${mem.lastName}` };
        }
      );
      setemployeeOptions(empArr);
      // setemployees(empArr);
    });
  };

  React.useEffect(() => {
    getOptions();
  }, []);

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
    getReports(dispatchGetReports, options);
  };

  // make select employee options
  // React.useEffect(() => {
  //   let array = [];
  //   getTeams.getTeam.map((team) => {
  //     team.members.map((member) => {
  //       let newOption = {
  //         _id: member._id,
  //         name: `${member.firstName} ${member.lastName}`,
  //       };
  //       let exists = array.some((el) => el._id === newOption._id);
  //       if (!exists) {
  //         array.push(newOption);
  //       }
  //     });
  //     setemployeeOptions((prev) => [...array]);
  //   });
  // }, [getTeams, clients, projects]);

  //   make select project options
  // React.useEffect(() => {
  //   let array = [];

  //   if (clientDetails?.loader === false) {
  //     clientDetails.client.data.map((client) => {
  //       client.projects.map((project) => {
  //         let newOption = {
  //           _id: project._id,
  //           name: project.name,
  //         };
  //         let exists = array.some((el) => el._id === newOption._id);
  //         if (!exists) {
  //           array.push(newOption);
  //         }
  //       });
  //       setprojectOptions((prev) => [...array]);
  //     });
  //   } else return;
  // }, [clientDetails, clients, employees]);

  //   make select client options
  // React.useEffect(() => {
  //   if (clientDetails.loader === false) {
  //     clientDetails?.client?.data.map((client) => {
  //       let newOption = {
  //         _id: client._id,
  //         name: client.name,
  //       };
  //       let index = clientOptions.findIndex((x) => x._id === client._id);
  //       if (index === -1) setclientOptions((prev) => [...prev, newOption]);
  //     });
  //   } else return;
  // }, [clientDetails, projects, employees]);
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

        {!reports.loader ? (
          <>
            <Graphs style={{ margin: 10 }}></Graphs>
            {group.filter((grp) => grp.value === "E").length !== 0 ? (
              <ByEp sx={{ height: "auto" }} reports={reports} />
            ) : group.filter((grp) => grp.value === "P").length !== 0 ? (
              <ByPr sx={{ height: "auto" }} reports={reports} />
            ) : group.filter((grp) => grp.value === "C").length !== 0 ? (
              <ByCl sx={{ height: "auto" }} reports={reports} />
            ) : group.filter((grp) => grp.value === "D").length !== 0 ? (
              <ByDetailed sx={{ height: "auto" }} reports={reports} />
            ) : group.filter((grp) => grp.value === "A").length !== 0 ? (
              <ByAppsUrl sx={{ height: "auto" }} reports={reports} />
            ) : (
              ""
            )}
          </>
        ) : null}
        {/* <div>
          <ByLL sx={{ height: "auto" }} reports={reports} />
        </div> */}
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        hello
      </TabPanel>
      <TabPanel value={value} index={2}>
        {" "}
        hello
      </TabPanel>
      <TabPanel value={value} index={3}>
        {" "}
        hello
      </TabPanel> */}

      {/* <GridExample /> */}
      {/* </TabPanel> */}
    </Box>
  );
}
