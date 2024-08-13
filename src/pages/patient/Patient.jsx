import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification } from 'antd';
import { getPatient } from '../../services/patientService';  // Assurez-vous que cette fonction retourne une promesse avec les données
import {
  CalendarOutlined 
} from '@ant-design/icons';
import moment from 'moment/moment';
const { Option } = Select;

const Patient = () => {
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPatient(dateFilter);  // Ajoutez le dateFilter si nécessaire
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [dateFilter]);

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
  };

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'Nom',
      dataIndex: 'nom_patient',
      key: 'nom_patient',
      render: (text) => (
        <Tag color='blue'>
          {text}
        </Tag>
      )
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
      render: (text) => (
        <Tag color='blue'>
          {text}
        </Tag>
      )
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      key: 'sexe',
      render: (text) => (
        <Tag color='blue'>
          {text || 'Aucun'}
        </Tag>
      )
    },
    {
      title: 'Adresse',
      dataIndex: 'adresse',
      key: 'adresse',
      render: (text) => (
        <Tag color='blue'>
          {text}
        </Tag>
      )
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
      key: 'telephone',
      render: (text) => (
        <Tag color='blue'>
          {text || 'Aucun'}
        </Tag>
      )
    },
    {
      title: 'Type de patient',
      dataIndex: 'typePatient',
      key: 'typePatient',
      render: (text) => (
        <Tag color='blue'>
          {text}
        </Tag>
      )
    },
    {
      title: "Date d'opération",
      dataIndex: 'date_operation',
      key: 'date_operation',
      sorter: (a, b) => moment(a.date_operation) - moment(b.date_operation),
      sortDirections: ['descend', 'ascend'],
      render: (text) => (
        <Tag icon={<CalendarOutlined />} color="blue">
          {moment(text).format('DD-MM-yyyy')}
        </Tag>
      ),
    },
  ];

  return (
    <div className="listeDocteur">
      <div className="listeDocteur-top">
        <h2 className="listeDocteur-h2">Liste des patients</h2>
        <div className="listeDocteur-title">
          <Input.Search placeholder="Rechercher..." />
        </div>
      </div>
      <div className="listeDocteur-content">
        {loading ? (
          <Skeleton active />
        ) : (
          <Table
            columns={columns}
            dataSource={datas}
            pagination={{ pageSize: 5 }}
            rowKey="id"  // Ajoutez une clé unique pour chaque ligne
          />
        )}
      </div>
    </div>
  );
}

export default Patient;
