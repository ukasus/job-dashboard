// src/components/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

// Define interface for YearData prop
interface YearData {
    year: string;
    totalJobs: number;
}

interface LineChartProps {
    yearData: YearData[];
}

const LineChart: React.FC<LineChartProps> = ({ yearData }) => {
    
    const chartData = {
        labels: yearData.map((d) => d.year),
        datasets: [
            {
                label: 'Number of Jobs',
                data: yearData.map((d) => d.totalJobs),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: any) {
                return `Value: ${tooltipItem.raw}`;
              },
            },
          },
        },
      };

    return (
        <Card title="Job Trends Over Time" bordered={false} style={{ width: '100%', marginTop: '20px' }}>
            <Line data={chartData} options={chartOptions} />
        </Card>
    );
};

export default LineChart;
