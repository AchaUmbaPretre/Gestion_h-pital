import React, { useEffect, useState } from 'react';
import { getFactureDetail } from '../../../services/facturesService';
import { notification, Table, Card, Typography, Divider, Row, Col, Tag, Button } from 'antd';
import { format } from 'date-fns';
import './factureDetail.scss'; // Custom styling

const { Title, Text } = Typography;

const FactureDetail = ({ idFacture }) => {
  const [data, setData] = useState([]);
  const [factureInfo, setFactureInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFactureDetail(idFacture);
        setData(response.data); 
        setFactureInfo(response.data[0]);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };

    fetchData();
  }, [idFacture]);

  const columns = [
    {
      title: 'Type de Service',
      dataIndex: 'service_type',
      key: 'service_type',
    },
    {
      title: 'Détail',
      dataIndex: 'Type',
      key: 'Type',
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      render: amount => <Text>${amount}</Text>,
    },
  ];

  // Fonction d'impression
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="facture-detail">
      {/* Header with logo and hospital information */}
      <div className="header">
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
        <div className="hospital-info">
          <Title level={2}>Hôpital Général de Ndjili</Title>
          <Text>Avenue de l'Hôpital, Ndjili</Text>
          <Text>Téléphone : +243 123 456 789</Text>
        </div>
      </div>

      {/* Bouton d'impression */}
      <div className="print-button">
        <Button type="primary" onClick={handlePrint}>
          Imprimer la facture
        </Button>
      </div>

      {/* General information section */}
      <Card className="facture-card">
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Facture No :</Text> <Text>{factureInfo.id_facture || idFacture}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Date d'émission :</Text> <Text>{factureInfo.date_emission ? format(new Date(factureInfo.date_emission), 'dd/MM/yyyy') : ''}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Date Limite :</Text> <Text>{factureInfo.date_limite ? format(new Date(factureInfo.date_limite), 'dd/MM/yyyy') : ''}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Statut :</Text> 
            <Tag color={factureInfo.status === 'En attente' ? 'orange' : 'green'}>
              {factureInfo.status || 'En attente'}
            </Tag>
          </Col>
        </Row>
      </Card>

      {/* Détails de la Facture */}
      <Card className="facture-card details-section">
        <Title level={4}>Détails de la Facture</Title>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id_facture"
          pagination={false}
        />
      </Card>

      {/* Total Section */}
      <Card className="facture-card total-section">
        <Row justify="end">
          <Col span={12}>
            <Text strong>Montant Total :</Text>
            <Title level={4}>${factureInfo.montant_total || 0}</Title>
          </Col>
        </Row>
      </Card>

      {/* Footer with hospital contact details */}
      <div className="footer">
        <Text>Adresse : Avenue de l'Hôpital, Ndjili</Text>
        <Text>Téléphone : +243 123 456 789</Text>
        <Text>Email : contact@hopitalndjili.cd</Text>
      </div>
    </div>
  );
};

export default FactureDetail;
