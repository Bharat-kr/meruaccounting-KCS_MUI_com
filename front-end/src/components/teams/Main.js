import * as React from "react";
import { useContext, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  styled,
  Paper,
  Link,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Switch,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import EdiText from "react-editext";
import { UserContext, convertString } from "../../contexts/UserContext";
import { getFullName } from "src/_helpers/getFullName";
import { employeeUpdate } from "src/api/employee api/employee";
import { getTeam, removeMember } from "src/api/teams api/teams";
import { employeeContext } from "src/contexts/EmployeeContext";
import { teamContext } from "src/contexts/TeamsContext";
import { settingsValueToString } from "src/_helpers/settingsValuetoString";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Main(props) {
  const { currTeam, currMember, ...other } = props;
  const { dispatchEmployeeUpdate } = useContext(employeeContext);
  const { dispatchRemoveMember, dispatchgetTeam } = useContext(teamContext);
  const [Checked, setChecked] = useState();
  const handleLabelChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const updatePayrate = async (value) => {
    const data = {
      payRate: value,
    };
    await employeeUpdate(currMember._id, data, dispatchEmployeeUpdate);
    await getTeam(dispatchgetTeam);
  };

  const updateRole = async (e) => {
    const data = {
      role: e.target.value,
    };
    console.log(data);
    await employeeUpdate(currMember._id, data, dispatchEmployeeUpdate);
    await getTeam(dispatchgetTeam);
  };
  const deleteMember = async () => {
    const data = {
      employeeId: currMember._id,
      teamId: currTeam._id,
    };
    console.log(data);
    await removeMember(data, dispatchRemoveMember);
    await getTeam(dispatchgetTeam);
  };

  const handleChange = (e, value) => {
    const id = value._id;
    window.location.href = "#" + id;
  };

  const Labelconfig = function () {
    return (
      <>
        {currMember.projects.map((pro) => (
          <FormControlLabel
            id={`${pro._id}`}
            sx={{ display: "block", pt: 1, fontWeight: 10 }}
            control={<Switch checked />}
            label={`${pro.name}`}
          />
        ))}
      </>
    );
  };

  return (
    <>
      {currMember && (
        <Container
          component="div"
          sx={{ border: 1, height: "100%", overflow: "auto" }}
          role="tabpanel"
          id={`vertical-tabpanel`}
          aria-labelledby={`vertical-tab`}
          {...other}
        >
          <Typography sx={{ overflow: "auto" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                sx={{ display: "flex", justifyContent: "space-between" }}
                spacing={0}
              >
                <Grid xs={4}>
                  <RouterLink
                    to={`/dashboard/employeepage/${currMember._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography sx={{ fontSize: 40 }}>
                      {getFullName(currMember?.firstName, currMember?.lastName)}
                    </Typography>
                  </RouterLink>
                  <Divider />
                  <Typography variant="body1">{currMember?.email}</Typography>
                  <Grid xs={8} sx={{ mt: 2 }}>
                    <Typography variant="h4">Payrate</Typography>
                    <EdiText
                      type="number"
                      value={`${currMember.payRate}`}
                      onCancel={(v) => console.log("CANCELLED: ", v)}
                      onSave={(v) => updatePayrate(v)}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ padding: 1 }}>
                  <Link
                    data-key="1"
                    sx={{ padding: 1 }}
                    onClick={(e) => console.log(e.currentTarget.dataset.key)}
                  >
                    <PauseIcon sx={{ fontSize: "small" }} />
                    Pause
                  </Link>
                  <Link sx={{ padding: 1 }} onClick={deleteMember}>
                    <DeleteIcon sx={{ fontSize: "small" }} /> Delete
                  </Link>
                  <Link sx={{ padding: 1 }}>
                    <ArchiveIcon sx={{ fontSize: "small" }} />
                    Archive
                  </Link>
                </Box>
              </Grid>
            </Box>
            {currMember.role === "admin" && (
              <Box sx={{ mt: 2 }}>
                <FormControl component="fieldset" sx={{ pt: 2 }}>
                  <Typography variant="h4">Role({currMember.role})</Typography>
                  <RadioGroup
                    aria-label="Role"
                    value={currMember.role}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="admin"
                      control={<Radio onChange={updateRole} />}
                      label="Admin - full control over Team, Projects & Settings. Does not have access to owner's My Account page settings."
                    />
                    <FormControlLabel
                      value="manager"
                      control={<Radio onChange={updateRole} />}
                      label="Manager - can see selected user's Timeline & Reports (but not rates)"
                    />
                    <FormControlLabel
                      value="employee"
                      control={<Radio onChange={updateRole} />}
                      label="Employee - can see their own data only"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}
            {currMember.role === "admin" && (
              <Box>
                <Typography variant="h5">Manage for</Typography>
                <Typography varinat="body2">
                  If enabled,
                  {getFullName(currMember.firstName, currMember.lastName)} will
                  be able to see selected user's Timeline and Reports, but not
                  rates.
                </Typography>
                <Typography varinat="h6">
                  {/* {User.map((user) => (
                    <FormControlLabel
                      sx={{ pt: 1, fontWeight: 10 }}
                      control={<Switch />}
                      label={user.name}
                    />
                  ))} */}
                </Typography>
              </Box>
            )}
            <Box sx={{ pt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5">Projects</Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={currMember.projects}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Project" />
                  )}
                  onChange={handleChange}
                />
              </Box>
              <Link sx={{ pr: 1 }}>Add all</Link>
              <Link sx={{ pl: 1 }}>Remove all</Link>
              <Container sx={{ display: "block" }}>{Labelconfig()}</Container>
            </Box>
            <Box sx={{ pt: 2, fontSize: "20px" }}>
              <Typography variant="h4">Effective Settings</Typography>
              {currMember.settings &&
                Object.keys(currMember.settings).map((keyName, keyIndex) => (
                  <>
                    <Box
                      key={keyName}
                      sx={{ display: "flex", flexDirection: "rows" }}
                    >
                      <Typography
                        varihant="h6"
                        sx={{ pr: 2, fontSize: "20px", color: "success" }}
                      >
                        {convertString(keyName)}
                        {/* {console.log(index)} */}
                      </Typography>
                      <RouterLink to="/dashboard/settings" sx={{ pr: 1 }}>
                        {currMember.settings[keyName].isTeamSetting
                          ? settingsValueToString(
                              currMember.settings[keyName].teamValue
                            )
                          : settingsValueToString(
                              currMember.settings[keyName].individualValue
                            )}
                      </RouterLink>
                    </Box>
                  </>
                ))}
            </Box>
          </Typography>
        </Container>
      )}
    </>
  );
}

Main.propTypes = {
  children: PropTypes.node,
};
