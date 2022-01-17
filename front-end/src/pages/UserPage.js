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
// eslint-disable-next-line import/no-named-as-default
import CurrentUserContextProvider from "../contexts/CurrentUserContext";
import { LoginProvider } from "../contexts/LoginContext";
// import { getCommonData } from "../api/auth api/commondata";
import { getCommonData } from "../api/auth api/commondata";
import moment from "moment";

export default function UserPage() {
  const [activities, setactivities] = useState([]);
  const { dispatchCommonData } = useContext(CurrentUserContext);
  const [isInternal, setisInternal] = useState(false);
  const [date, setdate] = useState("15/01/2022");
  // const [date, setdate] = useState(moment().format("DD/MM/YYYY"));
  // const date = '15/01/2022'

  const { commonData } = useContext(CurrentUserContext);
  // interval for getting common data each minute
  useEffect(() => {
    getCommonData(dispatchCommonData);
    let cDataInterval = setInterval(() => {
      getCommonData(dispatchCommonData);
    }, 60000);
    return () => clearInterval(cDataInterval);
  }, []);

  useEffect(() => {
    if (commonData.loader === false) {
      setactivities(
        commonData.commonData.user.days
          .filter((day) => day.date === date.replace("/0", "/"))[0]
          ?.activities.filter((act) => {
            console.log(isInternal);
            console.log(act.isInternal);
            return act.isInternal === isInternal;
          })
      );
    } else {
      return;
    }
  }, [commonData, isInternal, date]);

  return (
    <CssBaseline>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <PageHeader title="Hi, Welcome Back!" />
        <Calendar
          setDate={(date) =>
            setdate((prev) => {
              console.log(date);
              return date;
            })
          }
        />
        <Overview />
        <Timeline activities={activities} />
        <IntExt
          setInternal={(isInt) =>
            setisInternal((prev) => {
              return isInt;
            })
          }
        />

        <ScreenShots activities={activities} date={date} />
      </Box>
    </CssBaseline>
  );
}
