import React, { useState, useEffect, useContext } from "react";
import { CssBaseline, Box } from "@mui/material";
import moment from "moment";
import { useParams, useLocation } from "react-router-dom";

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

export default function UserPage() {
  const [activities, setactivities] = useState([]);
  const { commonData, dispatchCommonData } = useContext(EmployeePageContext);
  const [isInternal, setisInternal] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const [date, setdate] = useState(
    moment()
      .subtract(location.state === "yesterday" ? 1 : 0, "day")
      .format("DD/MM/YYYY")
  );
  const [dateObj, setdateObj] = useState(
    moment().subtract(location.state === "yesterday" ? 1 : 0, "day")
  );

  // interval for getting common data each minute
  useEffect(() => {
    getCommonData(id, dispatchCommonData);
    let cDataInterval = setInterval(() => {
      getCommonData(id, dispatchCommonData);
    }, 60000);
    return () => clearInterval(cDataInterval);
  }, []);

  // filter out activities
  useEffect(() => {
    console.log(commonData);
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

  return (
    <CssBaseline>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <PageHeader
          title={getFullName(
            commonData?.commonData?.user?.firstName,
            commonData?.commonData?.user?.lastName
          )}
        />
        <Calendar
          days={commonData?.commonData?.user?.days}
          date={dateObj.format("D")}
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
