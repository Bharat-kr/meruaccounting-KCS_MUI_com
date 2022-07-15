import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { CssBaseline, Box, Autocomplete, TextField } from "@mui/material";
import moment from "moment";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// components
import Calendar from "../components/EmployeePage/Calendar";
import Overview from "../components/EmployeePage/Overview";
import ScreenShots from "../components/EmployeePage/ScreenShots";
import Timeline from "../components/EmployeePage/Timeline";
import PageHeader from "../components/PageHeader";
import IntExt from "../components/EmployeePage/IntExt";

// contexts
import { EmployeePageContext } from "src/contexts/EmployeePageContext";

//api
import { getCommonData } from "../api/employee api/employeePage";
import { getFullName } from "src/_helpers/getFullName";
import OfflineTime from "src/components/EmployeePage/OfflineTime";
import { getTeamCommonData } from "src/api/auth api/commondata";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";

export default function UserPage() {
  const [activities, setactivities] = useState([]);
  const { commonData, dispatchCommonData } = useContext(EmployeePageContext);
  const navigate = useNavigate();
  const { dispatchTeamCommonData, teamCommonData } =
    useContext(CurrentUserContext);
  const [isInternal, setisInternal] = useState(false);
  const { id } = useParams();
  const [teamsList, setTeamsList] = useState([]);
  const location = useLocation();
  const [date, setdate] = useState(
    moment()
      .subtract(location.state === "yesterday" ? 1 : 0, "day")
      .format("DD/MM/YYYY")
  );
  const [dateObj, setdateObj] = useState(
    moment().subtract(location.state === "yesterday" ? 1 : 0, "day")
  );
  useLayoutEffect(() => {
    let pushData = [];
    let int = setInterval(() => {
      getTeamCommonData(dispatchTeamCommonData);
    }, [120000]);

    teamCommonData?.data?.data?.forEach((mem) => {
      pushData.push({
        id: mem._id,
        Employee: `${mem.firstName} ${mem.lastName}`,
      });
    });
    setTeamsList(pushData);
    return () => clearInterval(int);
  }, []);
  // interval for getting common data each minute
  useEffect(() => {
    getCommonData(id, dispatchCommonData);
    let cDataInterval = setInterval(() => {
      getCommonData(id, dispatchCommonData);
    }, 60000);
    return () => clearInterval(cDataInterval);
  }, [id]);

  // filter out activities
  useEffect(() => {
    if (commonData.loader === false) {
      setactivities(
        commonData.commonData.user?.days
          ?.filter((day) => day.date === date)[0]
          ?.activities.filter((act) => {
            return act.isInternal === isInternal;
          })
          .sort(function (a, b) {
            return a.startTime - b.startTime;
          })
      );
    } else {
      return;
    }
  }, [commonData, isInternal, date]);

  const handleSearch = (e, value) => {
    const member = teamsList.filter((member) =>
      member.Employee === value ? member : ""
    );
    if (member.length === 0) {
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      navigate(`/dashboard/employeepage/${member[0].id}`);
    }
  };

  return (
    <CssBaseline>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <PageHeader
          title={getFullName(
            commonData?.commonData?.user?.firstName,
            commonData?.commonData?.user?.lastName
          )}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            mb: 4,
            pr:2
          }}
        >
          <Autocomplete
            disablePortal
            onChange={handleSearch}
            id="employee-search"
            options={teamsList.map((element) => element.Employee)}
            sx={{
              width: 300,
              height: 20,
              pb: 3,
              mb: 2,
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search Employee" />
            )}
          />
        </Box>
        <Calendar
          days={commonData?.commonData?.user?.days}
          date={dateObj.format("D")}
          setDate={(date) =>
            setdate((prev) => {
              return date;
            })
          }
          setDateObj={(obj) => {
            setdateObj((prev) => {
              return obj;
            });
          }}
        />
        <Overview
          date={date}
          dateObj={dateObj}
          days={commonData?.commonData?.user?.days}
          activities={activities}
        />
        <Timeline activities={activities} />
        <IntExt
          setInternal={(isInt) =>
            setisInternal((prev) => {
              return isInt;
            })
          }
        />
        <ScreenShots activities={activities} date={date} />
        {commonData?.commonData?.user?.settings.OfflineTime.individualValue && (
          <OfflineTime date={dateObj} />
        )}
      </Box>
    </CssBaseline>
  );
}
