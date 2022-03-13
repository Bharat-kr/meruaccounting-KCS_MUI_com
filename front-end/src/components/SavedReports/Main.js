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
import { lastIndexOf } from "lodash";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       // role="tabpanel"
//       hidden={value !== index}
//       // id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

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
                <Typography
                  varinat=""
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1,
                    justifyContent: "center",
                  }}
                >
                  {options.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Date range:</Typography>
                <Typography
                  varinat=""
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1,
                    justifyContent: "center",
                  }}
                >
                  {options.options.dateOne
                    ? `${options.options.dateOne}-`
                    : "Till "}
                  {options.options.dateTwo}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Employees : </Typography>
                <Typography
                  varinat="h6"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1,
                    justifyContent: "center",
                  }}
                >
                  {options.options.userIds === []
                    ? options.options.userIds?.map((user, index) =>
                        index === lastIndexOf(options.options.userIds) - 1
                          ? ` ${user.name} .`
                          : ` ${user.name} ,`
                      )
                    : "All Employees"}
                  {/*  : options.options.userIds} */}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Projects:</Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1,
                    justifyContent: "center",
                  }}
                >
                  {options.options.projectIds === []
                    ? options.options.projectIds.map((user, index) =>
                        index === lastIndexOf(options.options.projectIds) - 1
                          ? ` ${user.name} .`
                          : ` ${user.name} ,`
                      )
                    : "All Projects"}
                  {/* : options.options.projectIds} */}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <Typography variant="h6">Group by:</Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 1,
                    justifyContent: "center",
                  }}
                >
                  {options.options.groupBy === "E"
                    ? "Group by employee"
                    : options.options.groupBy === "P"
                    ? "Group by project"
                    : options.options.groupBy === "C"
                    ? "Group by clients "
                    : options.options.groupBy === "A"
                    ? "Group by apps&url"
                    : options.options.groupBy === "D"
                    ? "Group by details"
                    : ""}
                </Typography>
              </Box>
            </Box>
          )}
          <Graphs style={{ margin: 10 }} options={options}></Graphs>
          {options?.options.groupBy === "E" ? (
            <ByEp sx={{ height: "auto" }} options={options} />
          ) : options?.options.groupBy === "P" ? (
            <ByPr sx={{ height: "auto" }} options={options} />
          ) : options?.options.groupBy === "C" ? (
            <ByCl sx={{ height: "auto" }} options={options} />
          ) : options?.options.groupBy === "D" ? (
            <ByD sx={{ height: "auto" }} options={options} />
          ) : options?.options.groupBy === "A" ? (
            <ByAppUrl sx={{ height: "auto" }} options={options} />
          ) : (
            ""
          )}
        </Box>
      ) : null}
    </>
  );
}
