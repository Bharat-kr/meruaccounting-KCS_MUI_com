import * as React from "react";
import { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {
  Box,
  Paper,
  styled,
  OutlinedInput,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { RestaurantRounded } from "@material-ui/icons";
import Main from "./Main";
import { UserContext } from "../../contexts/UserContext";
import { ClientsContext } from "../../contexts/ClientsContext";
import { teamContext } from "../../contexts/TeamsContext";
import { loginContext } from "../../contexts/LoginContext";
import { getTeam, createTeam, updateMember } from "../../api/teams api/teams";
import Treeview from "../Treeview";
import { TreeItem } from "@mui/lab";
import SearchBar from "../SearchBar";

// ---------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    height: "700px",
    width: "100%",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "30% 70%",
    backgroundColor: "#fdfdff",
  },
}));

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

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  // const { clients, changeClient } = useContext(ClientsContext);
  const { User } = useContext(UserContext);
  const { dispatchgetTeam, getTeams } = useContext(teamContext);
  const [currMember, setCurrMember] = React.useState(null);
  const [currTeam, setCurrTeam] = React.useState(null);
  React.useEffect(() => {
    getTeam(dispatchgetTeam);
  }, []);

  const getFullName = (firstName, lastName) => {
    let name = "";
    if (firstName && lastName) {
      name = firstName + " " + lastName;
    } else if (!firstName) {
      name = lastName;
    } else if (!lastName) {
      name = firstName;
    }
    return name;
  };

  // console.log(getTeams.getTeam);
  // console.log(currMember);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // labels for search box(autocomplete)
  const teamsList = [];
  React.useEffect(() => {
    getTeams?.getTeam?.forEach((team) => {
      // eslint-disable-next-line prefer-template
      team.employees?.map((member) =>
        teamsList.push(
          team.name + ":" + getFullName(member.firstName, member.lastName)
        )
      );
    });
  }, [getTeams, teamsList]);

  React.useEffect(() => {
    if (getTeams?.getTeam?.length > 0) {
      //setting the current member
      setCurrTeam(getTeams?.getTeam[0]);
      setCurrMember(getTeams?.getTeam[0].employees[0]);
    }
  }, [getTeams, setCurrMember]);

  // change currentclient on search
  const handleSearch = (e, value) => {
    const teams = getTeams.getTeam.filter((team) =>
      team.name === value ? team : ""
    );
    if (teams.length === 0) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    return setCurrMember(teams[0].employees[0]);
  };

  const handleClick = (e) => {
    // console.log(e.target.id);
    const team = getTeams.getTeam.filter((team) =>
      team.name === e.target.dataset.client ? team : ""
    );
    setCurrTeam(team[0]);
    const member = team[0].employees.filter(
      (member) => member._id === e.target.id
    );

    setCurrMember(member[0]);
    // console.log("member", member[0]);
  };

  const handleSubmit = () => {
    RestaurantRounded(console.log("hello"));
  };
  // const UsersList = [];
  // clients.forEach((client) => {
  //   // eslint-disable-next-line prefer-template
  //   User.map((User) => UsersList.push(User.name));
  // });
  return (
    <div className={classes.root}>
      <Box
        component="div"
        sx={{
          margin: "10px",
          maxHeight: "70vh",
          height: "auto",
        }}
      >
        <Paper
          component="div"
          elevation={3}
          sx={{
            overflow: "hidden",
            height: "100%",
            position: "relative",
          }}
        >
          {/* search box */}
          <SearchBar
            handleSearch={handleSearch}
            label="Search Member"
            options={teamsList}
          />

          {/* teams and members tree view flex container */}
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {getTeams?.getTeam?.map((el) => (
              <Treeview parentName={el.name}>
                {el.employees.map((member) => (
                  <TreeItem
                    nodeId={1 + el.employees.indexOf(member) + 1}
                    label={
                      <Typography
                        data-client={el.name}
                        onClick={handleClick}
                        id={member._id}
                        variant="h5"
                      >
                        {getFullName(member.firstName, member.lastName)}
                      </Typography>
                    }
                  />
                ))}
              </Treeview>
            ))}
          </Box>

          {/* INPUT BOX, add validations, connect to context */}
          <Box
            sx={{
              boxSizing: "border-box",
              width: "95%",
              position: "absolute",
              bottom: "0",

              "& > :not(style)": { m: 1 },
            }}
          >
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField
                // onChange={(e) => setnewClientValue(e.target.value)}
                required
                fullWidth
                label="Add new Team"
                // error={newClientError}
                sx={{}}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1 }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Paper>
      </Box>

      {/* HEADER */}
      <Box
        component="div"
        sx={{ margin: "10px 10px 10px 0", overflow: "auto" }}
      >
        {/* grid container 40 60 */}
        <Paper
          component="div"
          elevation={3}
          sx={{
            overflow: "visible",

            position: "relative",
            // display: 'grid',
            // gridTemplateRows: '30% 70%'
          }}
        >
          <Box>
            {/* {User.map((user) => ( */}
            <Main
              value={value}
              // index={User.indexOf(user)}
              currMember={currMember}
              currTeam={currTeam}
              sx={{ overflow: "hidden" }}
            />
            {/* ))} */}
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
