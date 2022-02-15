// import React, { useState } from "react";
// import { reportsContext } from "../../contexts/ReportsContext";
// import secondsToHms from "../../_helpers/secondsToHms";
// import { CanvasJSChart } from "canvasjs-react-charts";

// export default function EmployeesCharts() {
//   const { reports } = React.useContext(reportsContext);
//   const [users, setusers] = useState([]);
//   const [state, setState] = useState([]);
//   const [totalTime, settotalTime] = useState(100);

//   //  set data
//   React.useEffect(() => {
//     setusers(reports.reports.data[0].byEmployees);
//   }, [reports]);
//   console.log(users);

//   React.useEffect(() => {
//     let tt = 0;
//     users.forEach((user) => {
//       tt = tt + user.totalHours;
//     });
//     settotalTime(tt);
//     users.map((user) => {
//       let obj = {
//         label: `${user._id.firstName} ${user._id.lastName}`,
//         y: (100 * (user.totalHours / tt)).toString(),
//         hhmm: secondsToHms(user.totalHours),
//       };
//       setState((prev) => [...prev, obj]);
//     });
//   }, [users]);
//   console.log(state);

//   const options = {
//     exportEnabled: true,
//     animationEnabled: true,
//     title: {
//       text: "Hours worked for users",
//     },
//     data: [
//       {
//         type: "pie",
//         startAngle: 75,
//         toolTipContent: "<b>{label}</b>: {y}%",
//         showInLegend: "true",
//         legendText: "{label}",
//         indexLabelFontSize: 16,
//         indexLabel: "{label} - {hhmm}",
//         dataPoints: state,
//       },
//     ],
//   };

//   return (
//     <div>
//       <CanvasJSChart
//         options={options}
//         /* onRef={ref => this.chart = ref} */
//       />
//       {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
//     </div>
//   );
// }

import React from "react";

export default function EmployeesCharts() {
  return <div></div>;
}
