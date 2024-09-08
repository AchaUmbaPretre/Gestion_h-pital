import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal, Tooltip, Popconfirm } from 'antd';
import moment from 'moment/moment';
import { FileExcelOutlined, EyeOutlined, DeleteOutlined, FilePdfOutlined, CalendarOutlined, MoreOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { getPharma } from '../../services/pharmaService';
import FormOrdonnance from './formOrdonnance/FormOrdonnance';
import { getOrdonnance } from '../../services/ordonnanceService';
import DetailOrdonnance from './detailOrdonnance/DetailOrdonnance';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Ordonnance = () => {
  const [datas, setDatas] = useState([]);
  const [idConsultation, setIdconsultation] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrdonnance(dateFilter);
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

  const showModal = (id) => {
    setIsModalVisible(true);
    setIdconsultation(id)
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
      title: 'Consultation N°',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Medicament',
      dataIndex: 'nomMedicament',
      key: 'nomMedicament',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Quantité',
      dataIndex: 'quantite',
      key: 'stock',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Date',
      dataIndex: 'dateOrdre',
      key: 'stock',
      render: (text) => (
        <Tag color='blue' icon={<CalendarOutlined />}>
          {moment(text).format('DD-MM-YYYY')}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
           <Tooltip title="Voir l'ordonnace">
            <Button
              icon={<EyeOutlined />}
              style={{ color: 'blue' }}
              aria-label="Creer une ordonnance"
              onClick={()=> showModal(record.id)}
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
      title="Liste d'ordonnance"
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
{/*           <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Ajouter un Docteur
          </Button> */}
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
        centered
      >
        <DetailOrdonnance idConsultation={idConsultation} />
      </Modal>
    </Card>
  );
};

export default Ordonnance;
