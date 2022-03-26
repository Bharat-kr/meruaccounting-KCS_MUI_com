import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import { reportsContext } from "../../contexts/ReportsContext";
import secondsToHms from "../../_helpers/secondsToHms";
import { Box, Typography } from "@mui/material";

export default function AppsCharts(props) {
  const { savedReports } = React.useContext(reportsContext);
  const [chartData, setchartData] = useState([]);
  const [totalHours, settotalHours] = useState(null);
  const [totalActCount, settotalCount] = useState(null);
  const [totalPData, settotalPData] = useState(null);

  useEffect(() => {
    let t = 0;
    savedReports.reports[0].byScreenshots.forEach((ss) => {
      t = t + ss.actCount;
    });
    console.log(t);
    let arr = savedReports.reports[0].byScreenshots.map((ss) => {
      let o = {
        type: `${ss._id}`,
        value: ss.actCount,
      };
      return o;
    });
    setchartData(arr);
    settotalHours(savedReports?.reports[0]?.total[0]?.totalHours);
    settotalPData(savedReports?.reports[0]?.total[0]?.avgPerformanceData);
    settotalCount(savedReports?.reports[0]?.total[0]?.actCount);
  }, [savedReports]);

  const config = {
    width: 1000,
    data: chartData,
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    label: {
      formatter: (datum) => {
        return `${datum.type}`;
      },
      autoHide: true,
      type: "spider",
      labelHeight: 28,
    },
    tooltip: {
      formatter: (datum) => {
        return {
          name: datum.type,
          value: Math.trunc((datum.value * 100) / totalActCount) + "%",
        };
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };
  return (
    <Box sx={{ mt: 8 }}>
      <Box>
        <Typography variant="h2" sx={{ opacity: 1, textAlign: "left", mb: 2 }}>
          Apps Reports
        </Typography>
      </Box>
      <Box>
        <div>
          <Pie style={{ flexGrow: "2" }} {...config} />
        </div>
      </Box>
    </Box>
  );
}
