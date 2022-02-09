/* eslint-disable consistent-return */
import React, { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Typography,
  Divider,
  Container,
  Radio,
  FormControlLabel,
  FormControl,
  FormGroup,
  RadioGroup,
  Switch,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { loginContext } from "src/contexts/LoginContext";
import { teamContext } from "src/contexts/TeamsContext";
import { getTeam } from "src/api/teams api/teams";
import { getFullName } from "src/_helpers/getFullName";
import axios from "axios";
import { convertString } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";
import { UserContext } from "../../contexts/UserContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

function checkheading(
  enqueueSnackbar,
  index,
  settings,
  id,
  isTeam,
  dispatchgetTeam
) {
  const days = [
    "Sunday",
    "Monday",
    "TuesDay",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //Common update setting for all functions
  const UpdateSettings = async (data) => {
    // console.log(settings);
    await axios
      .patch(`/employee/edit/${id}`, data)
      .then((res) => {
        console.log(res);
        getTeam(dispatchgetTeam);
        if (data !== 0 || null)
          enqueueSnackbar("Settings updated", { variant: "success" });
        else enqueueSnackbar("Enter Valid input", { variant: "info" });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "info" });
      });
  };

  //Screenshot per hour update function
  const changeScreenShotPerHour = async (e) => {
    e.preventDefault();
    const value = document.querySelector(`#screenShotPerHour${id}`).value;
    console.log(value);
    const data = {
      settings: {
        ...settings,
        ScreenShotPerHour: {
          isTeamSetting: settings.ScreenShotPerHour.isTeamSetting,
          individualValue:
            settings.ScreenShotPerHour.individualValue !== 0 ? 0 : value,
          teamValue: settings.ScreenShotPerHour.teamValue,
        },
      },
    };
    await UpdateSettings(data);
    if (value !== 0 || null)
      enqueueSnackbar("Settings Updated", { variant: "success" });
    else enqueueSnackbar("Enter valid input", { variant: "info" });
  };

  //Apps and url tracking Update function
  const changeAppsAndUrlTracking = async (e) => {
    e.preventDefault();
    const data = {
      settings: {
        ...settings,
        AppsAndUrlTracking: {
          isTeamSetting: settings.AppsAndUrlTracking.isTeamSetting,
          individualValue: !settings.AppsAndUrlTracking.individualValue,
          teamValue: settings.AppsAndUrlTracking.teamValue,
        },
      },
    };
    await UpdateSettings(data);
    if (data !== 0 || null)
      enqueueSnackbar("Settings Updated", { variant: "success" });
    else enqueueSnackbar("Enter valid input", { variant: "info" });
  };

  //Weekly time Limit Change Function
  const changeWeeklyTimeLimit = async (e) => {
    e.preventDefault();
    const value = document.querySelector(`#weekLimit${id}`).value;
    console.log(value);
    const data = {
      settings: {
        ...settings,
        WeeklyTimeLimit: {
          isTeamSetting: settings.WeeklyTimeLimit.isTeamSetting,
          individualValue:
            settings.WeeklyTimeLimit.individualValue !== 0 ? 0 : value,
          teamValue: settings.WeeklyTimeLimit.teamValue,
        },
      },
    };
    await UpdateSettings(data);
  };

  //AutoPause Update Function
  const changeAutoPause = async (e) => {
    e.preventDefault();
    const value = document.querySelector(`#autoPause${id}`).value;
    console.log(value);
    const data = {
      settings: {
        ...settings,
        AutoPause: {
          isTeamSetting: settings.AutoPause.isTeamSetting,
          individualValue: settings.AutoPause.individualValue !== 0 ? 0 : value,
          teamValue: settings.AutoPause.teamValue,
        },
      },
    };
    await UpdateSettings(data);
  };

  //Offline Time Update Function
  const changeOfflineTime = async (e) => {
    e.preventDefault();
    const data = {
      settings: {
        ...settings,
        OfflineTime: {
          isTeamSetting: settings.OfflineTime.isTeamSetting,
          individualValue: !settings.OfflineTime.individualValue,
          teamValue: settings.OfflineTime.teamValue,
        },
      },
    };
    await UpdateSettings(data);
  };

  //Notify User update function
  const changeNotifyUser = async (e) => {
    e.preventDefault();
    const data = {
      settings: {
        ...settings,
        NotifyUser: {
          isTeamSetting: settings.NotifyUser.isTeamSetting,
          individualValue: !settings.NotifyUser.individualValue,
          teamValue: settings.NotifyUser.teamValue,
        },
      },
    };
    await UpdateSettings(data);
  };

  // WeekStart Update Function
  const changeWeekStart = async (e) => {
    e.preventDefault();
    const data = {
      settings: {
        ...settings,
        WeekStart: {
          isTeamSetting: settings.WeekStart.isTeamSetting,
          individualValue: days[e.target.value],
          teamValue: settings.WeekStart.teamValue,
        },
      },
    };
    await UpdateSettings(data);
  };

  //Currency Symbol update Function
  const changeCurrencySymbol = async (e) => {
    e.preventDefault();
    const value = document.querySelector(`#currencySymbol${id}`).value;
    console.log(value);
    const data = {
      settings: {
        ...settings,
        CurrencySymbol: {
          isTeamSetting: settings.CurrencySymbol.isTeamSetting,
          individualValue: value,
          teamValue: settings.CurrencySymbol.teamValue,
        },
      },
    };
    await UpdateSettings(data);
  };

  if (index === 0) {
    return (
      <>
        <FormControlLabel
          value="Take"
          control={
            <Radio
              onClick={changeScreenShotPerHour}
              checked={
                settings?.ScreenShotPerHour &&
                settings?.ScreenShotPerHour[isTeam]
              }
            />
          }
          label="Take"
        />
        <TextField
          sx={{ m: 1.5 }}
          id={`screenShotPerHour${id}`}
          label="Hours per week"
          type="number"
          defaultValue={
            settings?.ScreenShotPerHour && settings?.ScreenShotPerHour[isTeam]
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControlLabel
          value="Do not take"
          control={
            <Radio
              onClick={changeScreenShotPerHour}
              checked={
                settings?.ScreenShotPerHour &&
                !settings?.ScreenShotPerHour[isTeam]
              }
            />
          }
          label="Do not take"
        />
      </>
    );
  }
  if (index === 1) {
    return (
      <>
        <FormControlLabel
          value="Track"
          control={
            <Radio
              onClick={changeAppsAndUrlTracking}
              checked={settings.AppsAndUrlTracking[isTeam]}
            />
          }
          label="Track"
        />
        <FormControlLabel
          value="Do not track"
          control={
            <Radio
              onClick={changeAppsAndUrlTracking}
              checked={!settings.AppsAndUrlTracking[isTeam]}
            />
          }
          label="Do not track"
        />
      </>
    );
  }
  if (index === 2) {
    return (
      <>
        <FormControlLabel
          value="Limit"
          control={
            <Radio
              onClick={changeWeeklyTimeLimit}
              checked={settings.WeeklyTimeLimit[isTeam]}
            />
          }
          label="Limit"
        />
        <TextField
          sx={{ m: 1.5 }}
          id={`weekLimit${id}`}
          label="Hours per week"
          type="number"
          defaultValue={settings.WeeklyTimeLimit[isTeam]}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControlLabel
          value="Do not limit"
          control={
            <Radio
              onClick={changeWeeklyTimeLimit}
              checked={!settings.WeeklyTimeLimit[isTeam]}
            />
          }
          label="Do not limit"
        />
      </>
    );
  }
  if (index === 3) {
    return (
      <>
        <FormControlLabel
          value="Pause"
          control={
            <Radio
              onClick={changeAutoPause}
              checked={settings.AutoPause[isTeam]}
            />
          }
          label="Pause after"
        />
        <TextField
          sx={{ m: 1.5 }}
          id={`autoPause${id}`}
          label="Time limit"
          type="number"
          defaultValue={settings.AutoPause[isTeam]}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography sx={{ mt: 3, mr: 2, fontSize: "18px" }}>
          minutes of user activity
        </Typography>
        <FormControlLabel
          value="Do not pause"
          control={
            <Radio
              onClick={changeAutoPause}
              checked={!settings.AutoPause[isTeam]}
            />
          }
          label="Do not pause"
        />
      </>
    );
  }
  if (index === 4) {
    return (
      <>
        <FormControlLabel
          value="Allow"
          control={
            <Radio
              onClick={changeOfflineTime}
              checked={settings.OfflineTime[isTeam]}
            />
          }
          label="Allow"
        />
        <FormControlLabel
          value="Disallow"
          control={
            <Radio
              onClick={changeOfflineTime}
              checked={!settings.OfflineTime[isTeam]}
            />
          }
          label="Disallow"
        />
      </>
    );
  }
  if (index === 5) {
    return (
      <>
        <FormControlLabel
          value="Notify"
          control={
            <Radio
              onClick={changeNotifyUser}
              checked={settings.NotifyUser[isTeam]}
            />
          }
          label="Notify"
        />
        <FormControlLabel
          value="Do not notify"
          control={
            <Radio
              onClick={changeNotifyUser}
              checked={!settings.NotifyUser[isTeam]}
            />
          }
          label="Do not notify"
        />
      </>
    );
  }
  if (index === 6) {
    return (
      <>
        <Box sx={{ width: "100%", mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Day</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={days.indexOf(settings.WeekStart[isTeam])}
              label="Day"
              onChange={changeWeekStart}
            >
              {days.map((el, index) => {
                return <MenuItem value={index}>{el}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </>
    );
  }
  if (index === 7) {
    return (
      <>
        <TextField
          sx={{ m: 1.5 }}
          id={`currencySymbol${id}`}
          label="Currency"
          type="text"
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              changeCurrencySymbol(e);
            }
          }}
          defaultValue={settings.CurrencySymbol[isTeam]}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </>
    );
  }
}

export default function SettingsMain(props) {
  const { index, heading, subheading, ...other } = props;
  const { loginC } = useContext(loginContext);
  const { dispatchgetTeam, getTeams } = useContext(teamContext);
  const { tab, changeTab } = useContext(UserContext);

  const [teamsList, setTeamsList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getTeam(dispatchgetTeam);
  }, []);
  const [settings, setSettings] = useState({});
  // data is in variable but not showing on the screen

  useEffect(() => {
    // setSettings(loginC.userData.settings);
    const data = [];
    getTeams?.getTeam?.forEach((team) => {
      // eslint-disable-next-line prefer-template

      team.members?.map((member) => {
        if (
          !data.find((el) => {
            return el.id === member._id;
          })
        ) {
          data.push({
            name: getFullName(member.firstName, member.lastName),
            id: member._id,
            settings: member.settings,
          });
        }
      });
    });
    setTeamsList(data);
  }, [getTeams]);
  const userChange = async (user, settings, keyName, e) => {
    const data = {
      settings: {
        ...settings,
        [keyName]: {
          isTeamSetting: !e.target.checked,
          teamValue: settings[keyName].teamValue,
          individualValue: settings[keyName].individualValue,
        },
      },
    };
    console.log(data);
    await axios
      .patch(`/employee/edit/${user.id}`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          getTeam(dispatchgetTeam);
          if (data !== null)
            enqueueSnackbar("Employee edited", { variant: "success" });
          else enqueueSnackbar("Enter number", { variant: "info" });
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.message, { variant: "info" });
      });

    // console.log(data);
  };
  useEffect(() => {
    axios
      .post("/commondata")
      .then((res) => {
        // console.log(res);
        setSettings(res.data.user.settings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {tab === index && (
        <Box
          component="div"
          sx={{ pb: 2, height: "70vh", overflowY: "auto", overflowX: "auto" }}
          role="tabpanel"
          hidden={tab !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          <Typography variant="h3">{convertString(heading)}</Typography>
          <Divider />
          <Box sx={{ height: "auto", width: "100%", bgcolor: "#C8DCFD", p: 1 }}>
            {subheading}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography varinat="h3" sx={{ fontWeight: "bold" }}>
              Individual Settings
            </Typography>
            <Typography>
              If enabled, individual settings will be used instead of the team
              Settings
            </Typography>
            <Box>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={teamsList.map((user) => user.name)}
                sx={{ width: 300, mt: 4 }}
                renderInput={(params) => <TextField {...params} label="User" />}
              />
              {getTeams.loader && (
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
              )}
              {teamsList.map((user) => (
                <FormGroup row sx={{ pt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        defaultChecked={!user.settings[heading]?.isTeamSetting}
                        onChange={(e) => {
                          userChange(user, user.settings, heading, e);
                        }}
                      />
                    }
                    label={user.name}
                  />
                  {/* {userChange()} */}
                  {!user.settings[heading]?.isTeamSetting && (
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="option"
                        name="row-radio-buttons-group"
                      >
                        {checkheading(
                          enqueueSnackbar,
                          index,
                          user.settings,
                          user.id,
                          "individualValue",
                          dispatchgetTeam
                        )}
                      </RadioGroup>
                    </FormControl>
                  )}
                </FormGroup>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
