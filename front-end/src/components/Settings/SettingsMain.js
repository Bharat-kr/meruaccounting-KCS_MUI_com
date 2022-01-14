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
} from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { loginContext } from "src/contexts/LoginContext";
import { teamContext } from "src/contexts/TeamsContext";
import { getTeam } from "src/api/teams api/teams";
import { getFullName } from "src/_helpers/getFullName";
import axios from "axios";
import { convertString } from "../../contexts/UserContext";

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
  index,
  settings,
  setSettings,
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
        if (res.data.data.role === "manager") {
          setSettings(res.data.data.settings);
        } else {
          getTeam(dispatchgetTeam);
        }
      })
      .catch((err) => {
        console.log(err);
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
          teamValue: settings.ScreenShotPerHour.teamValue !== 0 ? 0 : value,
          individualValue: settings.ScreenShotPerHour.individualValue,
        },
      },
    };
    const data2 = {
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
    // console.log(settings);
    if (isTeam === "teamValue") {
      await UpdateSettings(data);
    } else {
      await UpdateSettings(data2);
    }
  };

  //Apps and url tracking Update function
  const changeAppsAndUrlTracking = async (e) => {
    e.preventDefault();

    const data = {
      settings: {
        ...settings,
        AppsAndUrlTracking: {
          isTeamSetting: settings.AppsAndUrlTracking.isTeamSetting,
          teamValue: !settings.AppsAndUrlTracking.teamValue,
          individualValue: settings.AppsAndUrlTracking.individualValue,
        },
      },
    };
    const data2 = {
      settings: {
        ...settings,
        AppsAndUrlTracking: {
          isTeamSetting: settings.AppsAndUrlTracking.isTeamSetting,
          individualValue: !settings.AppsAndUrlTracking.individualValue,
          teamValue: settings.AppsAndUrlTracking.teamValue,
        },
      },
    };
    // console.log(settings);
    if (isTeam === "teamValue") {
      await UpdateSettings(data);
    } else {
      await UpdateSettings(data2);
    }
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
          teamValue: settings.WeeklyTimeLimit.teamValue !== 0 ? 0 : value,
          individualValue: settings.WeeklyTimeLimit.individualValue,
        },
      },
    };
    const data2 = {
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
    // console.log(settings);
    if (isTeam === "teamValue") {
      await UpdateSettings(data);
    } else {
      await UpdateSettings(data2);
    }
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
          teamValue: settings.AutoPause.teamValue !== 0 ? 0 : value,
          individualValue: settings.AutoPause.individualValue,
        },
      },
    };
    const data2 = {
      settings: {
        ...settings,
        AutoPause: {
          isTeamSetting: settings.AutoPause.isTeamSetting,
          individualValue: settings.AutoPause.individualValue !== 0 ? 0 : value,
          teamValue: settings.AutoPause.teamValue,
        },
      },
    };
    // console.log(settings);
    if (isTeam === "teamValue") {
      await UpdateSettings(data);
    } else {
      await UpdateSettings(data2);
    }
  };

  //Offline Time Update Function
  const changeOfflineTime = async (e) => {
    e.preventDefault();

    const data = {
      settings: {
        ...settings,
        OfflineTime: {
          isTeamSetting: settings.OfflineTime.isTeamSetting,
          teamValue: !settings.OfflineTime.teamValue,
          individualValue: settings.OfflineTime.individualValue,
        },
      },
    };
    const data2 = {
      settings: {
        ...settings,
        OfflineTime: {
          isTeamSetting: settings.OfflineTime.isTeamSetting,
          individualValue: !settings.OfflineTime.individualValue,
          teamValue: settings.OfflineTime.teamValue,
        },
      },
    };
    // console.log(settings);
    if (isTeam === "teamValue") {
      await UpdateSettings(data);
    } else {
      await UpdateSettings(data2);
    }
  };

  //Notify User update function
  const changeNotifyUser = async (e) => {
    e.preventDefault();

    const data = {
      settings: {
        ...settings,
        NotifyUser: {
          isTeamSetting: settings.NotifyUser.isTeamSetting,
          teamValue: !settings.NotifyUser.teamValue,
          individualValue: settings.NotifyUser.individualValue,
        },
      },
    };
    const data2 = {
      settings: {
        ...settings,
        NotifyUser: {
          isTeamSetting: settings.NotifyUser.isTeamSetting,
          individualValue: !settings.NotifyUser.individualValue,
          teamValue: settings.NotifyUser.teamValue,
        },
      },
    };
    // console.log(settings);
    if (isTeam === "teamValue") {
      await UpdateSettings(data);
    } else {
      await UpdateSettings(data2);
    }
  };

  // WeekStart Update Function
  const changeWeekStart = async (e) => {
    e.preventDefault();

    const data = {
      settings: {
        ...settings,
        WeekStart: {
          isTeamSetting: settings.WeekStart.isTeamSetting,
          teamValue: days[e.target.value],
          individualValue: settings.WeekStart.individualValue,
        },
      },
    };
    const data2 = {
      settings: {
        ...settings,
        WeekStart: {
          isTeamSetting: settings.WeekStart.isTeamSetting,
          individualValue: days[e.target.value],
          teamValue: settings.WeekStart.teamValue,
        },
      },
    };
    if (isTeam === "teamValue") {
      await UpdateSettings(data);
    } else {
      await UpdateSettings(data2);
    }
    // setSettings(res.data.data.settings);
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
          teamValue: value,
          individualValue: settings.CurrencySymbol.individualValue,
        },
      },
    };
    const data2 = {
      settings: {
        ...settings,
        CurrencySymbol: {
          isTeamSetting: settings.CurrencySymbol.isTeamSetting,
          individualValue: value,
          teamValue: settings.CurrencySymbol.teamValue,
        },
      },
    };
    if (isTeam === "teamValue") {
      await UpdateSettings(data);
    } else {
      await UpdateSettings(data2);
    }
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
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Allow Blur", "Blur All", "Disallow"]}
          sx={{ width: 240, margin: "2px 10px 2px 10px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={settings?.AllowBlur?.teamValue ? "Allow blur" : "Disallow"}
            />
          )}
        /> */}
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
  const { value, index, heading, subheading, ...other } = props;
  const { loginC } = useContext(loginContext);
  const { dispatchgetTeam, getTeams } = useContext(teamContext);

  const [teamsList, setTeamsList] = useState([]);

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
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(data);
  };
  useEffect(() => {
    axios
      .get("/commondata")
      .then((res) => {
        // console.log(res);
        setSettings(res.data.user.settings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const effectiveArr = [
  //   "Screenshot Per Hour",
  //   "Apps & Urls tracking",
  //   "Weekly time limit after",
  //   "Auto-pause tracking after",
  //   "Allow adding Offline time",
  //   "Notify when Screenshot is taken",
  //   "Week starts on",
  //   "Currency symbol",
  //   "Employee desktop application settings",
  // ];
  // const test = false;

  return (
    <>
      {value === index && (
        <Container
          component="div"
          sx={{ pb: 2 }}
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          <Typography variant="h3">{convertString(heading)}</Typography>
          <Divider />
          <Box sx={{ height: "auto", width: "100%", bgcolor: "#bdf2bf", p: 1 }}>
            {subheading}
          </Box>
          <Box>
            {/* <FormLabel component="legend">Gender</FormLabel> */}

            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="option"
                name="row-radio-buttons-group"
              >
                {checkheading(
                  index,
                  settings,
                  setSettings,
                  loginC.userData._id,
                  "teamValue",
                  dispatchgetTeam
                )}
              </RadioGroup>
            </FormControl>
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
                          index,
                          user.settings,
                          setSettings,
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
        </Container>
      )}
    </>
  );
}
