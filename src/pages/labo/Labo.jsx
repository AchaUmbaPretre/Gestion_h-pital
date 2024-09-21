import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal } from 'antd';
import { FileExcelOutlined, FilePdfOutlined, CalendarOutlined, MoreOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { getPharma } from '../../services/pharmaService';
import { getLabo } from '../../services/laboService';

const { RangePicker } = DatePicker;

const Labo = () => {
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLabo(dateFilter);
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

  const filteredData = Array.isArray(datas) ? datas.filter(item =>
    item.nomMedicament.toLowerCase().includes(searchTerm)
  ) : [];
  

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
      title: 'Consultation',
      dataIndex: 'consultation',
      key:'consultation',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Type analyse',
      dataIndex: 'id_type_analyse',
      key: 'id_type_analyse',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
        title: 'Date demande',
        dataIndex: 'date_demande',
        key: 'date_demande',
        render: (text) => <Tag color='blue'>{text}</Tag>,
      },
      {
        title: 'Date analyse',
        dataIndex: 'date_analyse',
        key: 'date_analyse',
        render: (text) => <Tag color='blue'>{text}</Tag>,
      },
      {
        title: 'resultats',
        dataIndex: 'resultats',
        key: 'resultats',
        render: (text) => <Tag color='blue'>{text}</Tag>,
      },
      {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => <Tag color='blue'>{text}</Tag>,
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
      title="Liste laboratoire"
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
            Ajouter un Paiement
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
        title="Labo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} 
        width={1000}
      >
{/*         <FormPaiement /> */}
      </Modal>
    </Card>
  );
};

export default Labo;
