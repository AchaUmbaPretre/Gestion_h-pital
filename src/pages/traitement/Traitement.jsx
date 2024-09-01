import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal } from 'antd';
import { FileExcelOutlined, FilePdfOutlined, CalendarOutlined, MoreOutlined, FilterOutlined, PlusOutlined, MedicineBoxOutlined, BellOutlined, FieldNumberOutlined, ReadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { getTraitement } from '../../services/traitementService';
import FormTraitement from './formTraitement/FormTraitement';

const { Option } = Select;
const { RangePicker } = DatePicker;


const Traitement = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTraitement(dateFilter);
        setData(response.data);
        setFilteredData(response.data); 
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateFilter]);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
      render: (text) => (
        <Tag color='blue'>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Consultation',
      dataIndex: 'nomConsultation',
      key: 'nomConsultation',
      render: (text) => (
        <Tag color='blue'>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Medicament',
      dataIndex: 'medicament',
      key: 'medicament',
      render: (text) => (
        <Tag color='blue' icon={<MedicineBoxOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Dose',
      dataIndex: 'dose',
      key: 'dose',
      render: (text) => (
        <Tag color='blue' icon={<FieldNumberOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Frequence',
      dataIndex: 'frequence',
      key: 'frequence',
      render: (text) => (
        <Tag color='blue' icon={<BellOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Durée',
      dataIndex: 'duree',
      key: 'duree',
      render: (text) => (
        <Tag color='blue' icon={<CalendarOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Instructions',
      dataIndex: 'instructions',
      key: 'instructions',
      render: (text) => (
        <Tag color='blue' icon={<ReadOutlined />}>
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

  const handleDateFilterChange = (dates) => {
    setDateFilter(dates ? dates.map(date => date.format('YYYY-MM-DD')) : null);
  };

  const handleSearch = (value) => {
    const searchData = data.filter((item) =>
      item.patientId.toLowerCase().includes(value.toLowerCase()) ||
      item.serviceId.toLowerCase().includes(value.toLowerCase()) ||
      item.raisonAdmission.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(searchData);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Docteurs');
    XLSX.writeFile(wb, 'docteurs_data.xlsx');
  };

  const exportToPDF = () => {
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

  return (
    <>
      <Card
        style={{ padding: "20px 0px" }}
        title="Liste des traitements"
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
              traitement
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
            rowKey="id"
          />
        )}
        <Modal
          title="Ajouter un nouveau traitement"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={1100}
        >
          <FormTraitement />
        </Modal>
      </Card>
    </>
  );
};

export default Traitement;
