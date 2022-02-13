import React, { useState } from "react";
import { reportsContext } from "../../contexts/ReportsContext";
import secondsToHms from "../../_helpers/secondsToHms";
import { CanvasJSChart } from "canvasjs-react-charts";

export default function AppsCharts() {
  const { reports } = React.useContext(reportsContext);
  const [apps, setapps] = useState([]);
  const [state, setState] = useState([]);
  const [totalTime, settotalTime] = useState(100);

  //  set data
  React.useEffect(() => {
    setapps(reports.reports.data[0].byScreenshots);
  }, [reports]);
  console.log(apps);

  React.useEffect(() => {
    let tt = 0;
    apps.forEach((app) => {
      tt = tt + app.totalHours;
    });
    settotalTime(tt);
    apps.map((app) => {
      let obj = {
        label: app._id,
        y: (100 * (app.totalHours / tt)).toString(),
        hhmm: secondsToHms(app.totalHours),
      };
      if (obj.y > 10) setState((prev) => [...prev, obj]);
    });
  }, [apps]);
  console.log(state);

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Hours worked for apps",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {hhmm}",
        dataPoints: state,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
