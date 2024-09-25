import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal, Tooltip } from 'antd';
import { FileExcelOutlined, FilePdfOutlined,SendOutlined, CalendarOutlined, MoreOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { getPharma } from '../../services/pharmaService';
import { getLabo, postTransmission_resultat } from '../../services/laboService';
import LaboForm from './laboForm/LaboForm';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import TransmissionForm from './transmissionLabo/transmissionForm/TransmissionForm';

const { RangePicker } = DatePicker;

const Labo = () => {
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [idLabo, setIdLabo] = useState('');
  const [idDoctor, setIsDoctor] = useState('')

  const scroll = { x: 400 };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLabo(dateFilter);
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

  const showModalTrans = (idLabo, idDocteur) => {
    setIdLabo(idLabo)
    setIsDoctor(idDocteur)
    setIsModal(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModal(false)
  };

  const handleEnvoi = async(idLabo, idDocteur) => {
    const formData ={
      id_laboratoire : idLabo,
      id_docteur : idDocteur
    }
    try {
      await postTransmission_resultat(formData);

      notification.success({
        message: 'Succès',
        description: 'Les informations ont été enregistrées avec succès.',
      });
      navigate('/labo');
      setIsModalVisible(false);
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Erreur',
        description: "Une erreur s'est produite lors de l'enregistrement.",
      });
    }
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
      title: 'Consultation',
      dataIndex: 'nomConsultation',
      key:'nomConsultation',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Patient',
      dataIndex: 'nom_patient',
      key: 'nom_patient',
      render: (text) => <Tag color='green'>{text}</Tag>,
    },
    {
      title: 'Type analyse',
      dataIndex: 'nom_analyse',
      key: 'nom_analyse',
      render: (text) => <Tag color='blue'>{text}</Tag>,
    },
    {
        title: 'Date demande',
        dataIndex: 'date_demande',
        key: 'date_demande',
        render: (text) => 
          <Tag color='blue' icon={<CalendarOutlined />}>
            {moment(text).locale('fr').format('DD MMMM YYYY')}
          </Tag>
      },
      {
        title: 'Date analyse',
        dataIndex: 'date_analyse',
        key: 'date_analyse',
        render: (text) => 
          <Tag color='blue' icon={<CalendarOutlined />}>
            {moment(text).locale('fr').format('DD MMMM YYYY')}
          </Tag>
      },
      {
        title: 'resultats',
        dataIndex: 'resultats',
        key: 'resultats',
        render: (text) => <Tag color='blue'>{text}</Tag>,
      },
      {
        title: 'Remarques',
        dataIndex: 'remarques',
        key: 'remarques',
        render: (text) => <Tag color='blue'>{text}</Tag>,
      },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Tooltip title="Envoi le resultant chez le docteur">
          <Button
            icon={<SendOutlined />}
            style={{ color: 'blue' }}
            onClick={() => showModalTrans(record.id_laboratoire, record.personnelId)}
            aria-label=""
          />
        </Tooltip>
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
            Ajouter
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
          pagination={{ pageSize: 10 }}
          rowKey="id_docteur"
          scroll={scroll}
          bordered
        />
      )}
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} 
        width={800}
      >
         <LaboForm />
      </Modal>

      <Modal
        title=""
        visible={isModal}
        onCancel={handleCancel}
        footer={null} 
        width={800}
      >
         <TransmissionForm idLabo={idLabo} idDoctor={idDoctor}/>
      </Modal>
    </Card>
  );
};

export default Labo;
