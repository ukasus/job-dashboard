// src/components/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';

// Define interface for YearData prop
interface YearData {
    year: string;
    totalJobs: number;
}

interface LineChartProps {
    yearData: YearData[];
}

const LineChart: React.FC<LineChartProps> = ({ yearData }) => {
    console.log(yearData);
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

    return (
        <Card title="Job Trends Over Time" bordered={false} style={{ width: '100%', marginTop: '20px' }}>
            {/* <Line data={chartData} /> */}
        </Card>
    );
};

export default LineChart;
