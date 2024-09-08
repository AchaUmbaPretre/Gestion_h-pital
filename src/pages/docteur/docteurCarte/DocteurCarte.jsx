import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Divider, notification, Button, Spin } from 'antd';
import { getDocteurOne } from '../../../services/docteurService';

const { Title, Text } = Typography;

const DocteurCarte = ({ idDocteur }) => {
    const [data, setData] = useState(null); // Use null instead of array for single item
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDocteurOne(idDocteur);
                setData(response.data.data[0] || {}); // Set empty object if no data
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
    }, [idDocteur]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>;
    }

    if (!data) {
        return <div style={{ textAlign: 'center' }}>Aucune donnée disponible</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <Card
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    borderRadius: '15px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    border: '1px solid #d9d9d9',
                    padding: '20px',
                    position: 'relative',
                }}
                bodyStyle={{ padding: '20px' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    {/* Logo de l'hôpital */}
                    <div
                        style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#0073e6',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#fff',
                            fontSize: '30px',
                            fontWeight: 'bold',
                        }}
                    >
                        H
                    </div>

                    {/* Nom de l'hôpital */}
                    <div style={{ textAlign: 'right', flexGrow: 1 }}>
                        <Title level={4} style={{ margin: 0, color: '#0073e6' }}>Hôpital Général de Ndjili</Title>
                        <Text style={{ color: '#595959' }}>Adresse: Rue de l'Hôpital, Ndjili</Text>
                    </div>
                </div>

                <Divider style={{ borderColor: '#d9d9d9', margin: '20px 0' }} />

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Title level={5} style={{ marginBottom: '10px', color: '#1890ff' }}>
                            Dr. {data.prenom} {data.postnom || ''}
                        </Title>
                        <Text style={{ display: 'block', fontSize: '16px', color: '#595959' }}>
                            {data.nom_specialite || 'Spécialité non précisée'}
                        </Text>
                    </Col>
                </Row>

                <Divider style={{ borderColor: '#d9d9d9', margin: '20px 0' }} />

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Text style={{ fontWeight: 'bold', color: '#595959' }}>Téléphone:</Text>
                        <Text style={{ marginLeft: '8px', color: '#000' }}>{data.phone_number || 'N/A'}</Text>
                    </Col>
                    <Col span={24}>
                        <Text style={{ fontWeight: 'bold', color: '#595959' }}>Email:</Text>
                        <Text style={{ marginLeft: '8px', color: '#000' }}>{data.email || 'N/A'}</Text>
                    </Col>
                    <Col span={24}>
                        <Text style={{ fontWeight: 'bold', color: '#595959' }}>Adresse:</Text>
                        <Text style={{ marginLeft: '8px', color: '#000' }}>{data.adresse || 'N/A'}</Text>
                    </Col>
                </Row>

                {/* Print Button */}
                <Button
                    type="primary"
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 1,
                    }}
                    onClick={handlePrint}
                >
                    Imprimer
                </Button>
            </Card>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    .ant-card {
                        box-shadow: none;
                        border: 1px solid #d9d9d9;
                    }
                    .ant-btn {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default DocteurCarte;
