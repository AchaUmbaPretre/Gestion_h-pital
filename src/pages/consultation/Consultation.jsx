import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import './consultation.scss';
import { getPatient } from '../../services/patientService';
import { Button, Checkbox, Input, notification, Skeleton, Table, Tag } from 'antd';
import { getConsultationType, postConsultation } from '../../services/consultservice';
import { getDocteur } from '../../services/docteurService';

const Consultation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [patients, setPatients] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultations, setSelectedConsultations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientResponse, consultResponse, doctorResponse] = await Promise.all([
          getPatient(),
          getConsultationType(),
          getDocteur(),
        ]);

        setPatients(patientResponse.data);
        setConsultations(consultResponse.data);
        setDoctors(doctorResponse?.data?.data || []);
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
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'email'
      ? value.toLowerCase()
      : isNaN(Number(value))
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;
    setData((prev) => ({ ...prev, [name]: updatedValue }));
  }, []);

  const handleCheckboxChange = (id_typeConsultation, checked) => {
    setSelectedConsultations(prev => 
      checked ? [...prev, id_typeConsultation] : prev.filter(id => id !== id_typeConsultation)
    );
  };

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'Nom',
      dataIndex: 'nomConsultation',
      key: 'nomConsultation',
      render: text => <Tag color='blue'>{text}</Tag>,
    },
    {
      title: 'Prix',
      dataIndex: 'prixConsultation',
      key: 'prixConsultation',
      render: text => <Tag color='blue'>{text} Fc</Tag>,
    },
    {
      title: 'Crochet',
      key: 'action',
      render: (text, record) => (
        <Checkbox
          onChange={e => handleCheckboxChange(record.id_typeConsultation, e.target.checked)}
        />
      ),
    },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      for (const selected of selectedConsultations) {
        await postConsultation({
          ...data,
          id_typeConsultation: selected,
        });
      }
      notification.success({
        message: 'Succès',
        description: 'Les informations ont été enregistrées avec succès.',
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'enregistrement des informations.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="consultation">
      <div className="consultation-wrapper">
        <div className="consultation-top">
          <div className="consultation-top-left">
            <label>Sélectionnez un patient <span>*</span></label>
            <Select
              name="id_patient"
              options={patients.map(item => ({
                value: item.id_patient,
                label: item.nom_patient,
              }))}
              placeholder="Sélectionnez un patient..."
              onChange={(selectedOption) => setData((prev) => ({ ...prev, patientId: selectedOption.value }))}
            />
          </div>
          <div className="consultation-top-right">

          </div>
        </div>
        <div className="consultation-center">
          <div className="consultation-left">
            <div className="consult-title-row">
              <h2 className="consult-title-h2">Consultation</h2>
            </div>
            <div className="consult-row-search">
              <Input.Search placeholder='Recherche....' />
            </div>
            <div className="consult-row-tableau">
              {loading ? (
                <Skeleton active />
              ) : (
                <Table
                  columns={columns}
                  dataSource={consultations}
                  pagination={{ pageSize: 5 }}
                  rowKey="id_consultation"
                />
              )}
            </div>
          </div>
          <div className="consultation-right">
            <h2 className="consult_h2">Informations supplémentaires</h2>
            <div className="consult-right-wrapper">
              <div className="consult-control">
                <label>Médecin ou docteur <span style={{ color: 'red' }}>*</span></label>
                <Select
                  name="personnelId"
                  options={doctors.map(doctor => ({
                    value: doctor.id,
                    label: doctor.username,
                  }))}
                  placeholder="Sélectionnez un docteur..."
                  onChange={(selectedOption) => setData((prev) => ({ ...prev, personnelId: selectedOption.value }))}
                />
              </div>

              <div className="consult-control">
                <label>Diagnostic <span style={{ color: 'red' }}>*</span></label>
                <Input.TextArea name='diagnostic' placeholder='Entrez le diagnostic...' onChange={handleInputChange} />
              </div>

              <div className="consult-control">
                <label>Note <span style={{ color: 'red' }}>*</span></label>
                <Input.TextArea name='notes' placeholder='Entrez la note....' onChange={handleInputChange} />
              </div>
              <div className="consult-row-btn">
                <Button type="primary" loading={isLoading} onClick={handleSubmit}>Envoyer</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
