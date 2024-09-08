import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal, Tooltip, Popconfirm } from 'antd';
import moment from 'moment/moment';
import { FileExcelOutlined,EyeOutlined,DeleteOutlined,UserOutlined, FilePdfOutlined, CalendarOutlined, MoreOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import FormFactures from './formFactures/FormFactures';
import { getFacture } from '../../services/facturesService';
import FactureDetail from './factureDetail/FactureDetail';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Factures = () => {
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [idFacture, setIdFacture] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFacture(dateFilter);
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

  const showModalDetail = (id) => {
    setIdFacture(id)
    setIsDetailVisible(true)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsDetailVisible(false)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDetailVisible(false)
  };

  const filteredData = Array.isArray(datas) ? datas.filter(item =>
    item.nom_patient.toLowerCase().includes(searchTerm)
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
      title: 'Patient',
      dataIndex: 'nom_patient',
      key: 'patient',
      render: (text) => <Tag color='blue' icon={<UserOutlined />}>{text}</Tag>,
    },
    {
      title: 'date Emission',
      dataIndex: 'date_emission',
      key: 'date_emission',
      render: (text) => (
        <Tag color='blue' icon={<CalendarOutlined />}>
          {moment(text).format('DD-MM-YYYY')}
        </Tag>
      )
    },
    {
      title: 'Date limite',
      dataIndex: 'date_limite',
      key: 'date_limite',
      render: (text) => (
        <Tag color='blue' icon={<CalendarOutlined />}>
          {moment(text).format('DD-MM-YYYY')}
        </Tag>
      )    },
    {
        title: 'Montant total',
        dataIndex: 'montant_total',
        key: 'montant_total',
        render: (text) => <Tag color='blue'>{text} Fc</Tag>,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => <Tag color='blue'>{text}</Tag>,
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Space size="middle">
             <Tooltip title="Voir le détail">
              <Button
                icon={<EyeOutlined />}
                style={{ color: 'blue' }}
                aria-label=""
                onClick={()=> showModalDetail(record.id_facture)}
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
      title="Liste des factures"
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
            Ajouter une facture
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
        title="Factures"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} 
        width={1000}
      >
        <FormFactures />
      </Modal>

      <Modal
        title="Factures"
        visible={isDetailVisible}
        onCancel={handleCancel}
        footer={null} 
        width={700}
      >
        <FactureDetail idFacture={idFacture}/>
      </Modal>
    </Card>
  );
};

export default Factures;
