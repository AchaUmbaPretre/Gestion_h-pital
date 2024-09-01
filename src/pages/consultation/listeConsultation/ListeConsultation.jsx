import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal, Tooltip, message, Popconfirm } from 'antd';
import moment from 'moment/moment';
import { FileOutlined,FilterOutlined,PlusOutlined,DollarOutlined,DeleteOutlined,EyeOutlined, FilePdfOutlined, UserOutlined, FileTextOutlined, CalendarOutlined, MoreOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { getConsultation } from '../../../services/consultservice';
import FicheConsultation from '../ficheConsultation/FicheConsultation';
import FormTraitement from '../../traitement/formTraitement/FormTraitement';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ListeConsultation = () => {
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTraitementVisible, setIsTraitementVisible] = useState(false);
  const [idConsult, setIdConsult] = useState('')


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

  const handleDelete = async (id) => {
    try {
      // Uncomment when delete function is available
      // await deleteClient(id);
      setDatas(datas.filter((item) => item.id_consultation !== id));
      message.success('Client deleted successfully');
    } catch (error) {
      notification.error({
        message: 'Erreur de suppression',
        description: 'Une erreur est survenue lors de la suppression du client.',
      });
    }
  };


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

  const handleTraitement = (id) => {
    setIdConsult(id)
    setIsTraitementVisible(true);
  };

  const handleViewDetails = (id) => {
    setIdConsult(id)
    setIsModalVisible(true);
  };
  

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsTraitementVisible(false)
  };

  const filteredData = datas?.filter(item =>
    item.diagnostic.toLowerCase().includes(searchTerm) ||
    item.notes.toLowerCase().includes(searchTerm) 
  );

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<FileOutlined />} >
        Fiche
      </Menu.Item>
      <Menu.Item key="2" icon={<FilePdfOutlined />} >
        Exporter en PDF
      </Menu.Item>
    </Menu>
  );

  console.log(idConsult)

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
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
      dataIndex: 'docteur',
      key: 'docteur',
      render: (text) => (
        <Tag color='blue' icon={<UserOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Type consultation',
      dataIndex: 'nomConsultation',
      key: 'nomConsultation',
      render: (text) => (
        <Tag color='blue' icon={<FileTextOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Prix',
      dataIndex: 'prixConsultation',
      key: 'prixConsultation',
      render: (text) => (
        <Tag color='blue' icon={<DollarOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'dateConsultation',
      key: 'dateConsultation',
      sorter: (a, b) => moment(a.dateConsultation) - moment(b.dateConsultation),
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
           <Tooltip title="Voir les détails">
            <Button
              icon={<EyeOutlined />}
              style={{ color: 'blue' }}
              onClick={() => handleViewDetails(record.id)}
              aria-label="Voir les détails du client"
            />
          </Tooltip>
          <Tooltip title="Traitement">
            <Button
              icon={<PlusOutlined />}
              style={{ color: 'blue' }}
              onClick={() => handleTraitement(record.id)}
              aria-label=""
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Etes-vous sûr de vouloir supprimer ce département ?"
              onConfirm={() => handleDelete(record.id)}
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
          rowKey="id_consultation"
          size="middle"
        />
      )}
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} 
        width={650}
        centered
      >
        <FicheConsultation id_consultation={idConsult}/>
      </Modal>

      <Modal
        title=""
        visible={isTraitementVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} 
        width={1020}
        centered
      >
        <FormTraitement id_consultation={idConsult}/>
      </Modal>
    </Card>
  );
};

export default ListeConsultation;
