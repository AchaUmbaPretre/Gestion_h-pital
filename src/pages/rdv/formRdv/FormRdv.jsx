import React from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Button, Row, Col, notification } from 'antd';
import { postRdv } from '../../../services/rdvService';

const { TextArea } = Input;
const { Option } = Select;

const FormRDV = () => {
  const [form] = Form.useForm();

  const onFinish = async(values) => {
    try {
      await postRdv(values);
      notification.success({
        message: 'Succès',
        description: 'Les informations ont été enregistrées avec succès.',
      });
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'enregistrement des informations.',
      });
    } finally {
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Gestion des Rendez-vous</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="id_patient"
              label="ID du Patient"
              rules={[{ required: false, message: 'Veuillez entrer l\'ID du patient' }]}
            >
              <Input placeholder="Entrez l'ID du patient" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="id_utilisateur"
              label="ID de l'Utilisateur"
              rules={[{ required: false, message: 'Veuillez entrer l\'ID de l\'utilisateur' }]}
            >
              <Input placeholder="Entrez l'ID de l'utilisateur" />
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
