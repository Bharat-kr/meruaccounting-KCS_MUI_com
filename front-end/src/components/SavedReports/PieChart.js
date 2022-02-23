import React, { useEffect, useState } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { reportsContext } from "../../contexts/ReportsContext";
import timeC from "../../_helpers/timeConverter";

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Employees",
      backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4"],
      hoverBackgroundColor: [
        "#501800",
        "#4B5000",
        "#175000",
        "#003350",
        "#35014F",
      ],
      data: [65, 59, 80, 81, 56],
    },
  ],
};

export default function PieChart() {
  const { reports } = React.useContext(reportsContext);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(null);

  //set data
  React.useEffect(() => {
    setUsers(reports.reports.data[0].byEmployees);
  }, [reports]);

  //set state for chart
  React.useEffect(() => {
    let data = users.map((user) => {
      return user.totalHours;
    });
    let labels = users.map((user) => {
      return user._id.firstName;
    });
    let backgroundColor = users.map((user) => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    });
    let state = {
      datasetIdKey: "backgroundColor",
      labels,
      datasets: [
        {
          backgroundColor,
          hoverBackgroundColor: backgroundColor,
          data,
        },
      ],
    };
    setState(state);
  }, [users]);
  return !state ? (
    <div>put a loader here</div>
  ) : (
    <div>
      <Doughnut
        data={state}
        options={{
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}

// import React, { PureComponent, useState } from "react";
// import { reportsContext } from "../../contexts/ReportsContext";
// import secondsToHms from "../../_helpers/secondsToHms";
// import {
//   LabelList,
//   PieChart,
//   Pie,
//   Label,
//   Legend,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";

// const data01 = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
//   { name: "Group E", value: 278 },
//   { name: "Group F", value: 189 },
// ];

// const COLORS = data01.map((data) => {
//   return "#" + Math.floor(Math.random() * 16777215).toString(16);
// });

// export default function PChart() {
//   const { reports } = React.useContext(reportsContext);
//   const [users, setUsers] = useState([]);
//   const [state, setState] = useState([]);

//   //set data
//   React.useEffect(() => {
//     setUsers(reports.reports.data[0].byEmployees);
//   }, [reports]);
//   console.log(users);

//   React.useEffect(() => {
//     users.map((user) => {
//       let newObject = {
//         name: `${user._id.firstName} ${user._id.lastName}`,
//         value: user.totalHours,
//       };
//       setState((prev) => [...prev, newObject]);
//     });
//   }, [users]);

//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         dataKey="value"
//         isAnimationActive={false}
//         data={state}
//         cx="50%"
//         cy="50%"
//         innerRadius={40}
//         s
//         outerRadius={80}
//         fill="#8884d8"
//         label={({
//           cx,
//           cy,
//           midAngle,
//           innerRadius,
//           outerRadius,
//           value,
//           index,
//         }) => {
//           console.log("handling label?");
//           const RADIAN = Math.PI / 180;
//           // eslint-disable-next-line
//           const radius = 25 + innerRadius + (outerRadius - innerRadius);
//           // eslint-disable-next-line
//           const x = cx + radius * Math.cos(-midAngle * RADIAN);
//           // eslint-disable-next-line
//           const y = cy + radius * Math.sin(-midAngle * RADIAN);

//           return (
//             <text
//               x={x}
//               y={y}
//               fill="#8884d8"
//               textAnchor={x > cx ? "start" : "end"}
//               dominantBaseline="central"
//             >
//               {state[index].name} ({secondsToHms(value)})
//             </text>
//           );
//         }}
//       >
//         {data01.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>
//             {" "}
//             <Label value={entry.name} offset={0} position="insideBottom" />
//           </Cell>
//         ))}
//       </Pie>
//       <Legend verticalAlign="top" height={36} />
//     </PieChart>
//   );
// }
