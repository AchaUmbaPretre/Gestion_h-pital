import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './consultation.scss'
import { getPatient } from '../../services/patientService';
import { Checkbox, Input, notification, Skeleton, Table, Tag } from 'antd';
import { getConsultationType } from '../../services/consultservice';

const Consultation = () => {
  const [data, setData] = useState([]);
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consult, setConsult] = useState([]);
  const [selectedConsultations, setSelectedConsultations] = useState([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await getPatient();  // Ajoutez le dateFilter si nécessaire
        setPatient(response.data);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };

    fetchPatient();
  }, []);

  useEffect(() => {
    const fetchType = async () => {
      try {
        const response = await getConsultationType();  // Ajoutez le dateFilter si nécessaire
        setConsult(response.data);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };

    fetchType();
  }, []);

  const handleCheckboxChange = (id_typeConsultation, checked) => {
    setSelectedConsultations(prev => {
      if (checked) {
        return [...prev, id_typeConsultation];
      } else {
        return prev.filter(id => id !== id_typeConsultation);
      }
    });
  };

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'Nom',
      dataIndex: 'nomConsultation',
      key: 'nomConsultation',
      render: (text) => (
        <Tag color='blue'>
          {text}
        </Tag>
      )
    },
    {
      title: "prix",
      dataIndex: 'prixConsultation',
      key: 'prixConsultation',
      render: (text) => (
        <Tag color='blue'>
          {text} $
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(record.id_typeConsultation, e.target.checked)}
        >
        </Checkbox>
      )
    },
  ];

  return (
    <>
      <div className="consultation">
        <div className="consultation-wrapper">
          <div className="consultation-top">
            <div className="consultation-top-left">
              <label htmlFor="">Sélectionnez un patient <span>*</span></label>
              <Select
                name="id_patient"
                options={patient?.map((item) => ({
                value: item.id_patient,
                label: item.nom_patient,
                }))}
                placeholder="Sélectionnez un patient..."
              />
            </div>
            <div className="consultation-top-right">
              <h2 className="consult-h2">Information du client</h2>
              <div className="consult-wrapper">
                <div className="consult-controle">
                  <span className="consult-span">Nom <span style={{color: 'red'}}>*</span> : </span>
                  <span className="consult-span-sous">Acha</span>
                </div>
                <div className="consult-controle">
                  <span className="consult-span">Prenom <span style={{color: 'red'}}>*</span> : </span>
                  <span className="consult-span-sous">Acha</span>
                </div>
                <div className="consult-controle">
                  <span className="consult-span">Date de naissance <span style={{color: 'red'}}>*</span> : </span>
                  <span className="consult-span-sous">Acha</span>
                </div>
                <div className="consult-controle">
                  <span className="consult-span">Adresse <span style={{color: 'red'}}>*</span> : </span>
                  <span className="consult-span-sous">Av. Muzibila Q/Debonhomme N°40</span>
                </div>
                <div className="consult-controle">
                <span className="consult-span">Tel <span style={{color: 'red'}}>*</span> : </span>
                <span className="consult-span-sous">+243824562776</span>
                </div>
              </div>

            </div>
          </div>
          <div className="consultation-center">
            <div className="consultation-left">
                <div className="consult-title-row">
                  <h2 className="consult-title-h2">Consultation</h2>
                </div>
                <div className="consult-row-search">
                  <Input.Search placeholder='Recherche....'/>
                </div>
                <div className="consult-row-tableau">
                {loading ? (
                  <Skeleton active />
                ) : (
                  <Table
                    columns={columns}
                    dataSource={consult}
                    pagination={{ pageSize: 5 }}
                    rowKey="id_consultation"  // Ajoutez une clé unique pour chaque ligne
                  />
                )}
                </div>
            </div>
            <div className="consultation-right">
              AAAAA
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Consultation
