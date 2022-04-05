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
import { reportsContext } from "src/contexts/ReportsContext";
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function Graphs() {
  const [value, setValue] = React.useState(0);

  const { reports } = React.useContext(reportsContext);
  console.log(reports);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    reports.reports[0].byEP.length !== 0 && (
      <Box sx={{ mt: 2, width: "100%" }}>
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
            <Tab label="Apps & Urls" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Bars></Bars>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EmployeesCharts></EmployeesCharts>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProjectsCharts />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ClientsCharts></ClientsCharts>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AppsCharts></AppsCharts>
        </TabPanel>
      </Box>
    )
  );
}
