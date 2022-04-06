import * as React from "react";
import { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Main from "./Main";
import { teamContext } from "../../contexts/TeamsContext";
import {
  getTeam,
  createTeam,
  updateMember,
  deleteTeam,
} from "../../api/teams api/teams";
import { capitalize } from "../../_helpers/Capitailze";
import { LoadingButton, TreeView } from "@mui/lab";
import { TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchBar from "../SearchBar";
import { getFullName } from "src/_helpers/getFullName";
import FloatingForm from "../_dashboard/muicomponents/FloatingForm";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import Confirmation from "../Confirmation";
import { lowerCase } from "src/_helpers/LowerCase";
import { getAllEmployeeList } from "src/api/admin api/admin";
import { CommonContext } from "src/contexts/CommonContext";

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

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  // const { clients, changeClient } = useContext(ClientsContext);
  // const { User } = useContext(UserContext);
  const {
    dispatchgetTeam,
    getTeams,
    dispatchTeam,
    dispatchUpdateMember,
    deletedTeam,
    dispatchDeleteTeam,
    teamCreate,
    updatedMember,
  } = useContext(teamContext);
  const { allEmployees, dispatchAllEmployees } = useContext(CommonContext);
  const [currMember, setCurrMember] = React.useState(null);
  const [newTeam, setNewTeam] = React.useState("");
  const [currTeam, setCurrTeam] = React.useState(null);
  const [loaderAddMember, setLoaderAddMember] = React.useState(false);
  const [loaderAddTeam, setLoaderAddTeam] = React.useState(false);

  const [currTeamToUpdate, setCurrTeamToUpdate] = React.useState(null);
  const [newMemberId, setNewMemberId] = React.useState("");

  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const { enqueueSnackbar } = useSnackbar();

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
  React.useEffect(() => {
    try {
      const teamIndex = teamsDetails?.findIndex((i) => i._id === currTeam?._id);
      const memberIndex = teamsDetails[teamIndex]?.members?.findIndex(
        (i) => i._id === currMember?._id
      );
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

  //Fetching all Employees for autocomplete
  React.useEffect(() => {
    getAllEmployeeList(dispatchAllEmployees);
  }, []);
  console.log(allEmployees.employees);

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
  // Deleting team
  const handleTeamDelete = () => {
    try {
      deleteTeam(currTeam._id, dispatchDeleteTeam);
      // if(deletedTeam.data.){}
      console.log(deletedTeam);
      getTeam(dispatchgetTeam);
    } catch (err) {
      console.log(err);
    }
    enqueueSnackbar(deletedTeam.error ? deletedTeam.error : "Team deleted", {
      variant: deletedTeam.error ? "info" : "success",
    });
  };

  //Creating New Team
  const handleSubmit = async (e) => {
    setLoaderAddTeam(true);
    try {
      e.preventDefault();
      await createTeam({ name: capitalize(newTeam) }, dispatchTeam);
      await getTeam(dispatchgetTeam);
      setLoaderAddTeam(false);
      newTeamRef.current.value = "";
      // enqueueSnackbar("Team created", { variant: "success" });
    } catch (err) {
      // enqueueSnackbar(err.message, { variant: "info" });
      setLoaderAddTeam(false);
      console.log(err);
    }
    enqueueSnackbar(teamCreate.error ? teamCreate.error : "Team Created", {
      variant: teamCreate.error ? "error" : "success",
    });
  };
  console.log(currTeam, currMember);
  //Changing Curr Team
  const changeCurrTeam = async (e) => {
    const team = await getTeams.getTeam.filter((team) =>
      team.name === e.target.textContent ? team : ""
    );
    setCurrTeamToUpdate(team[0]);
    setCurrTeam(team[0]);
    team.members === "" ? setCurrMember(undefined) : console.info("no member");
  };

  //Add Member to a Team
  const AddMember = async (e) => {
    setLoaderAddMember(true);
    try {
      e.preventDefault();
      await updateMember(
        { teamId: currTeamToUpdate._id, employeeId: newMemberId },
        dispatchUpdateMember
      );
      await getTeam(dispatchgetTeam);
      setLoaderAddMember(false);
      addMemberRef.current.value = "";
      // enqueueSnackbar("Member added", { variant: "success" });
    } catch (err) {
      console.log(err);
      setLoaderAddMember(false);
      // enqueueSnackbar(err.message, { variant: "info" });
    }
    enqueueSnackbar(
      updatedMember.error ? updatedMember.error : "Member added",
      { variant: updatedMember.error ? "error" : "success" }
    );
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

  //confirmation modal
  const [ConfirmModal, setConfirmModal] = React.useState(false);

  //handle modal open
  const handleOpen = () => {
    setConfirmModal(true);
  };

  //handle modal close
  const handleClose = () => {
    setConfirmModal(false);
  };

  //handle employee select close
  const handleEmplooyeeSelect = (e, value) => {
    setNewMemberId(value._id);
  };

  return (
    <div className={classes.root}>
      <Box
        component="div"
        sx={{
          margin: "10px",
          // height: "70vh",
          scrollbar: "auto",
          flexGrow: "1",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Paper
          component="div"
          elevation={3}
          sx={{
            overflow: "hidden",
            height: "100%",
            width: "100%",
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
                <LoadingButton
                  fullWidth
                  type="submit"
                  loading={loaderAddTeam}
                  loadingPosition="end"
                  variant="contained"
                  sx={{ mt: 1 }}
                >
                  Add Team
                </LoadingButton>
              </form>
            </FloatingForm>
          </Box>
          {/* teams and members tree view flex container */}
          {getTeams?.loader === true ? (
            <Box
              sx={{
                display: "flex",
                flexGrow: "1",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                alignItems: "flex-start",
                overflowY: "auto",
              }}
            >
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                  height: 240,
                  flexGrow: 1,
                  // maxWidth: 400,
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
                    label={
                      <Typography
                        sx={{
                          color: "#637381",
                          fontSize: "1.5rem",
                          fontWeight: "700",
                        }}
                      >
                        {el.name}
                      </Typography>
                    }
                    key={el._id}
                    onClick={changeCurrTeam}
                  >
                    {el.members.map((member) => {
                      return (
                        <TreeItem
                          nodeId={member._id.toString() + el._id.toString()}
                          key={member._id + el._id}
                          label={
                            <Typography
                              sx={{
                                color: "#2a3641",
                                fontSize: "1.2rem",
                                fontWeight: "700",
                              }}
                              data-client={el.name}
                              onClick={handleClick}
                              id={member._id}
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
          )}
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
              {/* <TextField
                inputRef={addMemberRef}
                onChange={(e) => setNewMemberMail(e.target.value)}
                required
                fullWidth
                label="Add new Member"
                // error={newClientError}
                sx={{}}
              /> */}
              <Autocomplete
                id="combo-box-demo"
                inputRef={addMemberRef}
                options={allEmployees.employees}
                getOptionLabel={(option) =>
                  getFullName(option.firstName, option.lastName)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Add Employees" />
                )}
                onChange={handleEmplooyeeSelect}
              />
              <LoadingButton
                fullWidth
                type="submit"
                loading={loaderAddMember}
                loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
              >
                Add Member
              </LoadingButton>
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
            {currTeam !== null && (
              <Box
                onClick={handleOpen}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  alignContent: "center",
                  alignItem: "center",
                }}
              >
                <Box
                  sx={{
                    width: "10rem",
                    display: "flex",
                    alignSelf: "center",
                    alignContent: "center",
                    alignItems: "center",
                    alignItem: "center",
                    justifyContent: "center",
                    borderRadius: "34px",
                    backgroundColor: "#45546a",
                  }}
                >
                  <Typography
                    sx={{
                      // pl: 1,
                      color: "white",
                      alignItem: "center",
                      textAlign: "center",
                    }}
                  >
                    Delete Team
                  </Typography>
                  <DeleteIcon
                    sx={{
                      pl: 0.5,
                      // fontSize: "1.3rem",
                      display: "flex",
                      alignContent: "center",
                      color: "white",
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
      <Confirmation
        open={ConfirmModal}
        handleClose={handleClose}
        onConfirm={handleTeamDelete}
        detail={{ type: "Team", name: currTeam?.name }}
      />
    </div>
  );
}
