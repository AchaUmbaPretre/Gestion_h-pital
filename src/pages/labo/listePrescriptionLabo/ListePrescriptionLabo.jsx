import React, { useState, useEffect } from 'react';
import { Input, Select, Skeleton,Popconfirm, Table, Tag, notification, Card, Space, Button, Badge, DatePicker, Dropdown, Menu, Modal, Tooltip } from 'antd';import moment from 'moment';
import 'moment/locale/fr'; // Pour utiliser le format français
import { EyeOutlined,PlusCircleOutlined, UserOutlined,CheckOutlined,DeleteOutlined,FileExcelOutlined,FilePdfOutlined,FilterOutlined,PlusOutlined, CalendarOutlined, ClockCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import {  putRdvConfirmation } from '../../../services/rdvService';
import { useSelector } from 'react-redux';
import { getPrescriptionLabo } from '../../../services/laboService';
import LaboForm from '../laboForm/LaboForm';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ListePrescriptionLabo = () => {
  const [datas, setDatas] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [idPatient, setIdPatient] = useState('')
  const [idConsultation, setIdConsultation] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scroll = { x: 400 };
  const role = useSelector((state) => state.user.currentUser.user.role);
  const userId = useSelector((state) => state.user.currentUser.user.id);


    const fetchData = async () => {
      try {
          const response = await getPrescriptionLabo(userId)
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

  useEffect(() => {

    fetchData();
  }, [dateFilter]);

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleDateFilterChange = (dates) => {
    setDateFilter(dates);
  };

  const handleConfirmRdv = async (id_rdv) => {
    try {
      await putRdvConfirmation(id_rdv);
  
      notification.success({
        message: 'Confirmation réussie',
        description: 'Le rendez-vous a été confirmé avec succès.',
      });
  
      // Fetch the updated data after confirmation
      fetchData();
    } catch (error) {
      notification.error({
        message: 'Erreur de confirmation',
        description: 'Une erreur est survenue lors de la confirmation.',
      });
    }
  };
  
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(datas);
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


  const handleLabo = (id_patient, id_consultation) => {
    setIdPatient(id_patient)
    setIdConsultation(id_consultation)
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const filteredData = datas?.filter(item =>
    item.nom_patient.toLowerCase().includes(searchTerm)
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
        <Tag color='green' icon={<UserOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Docteur',
      dataIndex: 'nom_docteur',
      key: 'nom_docteur',
      render: (text) => (
        <Tag color='green' icon={<UserOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
        title: 'Consultation',
        dataIndex: 'nomConsultation',
        key: 'nomConsultation',
        render: (text) => (
          <Tag color='blue' icon={<FileTextOutlined />}>
            {text}
          </Tag>
        ),
      },
    {
        title: 'Analyse',
        dataIndex: 'nom_analyse',
        key: 'nom_analyse',
        render: (text) => (
          <Tag color='blue'>
            {text}
          </Tag>
        ),
      },
    {
      title: 'Date prescription',
      dataIndex: 'date_prescription',
      key: 'date_prescription',
      render: (text) => (
        <Tag color='blue' icon={<CalendarOutlined />}>
          {moment(text).locale('fr').format('DD MMMM YYYY')}
        </Tag>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Tag color='green' icon={<FileTextOutlined />}>
          {text}
        </Tag>
      ),
    },
/*     {
      title: 'Statut de confirmation',
      dataIndex: 'confirmation_docteur',
      key: 'confirmation_docteur',
      render: (confirmation_docteur) => (
        <Tag color={confirmation_docteur === 'OUI' ? 'green' : 'red'}>
          {confirmation_docteur === 'OUI' ? 'Confirmé' : 'En attente'}
        </Tag>
      ),
    }, */
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Laboratoire">
            <Button
              icon={<PlusCircleOutlined />}
              style={{ color: 'blue' }}
              onClick={() => handleLabo(record.patientId, record.id_consultation)}
              aria-label=""
            />
          </Tooltip>
{/*           <Tooltip title="Voir les détails">
            <Button
              icon={<EyeOutlined />}
              style={{ color: 'blue' }}
              onClick={() => handleViewDetails(record.id)}
              aria-label="Voir les détails du client"
            />
          </Tooltip> */}
{/*           {role === 'DOCTEUR' && record.confirmation_docteur !== 'OUI' && (
            <Tooltip title="Confirmer le rendez-vous">
              <Popconfirm
                title="Confirmer ce rendez-vous ?"
                onConfirm={() => handleConfirmRdv(record.id_rendez_vous)}
                okText="Oui"
                cancelText="Non"
              >
                <Button icon={<CheckOutlined />} style={{ color: 'green' }} />
              </Popconfirm>
            </Tooltip>
          )} */}
          <Tooltip title="Supprimer">
            <Popconfirm
              title="Etes-vous sûr de vouloir supprimer ce rendez-vous ?"
              okText="Oui"
              cancelText="Non"
            >
              <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    }
    
  ];
  

  return (
    <Card
      style={{padding:"20px 0px"}}
      title="Liste des prescriptions"
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
          pagination={{ pageSize: 10 }}
          rowKey="id_rdv"
          scroll={scroll}
          bordered
        />
      )}
      <Modal
        title=""
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} 
        width={700}
        centered
      >
        <LaboForm idPatient={idPatient} idConsultation={idConsultation}/>
      </Modal>
    </Card>
  );
};

export default ListePrescriptionLabo;
