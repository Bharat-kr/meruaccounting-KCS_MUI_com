import React, { useState } from "react";
import { reportsContext } from "../../contexts/ReportsContext";
import secondsToHms from "../../_helpers/secondsToHms";
import { CanvasJSChart } from "canvasjs-react-charts";

export default function ClientsCharts() {
  const { reports } = React.useContext(reportsContext);
  const [clients, setclients] = useState([]);
  const [state, setState] = useState([]);
  const [totalTime, settotalTime] = useState(100);

  //  set data
  React.useEffect(() => {
    setclients(reports.reports.data[0].byClients);
  }, [reports]);
  console.log(clients);

  React.useEffect(() => {
    let tt = 0;
    clients.forEach((client) => {
      tt = tt + client.totalHours;
    });
    settotalTime(tt);
    clients.map((client) => {
      let obj = {
        label: client._id.firstName ? client._id.firstName : "deleted",
        y: (100 * (client.totalHours / tt)).toString(),
        hhmm: secondsToHms(client.totalHours),
      };
      setState((prev) => [...prev, obj]);
    });
  }, [clients]);
  console.log(state);

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Hours worked for Clients",
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
