import './listeDocteur.scss'
import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification } from 'antd';
import moment from 'moment/moment';
import { getDocteur } from '../../../services/docteurService';
const { Option } = Select;


const ListeDocteur = () => {

  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocteur(dateFilter);
        setDatas(response.data.data); // Assurez-vous d'utiliser la bonne partie des données
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
      dataIndex: 'username',
      key: 'username',
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
      dataIndex: 'phone_numbe',
      key: 'phone_numbe',
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

  ];

  return (
    <div className="listeDocteur">
      <div className="listeDocteur-top">
        <h2 className="listeDocteur-h2">Liste des docteurs</h2>
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
            rowKey="id_docteur"  // Ajoutez une clé unique pour chaque ligne
          />
        )}
      </div>
  </div>
  )
}

export default ListeDocteur
