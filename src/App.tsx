// src/App.tsx
import React, { useState } from 'react';
import { Layout, Card, Typography, Row, Col } from 'antd';
import MainTable from './components/MainTable';
import LineChart from './components/LineChart';

// Define interfaces for the data types
interface JobTitleData {
    jobTitle: string;
    count: number;
}

interface YearData {
    [x: string]: any;
    year: string;
    totalJobs: number;
}

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [jobTitles, setJobTitles] = useState<JobTitleData[]>([]);
    const [yearData, setYearData] = useState<YearData[]>([]); // Populate this from MainTable data

    const handleRowClick = (year: string) => {
        setSelectedYear(year);
        // Fetch job title data for that year
        const jobsForYear = yearData.filter((row) => row.year === year); // Adjust as needed for job title data
        const jobCountMap: { [key: string]: number } = {};

        jobsForYear.forEach((row) => {
            const title = row.jobTitle;
            if (jobCountMap[title]) {
                jobCountMap[title] += 1;
            } else {
                jobCountMap[title] = 1;
            }
        });

        const jobTitlesArray = Object.keys(jobCountMap).map((title) => ({
            jobTitle: title,
            count: jobCountMap[title],
        }));

        setJobTitles(jobTitlesArray);
    };

    return (
        <Layout className="layout">
            <Header style={{ color: '#fff', textAlign: 'center', fontSize: '24px' }}>
                Job Dashboard
            </Header>

            <Content style={{ padding: '0 50px', marginTop: '20px' }}>
                <Row gutter={[16, 16]}>
                    <Col span={16}>
                        <Card title="Job Summary Table" bordered={false}>
                            <MainTable onRowClick={handleRowClick} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        {/* <LineChart yearData={yearData} /> */}
                    </Col>
                </Row>

                {selectedYear && (
                    <Card title={`Job Titles for ${selectedYear}`} bordered={false} style={{ marginTop: '20px' }}>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Number of Jobs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobTitles.map((title, index) => (
                                    <tr key={index}>
                                        <td>{title.jobTitle}</td>
                                        <td>{title.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}
            </Content>

            <Footer style={{ textAlign: 'center' }}>
                Job Dashboard ©2024 Created with Ant Design
            </Footer>
        </Layout>
    );
};

export default App;
