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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Main(props) {
  const {  currTeam, currMember, ...other } = props;
  const { User } = useContext(UserContext);
  const { dispatchEmployeeUpdate } = useContext(employeeContext);
  const { dispatchRemoveMember, dispatchgetTeam } = useContext(teamContext);
  const [Checked, setChecked] = useState();
  const handleLabelChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };
  console.log(currMember);

  const updatePayrate = async (value) => {
    const data = {
      payRate: value,
    };
    await employeeUpdate(currMember._id, data, dispatchEmployeeUpdate);
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

  const Labelconfig = function () {
    return (
      <>
        {currTeam.projects.map((pro) => (
          <FormControlLabel
            sx={{ display: "block", pt: 1, fontWeight: 10 }}
            control={<Switch checked={currMember.projects.includes(pro._id)} />}
            label={`${currTeam.name}(${pro.name})`}
            // onChange={(e) => {
            //   handleSwitchChange(e, pro, User.name);
            // }}
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
          sx={{ border: 1, height: "100%", overflow: "scroll" }}
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
                  <Typography sx={{ fontSize: 40 }}>
                    {getFullName(currMember?.firstName, currMember?.lastName)}
                  </Typography>
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
            <Box sx={{ mt: 2 }}>
              <FormControl component="fieldset" sx={{ pt: 2 }}>
                <Typography variant="h4">Role({currMember.role})</Typography>
                <RadioGroup
                  aria-label="Role"
                  defaultValue={currMember.role}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="Admin"
                    control={<Radio />}
                    label="Admin - full control over Team, Projects & Settings. Does not have access to owner's My Account page settings."
                  />
                  <FormControlLabel
                    value="Manager"
                    control={<Radio />}
                    label="Manager - can see selected user's Timeline & Reports (but not rates)"
                  />
                  <FormControlLabel
                    value="Employee"
                    control={<Radio />}
                    label="Employee - can see their own data only"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            {(currMember.role === "Manager" || currMember.role === "Admin") && (
              <Box>
                <Typography variant="h5">Manage for</Typography>
                <Typography varinat="body2">
                  If enabled, {currMember.firstName} {currMember.lastName} will
                  be able to see selected user's Timeline and Reports, but not
                  rates.
                </Typography>
                <Typography varinat="h6">
                  {User.map((user) => (
                    <FormControlLabel
                      sx={{ pt: 1, fontWeight: 10 }}
                      control={<Switch />}
                      label={user.name}
                    />
                  ))}
                </Typography>
              </Box>
            )}
            <Box sx={{ pt: 2 }}>
              <Typography variant="h5">Projects</Typography>
              <Link sx={{ pr: 1 }}>Add all</Link>
              <Link sx={{ pl: 1 }}>Remove all</Link>
              {/* <Container sx={{ display: "block" }}>{Labelconfig()}</Container> */}
            </Box>
            <Box sx={{ pt: 2, fontSize: "20px" }}>
              <Typography variant="h4">Effective Settings</Typography>
              {/* {currMember.settings &&
                Object.keys(currMember.settings).map((keyName, keyIndex) => (
                  <>
                    <Box
                      key={keyName}
                      sx={{ display: "flex", flexDirection: "rows" }}
                    >
                      <Typography
                        varihant="h6"
                        sx={{ pr: 2, fontSize: "20px", color: "success" }}
                      > */}
              {/* {convertString(keyName)} */}
              {/* {console.log(index)} */}
              {/* </Typography>
                      <RouterLink to="/dashboard/settings" sx={{ pr: 1 }}>
                        {currMember.settings[keyName] === true
                          ? "On"
                          : currMember.settings[keyName]}
                      </RouterLink>
                    </Box>
                  </>
                ))} */}
            </Box>
          </Typography>
        </Container>
      )}
    </>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  // index: PropTypes.number.isRequired,
  // value: PropTypes.number.isRequired,
};
