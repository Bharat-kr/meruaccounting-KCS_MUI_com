import React, { useState, useEffect, useContext } from "react";
import { CssBaseline, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Calendar from "../components/EmployeePage/Calendar";

// components
import Overview from "../components/EmployeePage/Overview";
import ScreenShots from "../components/EmployeePage/ScreenShots";
import Timeline from "../components/EmployeePage/Timeline";
import PageHeader from "../components/PageHeader";
import IntExt from "../components/EmployeePage/IntExt";

// contexts
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// eslint-disable-next-line import/no-named-as-default
// import { getCommonData } from "../api/auth api/commondata";
import { getCommonData } from "../api/auth api/commondata";
import moment from "moment";
import axios from "axios";
import { getFullName } from "src/_helpers/getFullName";
import { TrendingUpRounded } from "@material-ui/icons";

export default function EmployeePage() {
  const { id } = useParams();
  const [activities, setactivities] = useState([]);
  const { dispatchCommonData } = useContext(CurrentUserContext);
  const [isInternal, setisInternal] = useState(false);
  const [date, setdate] = useState(moment().format("DD/MM/YYYY"));
  // const { commonData } = useContext(CurrentUserContext);
  const [commonData, setCommonData] = useState(null);

  const getUserData = async () => {
    await axios
      .get(`/employee/${id}`)
      .then((res) => {
        console.log(res.data);
        setCommonData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // interval for getting common data each minute
  useEffect(() => {
    getUserData();
    // getCommonData(dispatchCommonData);
    let cDataInterval = setInterval(() => {
      // getCommonData(dispatchCommonData);
      getUserData();
    }, 60000);
    return () => clearInterval(cDataInterval);
  }, []);

  // filter out activities
  useEffect(() => {
    console.log(commonData);
    if (commonData) {
      setactivities(
        commonData.days
          .filter((day) => day.date === date)[0]
          ?.activities.filter((act) => {
            return act.isInternal === isInternal;
          })
      );
    } else {
      return;
    }
    console.log(activities);
  }, [commonData, isInternal, date]);

  return (
    <CssBaseline>
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <PageHeader
          title={getFullName(commonData?.firstName, commonData?.lastName)}
        />
        <Calendar
          days={commonData?.days}
          setDate={(date) =>
            setdate((prev) => {
              console.log(date);
              return date;
            })
          }
        />
        <Overview date={date} days={commonData?.days} />
        <Timeline activities={activities} />
        <IntExt
          setInternal={(isInt) =>
            setisInternal((prev) => {
              return isInt;
            })
          }
        />
        <ScreenShots
          activities={activities}
          date={date}
          commonData={commonData}
        />
      </Box>
    </CssBaseline>
  );
}
