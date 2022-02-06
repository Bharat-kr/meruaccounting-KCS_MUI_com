import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ReportsProvider } from "src/contexts/ReportsContext";

const data = [
  {
    date: "2 Nov",
    totalHours: 2400,
  },
];

export default function Bars({ reports }) {
  const { reports: rData } = reports;
  console.log(rData);
  const [data, setdata] = useState([]);
  // make data
  useEffect(() => {
    setdata([
      {
        date: "2 Nov",
        totalHours: rData[0].totalHours,
      },
    ]);
  }, [rData]);
  console.log(data);

  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }} />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="totalHours"
          fill="#8884d8"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </div>
  );
}
