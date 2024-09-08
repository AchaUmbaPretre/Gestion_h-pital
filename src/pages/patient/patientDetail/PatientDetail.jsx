import React, { useEffect, useState } from 'react';
import { notification, Card, Row, Col, Typography, Divider, Button } from 'antd';
import { getPatientOne } from '../../../services/patientService';
import './patientDetail.scss';

const { Title, Text } = Typography;

const PatientDetail = ({ idPatient }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPatientOne(idPatient);
        setData(response.data[0] || {}); // Set empty object if no data
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
  }, [idPatient]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <Text>Chargement...</Text>;

  return (
    <div>
      {/* Bouton pour imprimer */}
      <Button onClick={handlePrint} type="primary" style={{ marginBottom: 20 }}>
        Imprimer la carte du patient
      </Button>

      <Card className="patient-card" bordered={false}>
        {/* Logo et informations de l'hôpital */}
        <div className="header">
          <div className="logo">
            <div
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#0073e6',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              H
            </div>
          </div>
          <div className="hospital-info">
            <Title level={3} style={{ marginBottom: 0 }}>
              Hôpital Général de Ndjili
            </Title>
            <Text>Carte du Patient</Text>
          </div>
        </div>

        <Divider />

        {/* Informations du patient */}
        <div className="patient-info">
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>Nom :</Text> <Text>{data.nom_patient || 'N/A'}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Prénom :</Text> <Text>{data.prenom || 'N/A'}</Text>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Text strong>Date de Naissance :</Text>{' '}
              <Text>{data.dateNaissance ? new Date(data.dateNaissance).toLocaleDateString() : 'N/A'}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Sexe :</Text> <Text>{data.sexe || 'N/A'}</Text>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Text strong>Adresse :</Text> <Text>{data.adresse || 'N/A'}</Text>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Text strong>Téléphone :</Text> <Text>{data.tel || 'N/A'}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Type de Patient :</Text> <Text>{data.nom_typePatient || 'N/A'}</Text>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* Footer avec la date d'inscription */}
        <div className="footer">
          <Text>Inscrit le : {data.dateInscription ? new Date(data.dateInscription).toLocaleDateString() : 'N/A'}</Text>
        </div>
      </Card>
    </div>
  );
};

export default PatientDetail;
