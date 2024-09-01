import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal } from 'antd';import moment from 'moment';
import 'moment/locale/fr'; // Pour utiliser le format français
import { MoreOutlined, UserOutlined,FileExcelOutlined,FilePdfOutlined,FilterOutlined,PlusOutlined, CalendarOutlined, ClockCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { getRdv } from '../../../services/rdvService';
import FormRdv from '../formRdv/FormRdv';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ListeRdv = () => {
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRdv(dateFilter);
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

  const filteredData = datas?.filter(item =>
    item.type_rendezvous.toLowerCase().includes(searchTerm)
  );
  
  console.log(filteredData)

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
    { 
      title: '#', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text, record, index) => index + 1 
    },
    {
      title: 'Patient',
      dataIndex: 'nom_patient',
      key: 'nom_patient',
      render: (text) => (
        <Tag color='blue' icon={<UserOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Docteur',
      dataIndex: 'username',
      key: 'username',
      render: (text) => (
        <Tag color='blue' icon={<UserOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date_rdv',
      key: 'date_rdv',
      render: (text) => (
        <Tag color='blue' icon={<CalendarOutlined />}>
          {moment(text).locale('fr').format('DD MMMM YYYY')}
        </Tag>
      ),
    },
    {
      title: 'Heure debut',
      dataIndex: 'heure_debut',
      key: 'heure_debut',
      render: (text) => (
        <Tag color='blue' icon={<ClockCircleOutlined />}>
          {moment(text, 'HH:mm').format('HH:mm')}
        </Tag>
      ),
    },
    {
      title: 'Heure fin',
      dataIndex: 'heure_fin',
      key: 'heure_fin',
      render: (text) => (
        <Tag color='blue' icon={<ClockCircleOutlined />}>
          {moment(text, 'HH:mm').format('HH:mm')}
        </Tag>
      ),
    },
    {
      title: 'Type rendezvous',
      dataIndex: 'type_rendezvous',
      key: 'type_rendezvous',
      render: (text) => (
        <Tag color='blue' icon={<FileTextOutlined />}>
          {text}
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
      title="Liste des rendez vous"
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
            Rendez-vous
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
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} 
        width={700}
      >
        <FormRdv />
      </Modal>
    </Card>
  );
};

export default ListeRdv;
