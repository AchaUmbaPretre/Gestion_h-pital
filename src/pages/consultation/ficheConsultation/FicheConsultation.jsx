import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Divider, Typography, notification } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getConsultationOne } from '../../../services/consultservice';

const { Title, Text } = Typography;

const FicheConsultation = ({id_consultation}) => {
    const [consultationData, setConsultationData] = useState([])

    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [constResponse] = await Promise.all([
          getConsultationOne(id_consultation)
        ]);

        setConsultationData(constResponse.data[0]);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };

    fetchData();
  }, [id_consultation]);
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Card 
        style={{
          margin: '20px auto',
          padding: '30px',
          borderRadius: '15px',
          maxWidth: '800px',
          backgroundColor: '#fafafa',
          border: '1px solid #eaeaea'
        }}
        hoverable
      >
        <Title 
          level={3} 
          style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: '#1890ff',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }}
        >
          Fiche de Consultation
        </Title>

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Text style={{ fontWeight: 'bold', color: '#595959' }}>N° :</Text>
            <Text style={{ marginLeft: '8px', color: '#000' }}>{consultationData.id}</Text>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#d9d9d9' }} />

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Text style={{ fontWeight: 'bold', color: '#595959' }}>Patient:</Text>
            <Text style={{ marginLeft: '8px', color: '#000' }}>{consultationData.nom_patient}</Text>
          </Col>
          <Col span={12}>
            <Text style={{ fontWeight: 'bold', color: '#595959' }}>Docteur:</Text>
            <Text style={{ marginLeft: '8px', color: '#000' }}>{consultationData.docteur}</Text>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#d9d9d9' }} />

        <Row gutter={[24, 24]}>
           <Col span={12}>
            <Text style={{ fontWeight: 'bold', color: '#595959' }}>Date de Consultation:</Text>
            <Text style={{ marginLeft: '8px', color: '#000' }}>
              {moment(consultationData?.dateConsultation).format('LL, HH:mm')}
            </Text>
          </Col>
          <Col span={12}>
            <Text style={{ fontWeight: 'bold', color: '#595959' }}>Type de Consultation:</Text>
            <Text style={{ marginLeft: '8px', color: '#000' }}>{consultationData.nomConsultation}</Text>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#d9d9d9' }} />

        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Text style={{ fontWeight: 'bold', color: '#595959' }}>Diagnostic:</Text>
            <Card 
              bordered={false} 
              style={{ 
                background: '#f0f0f0', 
                padding: '15px', 
                marginTop: '10px',
                borderRadius: '10px',
                color: '#000'
              }}
            >
              {consultationData.diagnostic}
            </Card>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#d9d9d9' }} />

        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Text style={{ fontWeight: 'bold', color: '#595959' }}>Notes:</Text>
            <Card 
              bordered={false} 
              style={{ 
                background: '#f0f0f0', 
                padding: '15px', 
                marginTop: '10px',
                borderRadius: '10px',
                color: '#000'
              }}
            >
              {consultationData.notes}
            </Card>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#d9d9d9' }} />

        <Row gutter={[24, 24]}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Text style={{ fontWeight: 'bold', color: '#595959' }}>Prix de la Consultation:</Text>
             <Text style={{ marginLeft: '8px', fontSize: '18px', color: '#ff4d4f' }}>
              {consultationData.prixConsultation.toLocaleString()} CDF
            </Text>
          </Col>
        </Row>
      </Card>

      <Col span={12} style={{ textAlign: 'right' }}>
        <Button
          icon={<PrinterOutlined />}
          onClick={handlePrint}
          type="primary"
          className="no-print"
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
        >
          Imprimer
        </Button>
      </Col>

      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FicheConsultation;
