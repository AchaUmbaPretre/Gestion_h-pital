import React, { useState, useEffect } from 'react';
import { Select, Skeleton } from 'antd';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './chartRond.scss';

const { Option } = Select;

const ChartRond = () => {
  const [data, setData] = useState(null);
  const [dateFilter, setDateFilter] = useState('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a fetch request to get the data
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        // Replace this with actual data fetching logic
        const fetchedData = {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        setData(fetchedData);
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, [dateFilter]);

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
  };

  return (
    <div className="chartRond">
      <div className="chartRond-top">
        <h2 className="chart-h2">Patients</h2>
        <div className="chart-wrapper">
          <Select
            value={dateFilter}
            onChange={handleDateFilterChange}
            style={{ width: 150 }}
          >
            <Option value="today">Aujourd'hui</Option>
            <Option value="yesterday">Hier</Option>
            <Option value="last7days">7 derniers jours</Option>
            <Option value="last30days">30 derniers jours</Option>
            <Option value="last1year">1 an</Option>
          </Select>
        </div>
      </div>
      <div className="chartRond-bottom">
        {loading ? (
          <Skeleton active />
        ) : (
          <Pie data={data} />
        )}
      </div>
    </div>
  );
};

export default ChartRond;
