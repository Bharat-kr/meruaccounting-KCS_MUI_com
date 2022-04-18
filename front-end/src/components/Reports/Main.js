import * as React from "react";
import PropTypes from "prop-types";
import { Divider, Tabs } from "@mui/material";
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
import SavedR from "./SavedR";

// contexts and apis

import { loginContext } from "../../contexts/LoginContext";
import { teamContext } from "../../contexts/TeamsContext";
import { ClientsContext } from "../../contexts/ClientsContext";
import { reportsContext } from "../../contexts/ReportsContext";
import { getReports } from "../../api/reports api/reports";
import ByEp from "./ByEp";
import ByPr from "./ByPr";
import ByCl from "./ByCL";
import ByDetailed from "./ByDetailed";
import ByAppsUrl from "./ByApp&Url";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = React.useState(0);
  //
  const [timeRange, setTimeRange] = React.useState("Custom");
  //
  const { getTeams } = React.useContext(teamContext);
  //
  const { clientDetails } = React.useContext(ClientsContext);
  //
  const {
    reports,
    dispatchGetReports,
    date,
    dateFunc,
    allOptions,
    allOptionsFunc,
    employeeOptions,
    employeesOptionsFunc,
    projectOptions,
    projectsOptionsFunc,
    clientOptions,
    clientsOptionsFunc,
    employees,
    employeesFunc,
    projects,
    projectsFunc,
    clients,
    clientsFunc,
    group,
    groupFunc,
    disableState,
    disableStateFunc,
    saveReportsOptions,
    saveReportOptionsFunc,
  } = React.useContext(reportsContext);
  //
  const { loginC } = React.useContext(loginContext);

  // variable for date, employees, and projects

  // get report options

  // tabs and tab panels
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // generate options, todo: put it in useEffect to get rid of the button.
  const handleReportClick = async () => {
    try {
      const dateOne = date[0] ? date[0].format("DD/MM/YYYY") : null;
      const dateTwo = date[1] ? date[1].format("DD/MM/YYYY") : null;
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
      saveReportOptionsFunc(options);
      getReports(dispatchGetReports, options);
      disableStateFunc(true);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  // recalibrate project options only for clients
  // React.useEffect(() => {
  //   if (clients) {
  //     let newProOptions = allOptions.projectsClientsOptions[0].projects.filter(
  //       (pro) => {
  //         // in clients objects
  //       }
  //     );
  //   }
  // }, []);

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
          <Tab label="Saved Report" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DatePicker
          setDate={(newValue) => {
            dateFunc(newValue);
          }}
          setTimeRange={(value) => {
            setTimeRange(value);
          }}
        />
        <SelectEmployees
          options={employeeOptions}
          setEmployees={(newValue) => {
            if (!newValue.length) {
              employeesFunc(null);
            } else {
              employeesFunc(newValue);
            }
          }}
        />
        {loginC?.userData?.role !== "employee" ? (
          <SelectClients
            options={clientOptions}
            setClients={(newValue) => {
              if (!newValue.length) {
                clientsFunc(null);
              } else {
                clientsFunc(newValue);
              }
            }}
          />
        ) : null}
        <SelectProjects
          options={projectOptions}
          setProjects={(newValue) => {
            if (!newValue.length) {
              projectsFunc(null);
            } else {
              projectsFunc(newValue);
            }
          }}
        />
        <SelectGroup
          setGroup={(newValue) => {
            groupFunc(newValue);
          }}
        />
        <Box
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            disabled={disableState}
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
            <Graphs style={{ margin: 10 }} timeRange={timeRange}></Graphs>
            <Divider />

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
        ) : (
          ""
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SavedR />
      </TabPanel>
    </Box>
  );
}
