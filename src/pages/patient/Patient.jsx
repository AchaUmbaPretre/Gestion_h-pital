import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Button, Space, Card, Badge, DatePicker, Dropdown, Menu, Row, Col, Divider, Tooltip, Popconfirm, Modal } from 'antd';
import { getPatient } from '../../services/patientService';
import { FileExcelOutlined, FilePdfOutlined, DeleteOutlined, EyeOutlined, FilterOutlined, UserOutlined, IdcardOutlined, HomeOutlined, PhoneOutlined, MedicineBoxOutlined, CalendarOutlined, MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import PatientDetail from './patientDetail/PatientDetail';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Patient = () => {
  const [datas, setDatas] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [idPatient, setIdPatient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPatient();
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
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const showModal = (id) => {
    setIsModalVisible(true);
    setIdPatient(id)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(datas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Patients');
    XLSX.writeFile(wb, 'patients_data.xlsx');
  };

  const exportToPDF = () => {
    // Your implementation for exporting to PDF
    notification.info({
      message: 'Fonctionnalité PDF',
      description: 'Exportation PDF en cours de développement.',
    });
  };

  const filteredData = datas
    .filter(item =>
      item.nom_patient.toLowerCase().includes(searchTerm) ||
      item.prenom.toLowerCase().includes(searchTerm) ||
      item.telephone.toLowerCase().includes(searchTerm) ||
      item.adresse.toLowerCase().includes(searchTerm)
    )
    .filter(item => 
      selectedType === 'all' || item.typePatient === selectedType
    )
    .filter(item => {
      if (dateRange.length === 2) {
        const operationDate = moment(item.date_operation);
        return operationDate.isBetween(dateRange[0], dateRange[1], 'days', '[]');
      }
      return true;
    });

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
      title: 'Nom',
      dataIndex: 'nom_patient',
      key: 'nom_patient',
      render: (text) => (
        <Tag color='blue' icon={<UserOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
      render: (text) => (
        <Tag color='blue' icon={<UserOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      key: 'sexe',
      render: (text) => (
        <Tag color='blue' icon={<IdcardOutlined />}>
          {text || 'Aucun'}
        </Tag>
      ),
    },
    {
      title: 'Adresse',
      dataIndex: 'adresse',
      key: 'adresse',
      render: (text) => (
        <Tag color='blue' icon={<HomeOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Téléphone',
      dataIndex: 'tel',
      key: 'tel',
      render: (text) => (
        <Tag color='blue' icon={<PhoneOutlined />}>
          {text || 'Aucun'}
        </Tag>
      ),
    },
    {
      title: 'Type de patient',
      dataIndex: 'typePatient',
      key: 'typePatient',
      render: (text) => (
        <Badge
          color={text === 'Urgent' ? 'red' : 'green'}
          text={text}
          icon={text === 'Urgent' ? <MedicineBoxOutlined /> : <MedicineBoxOutlined />}
        />
      ),
    },
    {
      title: "Date de Naiss",
      dataIndex: 'dateNaissance',
      key: 'dateNaissance',
      sorter: (a, b) => moment(a.dateNaissance) - moment(b.dateNaissance),
      sortDirections: ['descend', 'ascend'],
      render: (text) => (
        <Tag color='blue' icon={<CalendarOutlined />}>
          {moment(text).format('DD-MM-YYYY')}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
           <Tooltip title="Voir le detail">
            <Button
              icon={<EyeOutlined />}
              style={{ color: 'blue' }}
              aria-label=""
              onClick={()=> showModal(record.id_patient)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Etes-vous sûr de vouloir supprimer ce département ?"
/*               onConfirm={() => handleDelete(record.id)} */
              okText="Oui"
              cancelText="Non"
            >
              <Button
                icon={<DeleteOutlined />}
                style={{ color: 'red' }}
                aria-label="Delete department"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];
  

  return (
    <Card
      style={{padding:"20px 0px"}}
      title="Liste des patients"
      extra={
        <Space size="middle">
          <RangePicker onChange={handleDateChange} />
          <Select defaultValue="all" onChange={handleTypeChange} style={{ width: 150 }}>
            <Option value="all">Tous les types</Option>
            <Option value="Urgent">Urgent</Option>
            <Option value="Normal">Normal</Option>
          </Select>
          <Input.Search
            placeholder="Rechercher..."
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<FilterOutlined />}>Exporter</Button>
          </Dropdown>
        </Space>
      }
      bordered={false}
      className="listePatient-card"
    >
      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      )}

      <Modal
        title=""
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} 
        width={600}
        centered
      >
        <PatientDetail idPatient={idPatient} />
      </Modal>
    </Card>

    
  );
};

export default Patient;
