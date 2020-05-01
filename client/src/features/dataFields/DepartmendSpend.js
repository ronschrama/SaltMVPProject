import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import Card from '../../components/Card';
import Heading from '../../components/Heading';


export default function Suppliers() {
  const [chartData, setChartData] = useState({});
  const chart = () => {
    setChartData({
      labels: [
        "Samuel S.",
        "Denis K.",
        "Marta B.",
        "April H."
      ],
      datasets: [
        {
          label: "Current month",
          barPercentage: 0.7,
          data: [78, 75, 65, 70],
          backgroundColor: "#38a49f",
          order: 0,
        },
        {
          label: "Previous month",
          barPercentage: 0.7,
          data: [90, 80, 70, 80],
          backgroundColor: "#38a49f80",
          order: 0,
        },
      ]
    });
  }
  useEffect(() => {
    chart();
  }, []);


  return (
    <Card style={{ height: "370px", width: "570px" }}>
      <Heading tableHeading>Department spend YTD</Heading>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                beginAtZeo: true,
              },
            }],
            xAxes: [{
              stacked: true,
              gridLines: {
                display: false,
              }
            }],
          },

        }
        }
      />
    </Card>
  )
}
