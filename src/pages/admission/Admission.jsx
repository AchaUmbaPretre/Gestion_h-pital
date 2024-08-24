import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal } from 'antd';
import { FileExcelOutlined, FilePdfOutlined, CalendarOutlined, MoreOutlined, FilterOutlined, PlusOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { getAdmission } from '../../services/admissionService';
import FormAdmission from './formAdmission/FormAdmission';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Admission = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAdmission(dateFilter); // Assuming `getAdmission` is defined elsewhere
        setData(response.data);
        setFilteredData(response.data); // Assuming filteredData is initially same as data
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
    XLSX.utils.book_append_sheet(wb, ws, 'Admissions');
    XLSX.writeFile(wb, 'admissions_data.xlsx');
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

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Patient',
      dataIndex: 'patientId',
      key: 'patientId',
      render: (text) => (
        <Tag color='blue' icon={<UserOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'serviceId',
      key: 'serviceId',
      render: (text) => (
        <Tag color='blue' icon={<FileTextOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Date Admission',
      dataIndex: 'dateAdmission',
      key: 'dateAdmission',
      sorter: (a, b) => moment(a.dateAdmission) - moment(b.dateAdmission),
      sortDirections: ['descend', 'ascend'],
      render: (text) => (
        <Tag icon={<CalendarOutlined />} color="blue">
          {moment(text).format('DD-MM-YYYY')}
        </Tag>
      ),
    },
    {
      title: 'Date Sortie',
      dataIndex: 'dateSortie',
      key: 'dateSortie',
      sorter: (a, b) => moment(a.dateSortie) - moment(b.dateSortie),
      sortDirections: ['descend', 'ascend'],
      render: (text) => (
        <Tag icon={<CalendarOutlined />} color="blue">
          {moment(text).format('DD-MM-YYYY')}
        </Tag>
      ),
    },
    {
      title: 'Raison Admission',
      dataIndex: 'raisonAdmission',
      key: 'raisonAdmission',
      render: (text) => (
        <Badge
          color={text === 'Urgent' ? 'red' : 'green'}
          text={text}
          icon={<FileTextOutlined />}
        />
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
    <>
      <Card
        style={{ padding: "20px 0px" }}
        title="Liste des admissions"
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
              Ajouter une admission
            </Button>
          </Space>
        }
        bordered={false}
        className="listeAdmission-card"
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
          title="Ajouter une nouvelle admission"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={850}
        >
          <FormAdmission />
        </Modal>
      </Card>
    </>
  );
};

export default Admission;
