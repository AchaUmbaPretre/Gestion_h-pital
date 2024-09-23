import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Button, Row, Col, notification } from 'antd';
import { postRdv } from '../../../services/rdvService';
import { getPatient } from '../../../services/patientService';
import { getDocteur } from '../../../services/docteurService';
import { useSelector } from 'react-redux';
import moment from 'moment'; // Importez moment pour gérer la date par défaut

const { TextArea } = Input;
const { Option } = Select;

const FormRDV = ({onClick, fetchData}) => {
  const [form] = Form.useForm();
  const [patient, setPatient] = useState([]);
  const [docteur, setDocteur] = useState([]);
  const userId = useSelector((state) => state.user.currentUser.user.id); // ID du réceptionniste

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientResponse, docteurResponse] = await Promise.all([
          getPatient(),
          getDocteur(),
        ]);

        setPatient(patientResponse.data);
        setDocteur(docteurResponse.data.data);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };

    fetchData();
  }, []);

  const onFinish = async (values) => {
    // Préparation des données sous forme d'objet
    const formData = {
      id_receptionniste: userId, // Utilisez l'ID du réceptionniste connecté
      id_patient: values.id_patient,
      id_docteur: values.id_docteur, // Correction : uniformisation du nom du champ
      date_rdv: values.date_rdv.format('YYYY-MM-DD'), // Formatage de la date
      heure_debut: values.heure_debut.format('HH:mm'), // Formatage de l'heure
      heure_fin: values.heure_fin.format('HH:mm'), // Formatage de l'heure
      type_rendezvous: values.type_rendezvous,
      motif_rdv: values.motif_rdv || '', // Le motif est optionnel
      statut: values.statut,
    };

    try {
      await postRdv(formData); // Envoi sous forme d'objet JSON
      notification.success({
        message: 'Succès',
        description: 'Le rendez-vous a été enregistré avec succès.',
      });
      form.resetFields();  // Réinitialiser le formulaire après soumission réussie
      fetchData();
      onClick()
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'enregistrement du rendez-vous.',
      });
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Gestion des Rendez-vous</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          date_rdv: moment(), // Définit la date du jour par défaut
          statut: 'Programmé', // Définit "Programmé" comme statut par défaut
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="id_patient"
              label="Patient"
              rules={[{ required: true, message: 'Veuillez sélectionner un patient' }]}
            >
              <Select placeholder="Sélectionnez un patient">
                {patient?.map((p) => (
                  <Option key={p.id_patient} value={p.id_patient}>
                    {p.nom_patient}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="id_docteur"  // Uniformisation avec le champ utilisé dans onFinish
              label="Docteur"
              rules={[{ required: true, message: 'Veuillez sélectionner un docteur' }]}
            >
              <Select placeholder="Sélectionnez un docteur">
                {docteur?.map((d) => (
                  <Option key={d.id} value={d.id}>
                    {d.username}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="date_rdv"
              label="Date du Rendez-vous"
              rules={[{ required: true, message: 'Veuillez sélectionner la date du rendez-vous' }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                placeholder="Sélectionnez la date"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="heure_debut"
              label="Heure de Début"
              rules={[{ required: true, message: 'Veuillez sélectionner l\'heure de début' }]}
            >
              <TimePicker
                format="HH:mm"
                style={{ width: '100%' }}
                placeholder="Sélectionnez l'heure de début"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="heure_fin"
              label="Heure de Fin"
              rules={[{ required: true, message: 'Veuillez sélectionner l\'heure de fin' }]}
            >
              <TimePicker
                format="HH:mm"
                style={{ width: '100%' }}
                placeholder="Sélectionnez l'heure de fin"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type_rendezvous"
              label="Type de Rendez-vous"
              rules={[{ required: true, message: 'Veuillez sélectionner le type de rendez-vous' }]}
            >
              <Select placeholder="Sélectionnez le type">
                <Option value="Consultation">Consultation</Option>
                <Option value="Suivi">Suivi</Option>
                <Option value="Urgence">Urgence</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="motif_rdv"
              label="Motif du Rendez-vous"
            >
              <TextArea rows={4} placeholder="Entrez le motif (optionnel)" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="statut"
              label="Statut"
              rules={[{ required: true, message: 'Veuillez sélectionner le statut du rendez-vous' }]}
            >
              <Select placeholder="Sélectionnez le statut">
                <Option value="Programmé">Programmé</Option>
                <Option value="Annulé">Annulé</Option>
                <Option value="Terminé">Terminé</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: '20px', width: '100%' }}>
            Enregistrer le Rendez-vous
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormRDV;
