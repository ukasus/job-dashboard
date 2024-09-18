// src/components/MainTable.tsx
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useCsvData from '../hooks/useCsvData'; 

// Define interfaces for the props and the data
export interface JobData {
    work_year: string;
    salary_in_usd: string;
    job_title: string;
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
    const { data, yearData, loading, error } = useCsvData();
    
    if (loading) {
        return <div>Loading...</div>;
    }


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
