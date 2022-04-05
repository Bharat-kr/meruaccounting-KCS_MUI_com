import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";
import { reportsContext } from "../../contexts/ReportsContext";
import secondsToHms from "../../_helpers/secondsToHms";
import { Box, Typography } from "@mui/material";

export default function Bar() {
  const { savedReports } = React.useContext(reportsContext);
  const [totalHours, settotalHours] = useState(null);
  const [totalActCount, settotalCount] = useState(null);
  const [totalPData, settotalPData] = useState(null);
  const [totalPRate, settotalPRate] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    let t = 0;
    savedReports?.reports[0]?.byScreenshots?.forEach((ss) => {
      t = t + ss.actCount;
    });
    let arr = savedReports?.reports[0]?.byScreenshots?.map((ss) => {
      let o = {
        type: `${ss._id}`,
        value: ss.actCount,
      };
      return o;
    });
    setData(savedReports.reports[0]?.byDates);
    settotalHours(savedReports?.reports[0]?.total[0]?.totalHours);
    settotalPData(savedReports?.reports[0]?.total[0]?.avgPerformanceData);
    settotalCount(savedReports?.reports[0]?.total[0]?.actCount);
    settotalPRate(savedReports?.reports[0]?.total[0]?.avgPayRate);
  }, [savedReports]);

  const config = {
    data,
    xField: "_id",
    yField: "totalHours",
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    slider: {
      start: 0.1,
      end: 0.2,
    },
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Box>
        <Typography variant="h2" sx={{ opacity: 1, textAlign: "left", mb: 2 }}>
          Timeline
        </Typography>
      </Box>
      <Box>
        <div>
          <Column {...config} />
        </div>
      </Box>
    </Box>
  );
}
