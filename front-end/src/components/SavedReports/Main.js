import * as React from "react";
import PropTypes from "prop-types";
import { Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DatePicker from "./DatePicker";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
// components
import Graphs from "./Graphs";
import SelectEmployees from "./SelectEmployees";
import SelectProjects from "./SelectProjects";
import SelectClients from "./SelectClients";
import SaveReport from "./SaveReport";

// contexts and apis
import { teamContext } from "../../contexts/TeamsContext";
import { ClientsContext } from "../../contexts/ClientsContext";
import { reportsContext } from "../../contexts/ReportsContext";
import { getReports } from "../../api/reports api/reports";
import ByEp from "./ByEp";
import ByPr from "./ByPr";
import ByCl from "./ByCL";
import ByD from "./ByDetailed";
import ByAppUrl from "./ByApp&Url";
import GridExample from "../../components/SavedReports/ByEp";

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
  const { reports, savedReports, dispatchGetReports } =
    React.useContext(reportsContext);

  // variable for date, employees, and projects
  const [date, setdate] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [employees, setemployees] = React.useState([]);
  const [projects, setprojects] = React.useState([]);
  const [clients, setclients] = React.useState([]);

  React.useEffect(() => {
    setOptions(savedReports?.data[0]);
  }, [savedReports]);

  // tab panels value

  return (
    <>
      {savedReports?.data[0] ? (
        <Box sx={{ width: "100%", scroll: "visible" }}>
          {options?.user && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                heigth: "5rem",
                width: "100%",
              }}
            >
              <Typography variant="h3" sx={{ color: "color.primary" }}>
                {options.user.firstName} {options.user.lastName}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Name:</Typography>
                <Typography varinat="" sx={{ ml: 1 }}>
                  {options.fileName}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Date range:</Typography>
                <Typography varinat="" sx={{ ml: 1 }}>
                  {options.options.dateOne}-{options.options.dateTwo}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Employees:</Typography>
                <Typography varinat="" sx={{ ml: 1 }}>
                  {options.fileName}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Projects:</Typography>
                <Typography varinat="" sx={{ ml: 1 }}>
                  {options.fileName}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Group by:</Typography>
                <Typography varinat="" sx={{ ml: 1 }}>
                  {options.fileName}
                </Typography>
              </Box>
            </Box>
          )}
          <Graphs style={{ margin: 10 }}></Graphs>
          {options?.options.groupBy === "E" ? (
            <ByEp sx={{ height: "auto" }} />
          ) : options?.options.groupBy === "Pr" ? (
            <ByPr sx={{ height: "auto" }} />
          ) : options?.options.groupBy === "Cl" ? (
            <ByCl sx={{ height: "auto" }} />
          ) : options?.options.groupBy === "D" ? (
            <ByD sx={{ height: "auto" }} />
          ) : options?.options.groupBy === "A" ? (
            <ByAppUrl sx={{ height: "auto" }} />
          ) : (
            ""
          )}
        </Box>
      ) : null}
    </>
  );
}
