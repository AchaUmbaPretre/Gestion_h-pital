import React, { useEffect, useState } from 'react';
import { getOrdonnanceOne } from '../../../services/ordonnanceService';
import { notification, Table, Typography, Spin, Button, Divider } from 'antd';
import './detailOrdonnance.css'
const { Title, Text } = Typography;

const DetailOrdonnance = ({ idConsultation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrdonnanceOne(idConsultation);
        setData(response.data);
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
  }, [idConsultation]);

  const printOrdonnance = () => {
    window.print();
  };

  // Patient information (assuming it's the same for all entries)
  const patient = data.length > 0 ? {
    nom: data[0].nom_patient,
    prenom: data[0].prenom,
    adresse: data[0].adresse,
    dateOrdre: data[0].dateOrdre // Retrieve the date of the order only once
  } : {};

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '800px', margin: '0 auto', border: '1px solid #ddd' }}>
      {loading ? (
        <Spin tip="Chargement..." />
      ) : (
        <>
          {/* Bouton d'impression */}
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <Button type="primary" onClick={printOrdonnance}>
              Imprimer l'Ordonnance
            </Button>
          </div>

          {/* En-tête de l'ordonnance */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            {/* Logo de l'hôpital */}
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

            {/* Nom de l'hôpital */}
            <div style={{ textAlign: 'right', flexGrow: 1 }}>
              <Title level={4} style={{ margin: 0 }}>Hôpital Général de Ndjili</Title>
              <Text>Adresse: Rue de l'Hôpital, Ndjili</Text>
            </div>
          </div>

          {/* Informations sur le patient */}
          <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <Title level={4}>Informations du patient</Title>
            <Text strong>Nom complet: </Text>
            <Text>{`${patient.prenom} ${patient.nom}`}</Text>
            <br />
            <Text strong>Adresse: </Text>
            <Text>{patient.adresse}</Text>
          </div>

          {/* Affichage de la Date de l'Ordre */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Title level={5}>Date de l'Ordre</Title>
            <Text strong>{new Date(patient.dateOrdre).toLocaleDateString()}</Text>
          </div>

          {/* Titre Ordonnance Médicale */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Title level={3}>Ordonnance Médicale</Title>
            <Text strong style={{ fontSize: '16px' }}>
              Consultation: {data.length > 0 ? data[0].nomConsultation : 'Non spécifié'}
            </Text>
          </div>

          {/* Tableau des médicaments sans la Date de l'Ordre */}
          <Table
            dataSource={data}
            pagination={false}
            rowKey="nomMedicament"
            bordered
            columns={[
              {
                title: 'Médicament',
                dataIndex: 'nomMedicament',
                key: 'nomMedicament',
                render: (text) => <Text strong>{text}</Text>,
              },
              {
                title: 'Quantité',
                dataIndex: 'quantite',
                key: 'quantite',
              },
              {
                title: 'Dose',
                dataIndex: 'dose',
                key: 'dose',
              },
              {
                title: 'Fréquence',
                dataIndex: 'frequence',
                key: 'frequence',
              },
              {
                title: 'Durée',
                dataIndex: 'duree',
                key: 'duree',
              }
            ]}
            style={{ marginBottom: '20px' }}
          />

          {/* Remarques et conseils médicaux */}
          <Divider />
          <div style={{ marginBottom: '30px' }}>
            <Title level={5}>Remarques:</Title>
            <Text>Veuillez suivre les indications et revenir après la durée indiquée si les symptômes persistent.</Text>
          </div>

          {/* Signature du médecin */}
          <div style={{ textAlign: 'right', marginTop: '50px' }}>
            <Text>Signature du Médecin: _____________________</Text>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailOrdonnance;
