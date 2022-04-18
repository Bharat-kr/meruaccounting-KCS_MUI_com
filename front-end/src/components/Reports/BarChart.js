import React, { useState, useEffect, useContext } from "react";
import { Column } from "@ant-design/plots";
import { reportsContext } from "../../contexts/ReportsContext";
import secondsToHms from "../../_helpers/secondsToHms";
import { Box, Typography } from "@mui/material";
import { loginContext } from "src/contexts/LoginContext";
import { Role } from "../../_helpers/role";

export default function Bar({ timeRange }) {
  const { reports } = React.useContext(reportsContext);
  const [totalHours, settotalHours] = useState(null);
  const [totalActCount, settotalCount] = useState(null);
  const [totalPData, settotalPData] = useState(null);
  const [totalPRate, settotalPRate] = useState(null);
  const [data, setData] = useState([]);

  const { loginC } = useContext(loginContext);

  useEffect(() => {
    let t = 0;
    reports?.reports[0]?.byScreenshots?.forEach((ss) => {
      t = t + ss.actCount;
    });
    console.log(t);
    let arr = reports?.reports[0]?.byScreenshots?.map((ss) => {
      let o = {
        type: `${ss._id}`,
        value: ss.actCount,
      };
      return o;
    });
    console.log(timeRange);
    setData(reports.reports[0]?.byDates);
    settotalHours(reports?.reports[0]?.total[0]?.totalHours);
    settotalPData(reports?.reports[0]?.total[0]?.avgPerformanceData);
    settotalCount(reports?.reports[0]?.total[0]?.actCount);
    settotalPRate(reports?.reports[0]?.total[0]?.avgPayRate);
  }, [reports]);

  const config = {
    data,
    xField: "_id",
    yField: "totalHours",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    // meta: {
    //   type: {
    //     alias: "类别",
    //   },
    //   sales: {
    //     alias: "销售额",
    //   },
    // },
  };

  // const configCustom = {
  //   data,
  //   xField: "_id",
  //   yField: "totalHours",
  //   xAxis: {
  //     label: {
  //       autoRotate: false,
  //     },
  //   },
  //   slider: {
  //     start: 0.1,
  //     end: 0.2,
  //   },
  // };

  return (
    <Box>
      <Box sx={{}}>
        <Typography variant="h2" sx={{ opacity: 1, textAlign: "left" }}>
          Timeline
        </Typography>
      </Box>
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" sx={{ opacity: 0.6, textAlign: "left" }}>
            {secondsToHms(totalHours)}
          </Typography>
          <Typography variant="h4" sx={{ opacity: 0.6, textAlign: "left" }}>
            {Math.trunc(totalPData)}%
          </Typography>

          {Role.indexOf(loginC.userData.role) <= 1 ? (
            <Typography variant="h4" sx={{ opacity: 0.6, textAlign: "left" }}>
              {Math.trunc((totalPRate * totalHours) / 3600)}{" "}
              <span>&#8377;</span>
            </Typography>
          ) : (
            ""
          )}
        </Box>
        <div>
          <Column {...config} />
        </div>
      </Box>
    </Box>
  );
}
