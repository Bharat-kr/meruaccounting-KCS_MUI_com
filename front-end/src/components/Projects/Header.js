import React, { useContext, useState, useRef, useEffect } from "react";
import { Paper, Typography, TextField, Link, IconButton } from "@mui/material";
import EdiText from "react-editext";
import SearchBar from "../SearchBar";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { ClientsContext } from "../../contexts/ClientsContext";
import { projectContext } from "../../contexts/ProjectsContext";
import { getClient } from "../../api/clients api/clients";
import {
  editProject,
  deleteProject,
  addProjectLeader,
} from "../../api/projects api/projects";
import EnhancedTable from "../Projects/ProjectMemers";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useLayoutEffect } from "react";
import { Role } from "../../_helpers/role";
import { loginContext } from "../../contexts/LoginContext";
import { reportsContext } from "../../contexts/ReportsContext";
import Confirmation from "../Confirmation";
import Autocomplete from "@mui/material/Autocomplete";
import Searchbar from "src/layouts/dashboard/Searchbar";

//---------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#000",
    width: "fit-content",
    maxWidth: "50%",
    wordWrap: "break-word",
    height: "30px",
    fontSize: "30px",
    fontWeight: "bold",
    border: "none",
    background: "#fff",
    transition: "width 0.4s ease-in-out",
    "& :focus": { width: "100%" },
  },
}));
export default function Header(props) {
  const {
    // currentClient,
    // currentProject,
    clientsList,
    setcurrentProject,
    setcurrentClient,
    ...other
  } = props;

  const classes = useStyles();
  // to focus edit name of client
  const inputRef = useRef();
  //context

  const { loginC } = useContext(loginContext);
  const {
    clients,
    currentClient,
    currentProject,
    changeClient,
    changeProject,
    updateClient,
    clientDetails,
    dispatchClientDetails,
  } = useContext(ClientsContext);

  const {
    dispatchEditProject,
    dispatchDeleteProject,
    dispatchaddProjectLeader,
    editedProject,
    deletedProject,
    editProjectLeader,
  } = useContext(projectContext);

  const { reports, byClients, byProject } = useContext(reportsContext);

  const [ProjectLeader, setProjectLeader] = useState("");
  const [projectName, setprojectName] = useState("");
  const [budgetTime, setbudgetTime] = useState();
  const [consumedTime, setconsumedTime] = useState(0);
  const outerref = useRef();
  const proInputRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  let clientIndex;
  let projectIndex;
  const handleEditClick = (e) => {
    inputRef.current.focus();
  };
  const test = useRef(false);
  if (clientsList !== []) {
    clientIndex = clientsList?.findIndex((i) => i._id === currentClient?._id);
    projectIndex = clientsList[clientIndex]?.projects?.findIndex(
      (i) => i?._id === currentProject?._id
    )
      ? clientsList[clientIndex]?.projects?.findIndex(
          (i) => i._id === currentProject?._id
        )
      : 0;
  }

  useEffect(() => {
    if (clientsList !== null || undefined) {
      changeClient(clientsList[clientIndex]);

      changeProject(clientsList[clientIndex]?.projects[projectIndex]);
    }
  }, [clientDetails]);
  useEffect(() => {
    try {
      currentProject
        ? setprojectName(`${currentProject.name}`)
        : setprojectName("No Client Select");
      currentProject?.projectLeader
        ? setProjectLeader(
            `${currentProject?.projectLeader?.firstName} ${currentProject?.projectLeader?.lastName}`
          )
        : setProjectLeader("No leader");

      setbudgetTime(currentProject?.budgetTime);
      console.log(byProject?.totalHours);
      byProject !== [] &&
        setconsumedTime((byProject[0]?.totalHours / 3600).toFixed(2));
      console.log(byProject);
      proInputRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  }, [clientDetails, currentClient, currentProject, byProject, byClients]);

  let memberList = [];
  let membersData = [];
  currentProject
    ? currentProject.employees.map((emp) => {
        membersData.push({
          dayArray: emp.days,
          id: emp._id,
          name: `${emp.firstName} ${emp.lastName}`,
          email: emp.email,
          payRate: emp.payRate,
        });
        memberList.push(`${emp.firstName} ${emp.lastName}`);
      })
    : memberList.push("");
  const [inputValue, setInputValue] = useState(memberList[0]);
  const handleSearch = async (e, value) => {
    try {
      e.preventDefault();
      const emp = membersData.filter((emp) =>
        emp.name === value ? emp.id : ""
      );
      const data = [currentProject._id, emp[0].email];
      await addProjectLeader(data, dispatchaddProjectLeader);
      const employee = memberList.filter((emp) => (emp === value ? emp : ""));
      setProjectLeader(employee);
      proInputRef.current.value = "";

      // enqueueSnackbar("Project Leader changed", { variant: "success" });
    } catch (error) {
      console.log(error.message);
      // enqueueSnackbar(error.message, { variant: "warning" });
    }
    enqueueSnackbar(
      editProjectLeader.error
        ? editProjectLeader.error
        : "Project Leader changed",
      {
        variant: editProjectLeader.error ? "info" : "success",
      }
    );
  };
  const handleEdit = () => {};
  const handleEditSubmit = async (e) => {
    try {
      e.preventDefault();
      await editProject(
        currentProject._id,
        { name: projectName },
        dispatchEditProject
      );
      await getClient(dispatchClientDetails);
      // changeProject(curr);
      // enqueueSnackbar("Project name changed", { variant: "success" });
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: "warning" });
    }
    enqueueSnackbar(
      editedProject.error ? editedProject.error : "Project name changed",
      {
        variant: editedProject.error ? "info" : "success",
      }
    );
  };
  const handleProjectDelete = async (e) => {
    try {
      const clientIndex = clientsList?.findIndex(
        (i) => i._id === currentClient?._id
      );
      const projectIndex = clientsList[clientIndex]?.projects?.findIndex(
        (i) => i._id === currentProject._id
      );
      const lastIn = clientsList[clientIndex]?.projects?.indexOf(
        clientsList[clientIndex]?.projects?.slice(-1)[0]
      )
        ? clientsList[clientIndex]?.projects?.indexOf(
            clientsList[clientIndex]?.projects?.slice(-1)[0]
          )
        : 0;
      const data = { projectId: `${currentProject._id}` };

      if (clientIndex === 0 && projectIndex === 0) {
        changeProject(clientsList[clientIndex].projects[projectIndex + 1]);
      } else if (
        projectIndex === lastIn &&
        projectIndex === 0 &&
        clientIndex !== 0
      ) {
        changeClient(clientsList[clientIndex - 1]);
        changeProject(clientsList[clientIndex - 1].projects.slice(-1)[0]);
      } else if (clientIndex === 0 && projectIndex === lastIn) {
        changeClient(clientsList[clientIndex + 1]);
        changeProject(clientsList[clientIndex + 1].projects[0]);
      } else {
        changeProject(clientsList[clientIndex].projects[projectIndex + 1]);
      }
      await deleteProject(currentProject._id, dispatchDeleteProject);
      await getClient(dispatchClientDetails);
      // enqueueSnackbar("Project deleted", { variant: "success" });
    } catch (err) {
      console.log(err);
      // enqueueSnackbar(err.message, { variant: "warning" });
    }
    enqueueSnackbar(
      deletedProject.error ? deletedProject.error : "Project deleted",
      {
        variant: deletedProject.error ? "warning" : "success",
      }
    );
  };
  const handleSave = async (v) => {
    console.log(v);
    try {
      await editProject(
        currentProject._id,
        { budgetTime: v },
        dispatchEditProject
      );
      setbudgetTime(v);
      // await getClient(dispatchClientDetails);
      changeProject(currentProject);
      // enqueueSnackbar("Budget time changed", { variant: "success" });
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: "warning" });
    }
    enqueueSnackbar(
      editedProject.error ? editedProject.error : "Project name changed",
      {
        variant: editedProject.error ? "info" : "success",
      }
    );
  };
  console.log(currentProject);

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

  return currentProject === undefined ? (
    <Box
      component="div"
      sx={{
        width: "70%",
        flexGrow: "1",
        overflowX: "auto",
        overflowY: "auto",
        margin: "10px 10px 10px 0",
      }}
    >
      <Paper
        component="div"
        elevation={3}
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          ml: 1,
          overflow: "visible",
          height: "100%",
        }}
      >
        <Box
          component="img"
          src="/svgs/project.svg"
          sx={{ width: 100, height: 70, backgroundColor: "white" }}
        />
        <Typography variant="h5">No Project Selected</Typography>
      </Paper>
    </Box>
  ) : (
    <>
      <Box
        ref={outerref}
        component="div"
        sx={{
          width: "70%",
          flexGrow: "1",
          overflowX: "hidden",
          overflowY: "auto",
          m: 1,
        }}
      >
        {/* grid container 40 60 */}
        <Paper
          component="div"
          elevation={3}
          sx={{
            overflow: "visible",
            height: "100%",
            position: "relative",
            display: "grid",
            gridTemplateRows: "30% 70%",
          }}
        >
          <Box sx={{ m: 1 }}>
            <div style={{ marginBottom: ".5rem" }}>
              <form onSubmit={handleEditSubmit} style={{ display: "inline" }}>
                <input
                  onChange={(e) => setprojectName(e.target.value)}
                  type="text"
                  ref={inputRef}
                  className={classes.input}
                  value={projectName}
                />
              </form>

              <div
                style={{
                  float: "right",
                }}
              >
                <IconButton>
                  <EditIcon onClick={handleEditClick} />
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={handleOpen} />
                </IconButton>
              </div>
            </div>
            <hr></hr>
            <Typography
              variant="h6"
              sx={{
                mt: 3,
                ml: 1,
                display: "block",
                width: "100%",
              }}
            >
              Project Leader
            </Typography>
            <div
              style={{
                width: "100%",
                float: "left",
                // paddingTop: "20px",
                display: "flex",
                // justifyContent: "left",
                // marginLeft: "2px",
              }}
            >
              <Paper
                // variant="h4"
                sx={{
                  textAlign: "center",
                  color: "primary.darker",
                  fontSize: "20px",
                  width: 150,
                  mt: 1,
                  mr: 1,
                }}
              >
                {ProjectLeader}
              </Paper>

              {loginC && Role.indexOf(loginC.userData.role) <= 2 && (
                <SearchBar
                  // inputRef={proInputRef}
                  value={inputValue}
                  label="Assign Project Leader"
                  handleSearch={handleSearch}
                  id="combo-box-demo"
                  options={memberList}
                  sx={{ width: 100 }}
                  // onInputChange="clear"
                />
              )}
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Paper sx={{ pt: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="h6"
                    sx={{ ml: 1, display: "flex", alignItems: "center" }}
                  >
                    Total Project Hours :
                  </Typography>
                  <Typography sx={{ ml: 1 }}>
                    {Role.indexOf(loginC.userData.role) <= 2 ? (
                      <Typography sx={{ pr: 8 }}>{consumedTime} hr</Typography>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" sx={{ pt: 1, ml: 1 }}>
                    Total Internal Hours :
                  </Typography>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", mr: 6, pt: 1 }}
                  >
                    {byProject ? (byProject[0]?.internal / 3600).toFixed(2) : 0}{" "}
                    hr
                  </Typography>
                </Box>
              </Paper>
              <Paper>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    textAlign: "center",
                    alignContent: "center",
                    justifyItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    pt: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      display: "inherit",
                      alignItems: "center",
                    }}
                  >
                    BudgetHours :{" "}
                  </Typography>
                  <Typography sx={{ ml: 1 }}>
                    {loginC && Role.indexOf(loginC.userData.role) <= 2 ? (
                      <EdiText
                        sx={{ display: "flex", alignItems: "center", pl: 1 }}
                        type="number"
                        value={`${budgetTime} hr`}
                        onCancel={(v) => console.log("CANCELLED: ", v)}
                        onSave={(v) => handleSave(v)}
                      />
                    ) : (
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          textAlign: "center",
                          alignContent: "center",
                          justifyItems: "center",
                          justifyContent: "center",
                          alignSelf: "center",
                          pl: 1,
                        }}
                      >
                        {budgetTime} hr
                      </Typography>
                    )}
                  </Typography>
                </Typography>
              </Paper>
            </div>

            <Paper elevation={2} sx={{ pt: 1 }}>
              <hr />

              <EnhancedTable
                clientsList={clientsList}
                currentProject={currentProject}
                currentClient={currentClient}
                outerref={outerref}
              />
            </Paper>
          </Box>
        </Paper>
      </Box>
      <Confirmation
        open={ConfirmModal}
        handleClose={handleClose}
        onConfirm={handleProjectDelete}
        detail={{ type: "Project", name: currentProject?.name }}
      />
    </>
  );
}
