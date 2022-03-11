import React, { useState, useEffect, useContext } from "react";
import { CssBaseline, Box } from "@mui/material";
import Calendar from "../components/UserPage/Calendar";

// components
import Overview from "../components/UserPage/Overview";
import ScreenShots from "../components/UserPage/ScreenShots";
import Timeline from "../components/UserPage/Timeline";
import PageHeader from "../components/PageHeader";
import IntExt from "../components/UserPage/IntExt";

// contexts
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { loginContext } from "../contexts/LoginContext";

// eslint-disable-next-line import/no-named-as-default
// import { getCommonData } from "../api/auth api/commondata";
import { getCommonData } from "../api/auth api/commondata";
import moment from "moment";
import { useLocation } from "react-router-dom";
import OfflineTime from "src/components/UserPage/OfflineTime";

export default function UserPage() {
  const { loginC } = useContext(loginContext);
  console.table(loginC);

  const [activities, setactivities] = useState([]);
  const { dispatchCommonData } = useContext(CurrentUserContext);
  const [isInternal, setisInternal] = useState(false);
  const location = useLocation();
  const [date, setdate] = useState(
    moment()
      .subtract(location.state === "yesterday" ? 1 : 0, "day")
      .format("DD/MM/YYYY")
  );
  const [dateObj, setdateObj] = useState(
    moment().subtract(location.state === "yesterday" ? 1 : 0, "day")
  );
  const { commonData } = useContext(CurrentUserContext);

  // interval for getting common data each minute
  useEffect(() => {
    getCommonData(dispatchCommonData);
    let cDataInterval = setInterval(() => {
      getCommonData(dispatchCommonData);
    }, 60000);
    return () => clearInterval(cDataInterval);
  }, []);

  // filter out activities
  useEffect(() => {
    console.log(commonData);
    if (commonData.loader === false) {
      setactivities(
        commonData?.commonData?.user?.days
          .filter((day) => day.date === date)[0]
          ?.activities.filter((act) => {
            return act.isInternal === isInternal;
          })
          .sort(function (a, b) {
            return a.startTime - b.startTime;
          })
      );
      // setactivities(prev => [...prev.sort(function(a, b){return a.startTime - b.startTime})])
    } else {
      return;
    }
  }, [commonData, isInternal, date]);

  return (
    <CssBaseline>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <PageHeader title="Hi, Welcome Back!" />
        <Calendar
          date={dateObj.format("D")}
          days={commonData?.commonData?.user?.days}
          setDate={(date) =>
            setdate((prev) => {
              console.log(date);
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
