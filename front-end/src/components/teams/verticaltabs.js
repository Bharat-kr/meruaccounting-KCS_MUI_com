import * as React from "react";
import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Box, Paper, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Main from "./Main";
import { teamContext } from "../../contexts/TeamsContext";
import { getTeam, createTeam, updateMember } from "../../api/teams api/teams";
import Treeview from "../Treeview";
import { TreeView } from "@mui/lab";
import { TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchBar from "../SearchBar";
import { getFullName } from "src/_helpers/getFullName";
import FloatingForm from "../_dashboard/muicomponents/FloatingForm";

// ---------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "30% 70%",
    backgroundColor: "#fdfdff",
  },
}));

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
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

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  // const { clients, changeClient } = useContext(ClientsContext);
  // const { User } = useContext(UserContext);
  const { dispatchgetTeam, getTeams, dispatchTeam, dispatchUpdateMember } =
    useContext(teamContext);
  const [currMember, setCurrMember] = React.useState(null);
  const [newTeam, setNewTeam] = React.useState("");
  const [currTeam, setCurrTeam] = React.useState(null);

  const [currTeamToUpdate, setCurrTeamToUpdate] = React.useState(null);
  const [newMemberMail, setNewMemberMail] = React.useState("");

  React.useEffect(() => {
    getTeam(dispatchgetTeam);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // labels for search box(autocomplete)
  const teamsList = [];
  React.useEffect(() => {
    getTeams?.getTeam?.forEach((team) => {
      // eslint-disable-next-line prefer-template
      team.members?.map((member) =>
        teamsList.push(
          team.name + ":" + getFullName(member.firstName, member.lastName)
        )
      );
    });
  }, [getTeams, teamsList]);

  console.log(getTeams);
  React.useEffect(() => {
    if (getTeams?.getTeam?.length > 0) {
      //setting the current member
      setCurrTeam(getTeams?.getTeam[0]);
      setCurrMember(getTeams?.getTeam[0].members[0]);
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

    return setCurrMember(teams[0].members[0]);
  };

  const handleClick = (e) => {
    // console.log(e.target.id);
    const team = getTeams.getTeam.filter((team) =>
      team.name === e.target.dataset.client ? team : ""
    );
    setCurrTeam(team[0]);
    const member = team[0].members.filter(
      (member) => member._id === e.target.id
    );

    setCurrMember(member[0]);
    // console.log("member", member[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newTeam);
    createTeam({ name: newTeam }, dispatchTeam);
    // RestaurantRounded(console.log("hello", e));
  };
  const changeCurrTeam = async (e) => {
    const team = await getTeams.getTeam.filter((team) =>
      team.name === e.target.textContent ? team : ""
    );
    setCurrTeamToUpdate(team[0]);
  };

  const AddMember = async (e) => {
    e.preventDefault();
    console.log(newMemberMail);
    console.log(currTeamToUpdate);
    await updateMember(
      { teamId: currTeamToUpdate._id, employeeMail: newMemberMail },
      dispatchUpdateMember
    );
    await getTeam(dispatchgetTeam);
  };

  return (
    <div className={classes.root}>
      <Box
        component="div"
        sx={{
          margin: "10px",
          height: "auto",
        }}
      >
        <Paper
          component="div"
          elevation={3}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* search box */}
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <SearchBar
              handleSearch={handleSearch}
              label="Search Member"
              options={teamsList}
            />
            <FloatingForm toolTip="Add Team" color="primary" icon={<AddIcon />}>
              <form
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
                style={{ padding: "10px" }}
              >
                <TextField
                  onChange={(e) => setNewTeam(e.target.value)}
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
            </FloatingForm>
          </Box>
          {/* teams and members tree view flex container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: "1",
              // alignItems: "flex-start",
              overflowY: "auto",
            }}
          >
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                // display: "flex",
                // flexDirection: "row",
                height: 240,
                flexGrow: 1,
                // maxWidth: 400,
                // overflowY: "auto",
                width: "100%",
              }}
              className={classes.root}
            >
              {getTeams?.getTeam?.map((el) => (
                <TreeItem
                  nodeId={el._id.toString()}
                  label={<Typography variant="h4">{el.name}</Typography>}
                  key={el.name}
                  onClick={changeCurrTeam}
                >
                  {el.members.map((member) => {
                    return (
                      <TreeItem
                        nodeId={member._id.toString()}
                        key={member._id}
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
                    );
                  })}
                </TreeItem>
              ))}
            </TreeView>
          </Box>
          {/* INPUT BOX, add validations, connect to context */}
          <Box
            sx={{
              boxSizing: "border-box",
              width: "95%",
              "& > :not(style)": { m: 1 },
            }}
          >
            <form
              onSubmit={AddMember}
              noValidate
              autoComplete="off"
              style={{ width: "100%" }}
            >
              <TextField
                onChange={(e) => setNewMemberMail(e.target.value)}
                required
                fullWidth
                label="Add new Member"
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
          }}
        >
          <Box>
            <Main
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
