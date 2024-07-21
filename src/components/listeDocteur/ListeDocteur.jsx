import React, { useState, useEffect } from 'react';
import './listeDocteur.scss';
import { Select, Skeleton, Table, Tag } from 'antd';

const { Option } = Select;

const ListeDocteur = () => {
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a fetch request to get the data based on the date filter
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        // Replace this with actual data fetching logic
        const fetchedData = [
          {
            key: '1',
            name: 'Dr. Smith',
            specialty: 'Cardiology',
            age: 45,
            tags: ['experienced', 'friendly'],
          },
          {
            key: '2',
            name: 'Dr. Doe',
            specialty: 'Neurology',
            age: 50,
            tags: ['expert', 'detail-oriented'],
          },
          // Add more data as needed
        ];
        setData(fetchedData);
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, [dateFilter]);

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Spécialité',
      dataIndex: 'specialty',
      key: 'specialty',
      filters: [
        { text: 'Cardiology', value: 'Cardiology' },
        { text: 'Neurology', value: 'Neurology' },
        // Add more filters as needed
      ],
      onFilter: (value, record) => record.specialty.includes(value),
    },
    {
      title: 'Âge',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <div className="listeDocteur">
      <div className="listeDocteur-top">
        <h2 className="listeDocteur-h2">Liste des docteurs</h2>
        <div className="listeDocteur-title">
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
      <div className="listeDocteur-content">
        {loading ? (
          <Skeleton active />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
          />
        )}
      </div>
    </div>
  );
};

export default ListeDocteur;
