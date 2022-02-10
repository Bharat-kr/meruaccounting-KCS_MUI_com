import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { Pie, Doughnut } from "react-chartjs-2";
import { reportsContext } from "../../contexts/ReportsContext";
import timeC from "../../_helpers/timeConverter";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "My Daily Activities",
};

export default function ProjectsCharts() {
  const { reports } = React.useContext(reportsContext);
  const [projects, setProjects] = useState([]);
  const [state, setState] = useState([["Task", "Hours per Day"]]);

  //  set data
  React.useEffect(() => {
    setProjects(reports.reports.data[0].byProjects);
  }, [reports]);
  console.log(projects);

  React.useEffect(() => {
    projects.map((project) => {
      let arr = [project._id.name, project.totalHours];
      setState((prev) => [...prev, arr]);
    });
  }, [projects]);
  console.log(state);

  return (
    <Chart
      chartType="PieChart"
      data={state}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
