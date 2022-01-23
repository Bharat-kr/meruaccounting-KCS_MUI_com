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

  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  // const handleExpandClick = () => {
  //   setExpanded((oldExpanded) =>
  //     oldExpanded.length === 0 ? ["1", "5", "6", "7"] : []
  //   );
  // };

  // const handleSelectClick = () => {
  //   setSelected((oldSelected) =>
  //     oldSelected.length === 0
  //       ? ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  //       : []
  //   );
  // };

  const newTeamRef = React.useRef("");
  const addMemberRef = React.useRef("");
  React.useEffect(() => {
    getTeam(dispatchgetTeam);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // labels for search box(autocomplete)
  const teamsList = [];
  let teamsDetails;
  React.useEffect(async () => {
    try {
      console.log(currTeam?._id, currMember._id);
      const teamIndex = teamsDetails?.findIndex((i) => i._id === currTeam?._id);
      const memberIndex = teamsDetails[teamIndex]?.members?.findIndex(
        (i) => i._id === currMember?._id
      );
      console.log(teamIndex, memberIndex, "hello");
      if (teamsDetails !== null) {
        setCurrTeam(teamsDetails[teamIndex]);
        setCurrMember(teamsDetails[teamIndex]?.members[memberIndex]);
      }
    } catch (err) {
      console.log(err);
    }
  }, [getTeams]);
  React.useEffect(() => {
    getTeams?.getTeam?.forEach((team) => {
      // teamsDetails.push({ ...team });
      // eslint-disable-next-line prefer-template
      team.members?.map((member) =>
        teamsList.push(
          team.name + ":" + getFullName(member.firstName, member.lastName)
        )
      );
    });
  }, [getTeams, teamsList]);

  teamsDetails = getTeams?.getTeam;

  //Click Handler for Tree Items0
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

  //Creating New Team
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(newTeam);
      await createTeam({ name: newTeam }, dispatchTeam);
      await getTeam(dispatchgetTeam);
      newTeamRef.current.value = "";
    } catch (err) {
      console.log(err.message);
    }
  };

  //Changing Curr Team
  const changeCurrTeam = async (e) => {
    const team = await getTeams.getTeam.filter((team) =>
      team.name === e.target.textContent ? team : ""
    );
    setCurrTeamToUpdate(team[0]);
  };

  //Add Member to a Team
  const AddMember = async (e) => {
    try {
      e.preventDefault();
      await updateMember(
        { teamId: currTeamToUpdate._id, employeeMail: newMemberMail },
        dispatchUpdateMember
      );
      await getTeam(dispatchgetTeam);
      addMemberRef.current.value = "";
    } catch (err) {
      console.log(err.message);
    }
  };

  //diffrentiate the listValue
  const differentiateFunction = (str) => {
    if (str !== null) {
      return str.split(":");
    }
  };

  //searching the selected name and setting state to it
  const handleSearch = (e, value) => {
    try {
      const val = differentiateFunction(value);
      if (val !== null) {
        const teams = getTeams.getTeam?.filter((team) =>
          team.name === val[0] ? team : ""
        );
        setCurrTeam(teams[0]);
        setExpanded((oldExpanded) => [`${teams[0]._id}`]);

        const member = teams[0].members?.filter((member) =>
          getFullName(member.firstName, member.lastName) == val[1] ? member : ""
        );
        if (teams.length === 0) {
          // eslint-disable-next-line no-useless-return
          return;
        }
        setCurrMember(member[0]);
        setSelected((oldSelected) => [`${member[0]._id + teams[0]._id}`]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <Box
        component="div"
        sx={{
          margin: "10px",
          height: "70vh",
          scrollbar: "auto",
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
                  inputRef={newTeamRef}
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
              overflowY: "auto",
            }}
          >
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                width: "100%",
              }}
              expanded={expanded}
              selected={selected}
              onNodeToggle={handleToggle}
              onNodeSelect={handleSelect}
            >
              {getTeams?.getTeam?.map((el) => (
                <TreeItem
                  nodeId={el._id.toString()}
                  label={<Typography variant="h6">{el.name}</Typography>}
                  key={el.name}
                  onClick={changeCurrTeam}
                >
                  {el.members.map((member) => {
                    return (
                      <TreeItem
                        nodeId={member._id.toString() + el._id.toString()}
                        key={member._id}
                        label={
                          <Typography
                            data-client={el.name}
                            onClick={handleClick}
                            id={member._id}
                            variant="body1"
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
                inputRef={addMemberRef}
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
        sx={{ padding: "10px 10px 10px 0", overflow: "auto", height: "100%" }}
      >
        {/* grid container 40 60 */}
        <Paper
          component="div"
          elevation={3}
          sx={{
            overflow: "visible",
            position: "relative",
            height: "100%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflow: "auto",
              paddingBottom: "10px",
            }}
          >
            <Main
              currMember={currMember}
              currTeam={currTeam}
              setMember={(member) => setCurrMember(member)}
              setCurrTeam={(team) => setCurrTeam(team)}
              teamsDetails={teamsDetails}
            />
            {/* ))} */}
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
