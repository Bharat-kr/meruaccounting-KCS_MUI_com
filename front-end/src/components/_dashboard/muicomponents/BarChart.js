import React from 'react';
import { Bar } from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      fontSize: 2,
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
};

export default function BarChart() {
  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 2
          },
          legend: {
            display: true,
            position: 'right',
            fontSize: 2
          }
        }}
      />
    </div>
  );
}
