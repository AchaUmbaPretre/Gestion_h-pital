import './listeDocteur.scss';
import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal } from 'antd';
import moment from 'moment/moment';
import { getDocteur } from '../../../services/docteurService';
import { FileExcelOutlined, FilePdfOutlined, CalendarOutlined, MoreOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DocteurForm from '../docteurForm/DocteurForm';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ListeDocteur = () => {
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDocteur(dateFilter);
        setDatas(response.data.data);
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

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleDateFilterChange = (dates) => {
    setDateFilter(dates);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(datas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Docteurs');
    XLSX.writeFile(wb, 'docteurs_data.xlsx');
  };

  const exportToPDF = () => {
    // Implémentation pour l'exportation en PDF
    notification.info({
      message: 'Fonctionnalité PDF',
      description: 'Exportation PDF en cours de développement.',
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const filteredData = datas.filter(item =>
    item.username.toLowerCase().includes(searchTerm) ||
    item.prenom.toLowerCase().includes(searchTerm) ||
    item.phone_numbe.toLowerCase().includes(searchTerm) ||
    item.adresse.toLowerCase().includes(searchTerm)
  );

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<FileExcelOutlined />} onClick={exportToExcel}>
        Exporter en Excel
      </Menu.Item>
      <Menu.Item key="2" icon={<FilePdfOutlined />} onClick={exportToPDF}>
        Exporter en PDF
      </Menu.Item>
    </Menu>
  );

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'Nom',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Adresse',
      dataIndex: 'adresse',
      key: 'adresse',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Téléphone',
      dataIndex: 'phone_numbe',
      key: 'phone_numbe',
      render: (text) => <Tag color='blue'>{text || 'Aucun'}</Tag>,
    },
    {
      title: 'Type de patient',
      dataIndex: 'typePatient',
      key: 'typePatient',
      render: (text) => <Badge color={text === 'Urgent' ? 'red' : 'green'} text={text} />,
    },
    {
      title: 'Date de Création',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => moment(a.created_at) - moment(b.created_at),
      sortDirections: ['descend', 'ascend'],
      render: (text) => (
        <Tag icon={<CalendarOutlined />} color="blue">
          {moment(text).format('DD-MM-yyyy')}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Card
      style={{padding:"20px 0px"}}
      title="Liste des docteurs"
      extra={
        <Space size="middle">
          <RangePicker onChange={handleDateFilterChange} />
          <Input.Search
            placeholder="Rechercher..."
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<FilterOutlined />}>Exporter</Button>
          </Dropdown>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Ajouter un Docteur
          </Button>
        </Space>
      }
      bordered={false}
      className="listeDocteur-card"
    >
      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          rowKey="id_docteur"
        />
      )}
      <Modal
        title="Ajouter un nouveau docteur"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} 
        width={850}
      >
        <DocteurForm />
      </Modal>
    </Card>
  );
};

export default ListeDocteur;
