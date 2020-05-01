import React, { useState, useEffect } from 'react';

import { Doughnut } from 'react-chartjs-2';
import Card from '../../components/Card';
import Heading from '../../components/Heading';


function Help() {
  const [chartData, setChartData] = useState({});
  const chart = () => {
    setChartData({
      labels: ["REMAINS YTD", "SPEND YTD"],
      datasets: [
        {
          label: ["REMAINS YTD", "SPEND YTD"],
          barPercentage: 0.7,
          data: [245, 400],
          backgroundColor: ["#38a49f", "#38a49f80"],
          borderWidth: 0,
        }
      ]
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <Card style={{ height: "370px", width: "370px" }}>
      <Heading tableHeading>Annual spend YTD</Heading>
      <Doughnut
        data={chartData}
        options={{
          animation: {
            animateRotate: true,
          },
          cutoutPercentage: 75,
          layout: {
            padding: {
              top: 8
            },
          },
          legend: {
            position: 'bottom',
            align: 'center',
            labels: {
              boxWidth: 10,
              fontSize: 12,
              padding: 24,
              usePointStyle: true,
            },
          },
        }}
      />
    </Card >
  )
}

export default Help;