// src/hooks/useCsvData.ts
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

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
const useCsvData = () => {
    const [data, setData] = useState<JobData[]>([]);
    const [yearData, setYearData] = useState<YearData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        Papa.parse('/salaries.csv', {
            download: true,
            header: true,
            complete: (results) => {
                setData(results.data);
                processYearData(results.data as JobData[]);
            },
            error: (error) => {
                setError(`CSV parsing error: ${error.message}`);
                setLoading(false);
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

        const yearArray = Object.keys(yearMap).filter((year)=> year && year.trim().length>0).map((year) => ({
            year: year,
            totalJobs: yearMap[year].jobs,
            avgSalary: (yearMap[year].totalSalary / yearMap[year].jobs).toFixed(2),
        }));
        setYearData(yearArray);
        setLoading(false);
    };

    return { data, yearData, loading, error };
};

export default useCsvData;
