import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import secondsToHms from "../../_helpers/secondsToHms";
import { reportsContext } from "../../contexts/ReportsContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AppsChart() {
  const { reports } = React.useContext(reportsContext);
  const [totalTime, settotalTime] = React.useState(100);
  const [dataLabels, setlabels] = React.useState([]);
  const [dataValues, setvalues] = React.useState([]);
  console.table(reports.reports.data[0].byClients);

  React.useEffect(() => {
    let total = 0;
    reports.reports.data[0].byClients.forEach((client) => {
      total = total + client.totalHours;
    });
    settotalTime(total);

    let othersT = 0;
    let labelsArr = [];
    reports.reports.data[0].byClients.forEach((client) => {
      if ((client.totalHours * 100) / total >= 5) {
        if (client._id.firstName) labelsArr.push(client._id.firstName);
        else labelsArr.push("deleted");
      } else othersT = 0 + client.totalHours;
    });
    labelsArr.push("others");
    setlabels(labelsArr);

    let dataArr = [];
    reports.reports.data[0].byClients.forEach((client) => {
      if ((client.totalHours * 100) / total >= 5)
        dataArr.push(client.totalHours);
    });
    dataArr.push(othersT);
    setvalues(dataArr);
  }, [reports]);

  console.log(dataLabels, dataValues);

  const options = {
    layout: { autoPadding: true },
    scaleLabel: "<%= ' ' + value%>",

    legend: { display: true, position: "right" },
    maintainAspectRatio: false,

    plugins: {
      tooltip: {
        // enabled: false,
        callbacks: {
          label: function (context) {
            let number =
              (context.chart.data.datasets[0].data[context.dataIndex] * 100) /
              total;
            let rounded = Math.round(number * 10) / 10;

            return rounded + "%";
          },
        },
      },

      datalabels: {
        display: "auto",
        anchor: "end",
        align: "end",
        clamp: true,
        clip: true,
        formatter: (value, context) => {
          return (
            context.chart.data.labels[context.dataIndex] +
            " " +
            secondsToHms(value)
          );
        },
      },
    },
  };

  const total = totalTime;
  const data = {
    labels: dataLabels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#fff",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Doughnut
      type="outlabeledPie"
      plugins={[ChartDataLabels]}
      height="200px"
      width="200px"
      data={data}
      options={options}
    />
  );
}
