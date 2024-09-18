// src/components/MainTable.tsx
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

// Define interfaces for the props and the data
interface JobData {
    work_year: string;
    salary_in_usd: string;
    [key: string]: any;  // To allow other unknown properties
}

interface YearData {
    year: string;
    totalJobs: number;
    avgSalary: string;
}

interface MainTableProps {
    onRowClick: (year: string) => void;
}

const MainTable: React.FC<MainTableProps> = ({ onRowClick }) => {
    const [data, setData] = useState<JobData[]>([]);
    const [yearData, setYearData] = useState<YearData[]>([]);

    useEffect(() => {
        // Replace with your CSV file path
        Papa.parse('../../salaries.csv', {
            download: true,
            header: true,
            complete: (results) => {
                setData(results.data);
                processYearData(results.data);
            }
        });
    }, []);

    const processYearData = (data: JobData[]) => {
        const yearMap: { [key: string]: { jobs: number; totalSalary: number } } = {};

        data.forEach((row) => {
            const year = row.work_year;
            const salary = parseFloat(row.salary_in_usd);
            
            if (yearMap[year]) {
                yearMap[year].jobs += 1;
                yearMap[year].totalSalary += salary;
            } else {
                yearMap[year] = { jobs: 1, totalSalary: salary };
            }
        });

        const yearArray = Object.keys(yearMap).map((year) => ({
            year: year,
            totalJobs: yearMap[year].jobs,
            avgSalary: (yearMap[year].totalSalary / yearMap[year].jobs).toFixed(2),
        }));

        setYearData(yearArray);
    };

    const columns: ColumnsType<YearData> = [
        { title: 'Year', dataIndex: 'year', key: 'year', sorter: (a, b) => parseInt(a.year) - parseInt(b.year) },
        { title: 'Total Jobs', dataIndex: 'totalJobs', key: 'totalJobs', sorter: (a, b) => a.totalJobs - b.totalJobs },
        { title: 'Average Salary (USD)', dataIndex: 'avgSalary', key: 'avgSalary', sorter: (a, b) => parseFloat(a.avgSalary) - parseFloat(b.avgSalary) },
    ];

    return (
        <Table<YearData>
            columns={columns}
            dataSource={yearData}
            rowKey="year"
            onRow={(record) => ({
                onClick: () => onRowClick(record.year),
            })}
            pagination={false}
        />
    );
};

export default MainTable;
