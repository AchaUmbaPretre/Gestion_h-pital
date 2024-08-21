import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal } from 'antd';
import moment from 'moment/moment';
import { getDocteur } from '../../../services/docteurService';
import { FileExcelOutlined, FilePdfOutlined, CalendarOutlined, MoreOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getConsultation } from '../../../services/consultservice';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ListeConsultation = () => {
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConsultation(dateFilter);
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
    item.diagnostic.toLowerCase().includes(searchTerm) ||
    item.notes.toLowerCase().includes(searchTerm) 
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
      title: 'Patient',
      dataIndex: 'patientId',
      key: 'patientId ',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Docteur',
      dataIndex: 'personnelId',
      key: 'personnelId',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Type consultation',
      dataIndex: 'id_typeConsultation	',
      key: 'adresse',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
        title: "Date",
        dataIndex: 'dateConsultation',
        key: 'dateConsultation',
        sorter: (a, b) => moment(a.dateConsultation) - moment(b.dateConsultation),
        sortDirections: ['descend', 'ascend'],
        render: (text) => (
          <Tag icon={<CalendarOutlined />} color="blue">
            {moment(text).format('DD-MM-yyyy')}
          </Tag>
        )
      },
    {
      title: 'Diagnostic',
      dataIndex: 'diagnostic',
      key: 'diagnostic',
      render: (text) => <Badge color={text === 'Urgent' ? 'red' : 'green'} text={text} />,
    },
    {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
        render: (text) => <Badge color={text === 'Urgent' ? 'red' : 'green'} text={text} />,
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
      title="Liste des consultation"
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
      </Modal>
    </Card>
  );
};

export default ListeConsultation;
