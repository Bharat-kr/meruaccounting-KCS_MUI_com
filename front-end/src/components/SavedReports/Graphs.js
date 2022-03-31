import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Bars from "./BarChart";
import ProjectsCharts from "./ProjectsCharts";
import ClientsCharts from "./ClientsCharts";
import EmployeesCharts from "./EmployeesCharts";
import AppsCharts from "./AppsCharts";
import FloatingForm from "./FloatingForm";
import { reportsContext } from "../../contexts/ReportsContext";
import secondsToHms from "../../_helpers/secondsToHms";

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

export default function Graphs(props) {
  const { savedReports } = React.useContext(reportsContext);
  const [value, setValue] = React.useState(0);
  const [totalPRate, settotalPRate] = React.useState(null);
  const [totalPData, settotalPData] = React.useState(null);
  const [totalHours, settotalHours] = React.useState(null);

  React.useEffect(() => {
    try {
      settotalHours(savedReports?.reports[0]?.total[0]?.totalHours);
      settotalPData(savedReports?.reports[0]?.total[0]?.avgPerformanceData);
      settotalPRate(savedReports?.reports[0]?.total[0]?.avgPayRate);
    } catch (err) {
      console.log(err);
    }
  }, [savedReports]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">Total hours : </Typography>
          <Typography
            variant="h3"
            sx={{
              ml: 1,
              display: "flex",
              opacity: 0.6,
              textAlign: "left",
              alignItems: "center",
            }}
          >
            {" "}
            {secondsToHms(totalHours)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">Activity level : </Typography>
          <Typography
            variant="h3"
            sx={{
              ml: 1,
              display: "flex",
              opacity: 0.6,
              textAlign: "left",
              alignItems: "center",
            }}
          >
            {Math.trunc(totalPData)} %
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">Money : </Typography>
          <Typography
            variant="h3"
            sx={{
              ml: 1,
              display: "flex",
              opacity: 0.6,
              textAlign: "left",
              alignItems: "center",
            }}
          >
            {Math.trunc((totalPRate * totalHours) / 3600)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Timeline" {...a11yProps(0)} />
          <Tab label="Employees" {...a11yProps(1)} />
          <Tab label="Projects" {...a11yProps(2)} />
          <Tab label="Clients" {...a11yProps(3)} />
          {props.options?.includeApps === true && (
            <Tab label="Apps & Urls" {...a11yProps(4)} />
          )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Bars reports={savedReports}></Bars>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EmployeesCharts reports={savedReports}></EmployeesCharts>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProjectsCharts reports={savedReports} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ClientsCharts reports={savedReports}></ClientsCharts>
      </TabPanel>
      {props.options?.includeApps === true && (
        <TabPanel value={value} index={4}>
          <AppsCharts reports={savedReports}></AppsCharts>
        </TabPanel>
      )}
    </Box>
  );
}
