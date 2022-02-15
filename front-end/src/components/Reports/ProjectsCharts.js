import React, { useState } from "react";
import { reportsContext } from "../../contexts/ReportsContext";
import secondsToHms from "../../_helpers/secondsToHms";
import { CanvasJSChart } from "canvasjs-react-charts";

export default function ProjectsCharts() {
  const { reports } = React.useContext(reportsContext);
  const [projects, setprojects] = useState([]);
  const [state, setState] = useState([]);
  const [totalTime, settotalTime] = useState(100);

  //  set data
  React.useEffect(() => {
    setprojects(reports.reports[0].byProjects);
  }, [reports]);
  console.log(projects);

  React.useEffect(() => {
    let tt = 0;
    projects.forEach((project) => {
      tt = tt + project.totalHours;
    });
    settotalTime(tt);
    projects.map((project) => {
      let obj = {
        label: project._id.name ? project._id.name : "deleted",
        y: (100 * (project.totalHours / tt)).toString(),
        hhmm: secondsToHms(project.totalHours),
      };
      setState((prev) => [...prev, obj]);
    });
  }, [projects]);
  console.log(state);

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Hours worked for Projects",
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
