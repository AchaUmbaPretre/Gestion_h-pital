import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Row, Col, notification, Modal } from 'antd';
import { getDocteurSpecialite, postDocteur } from '../../../services/docteurService';
import { useNavigate } from 'react-router-dom';
import './docteurForm.scss';

const DocteurForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [specialites, setSpecialites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Récupérer les spécialités
  useEffect(() => {
    const fetchData = async () => {
      try {
        const specialiteResponse = await getDocteurSpecialite();
        setSpecialites(specialiteResponse?.data.data);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Impossible de charger les spécialités.',
        });
      }
    };
    fetchData();
  }, []);

  // Soumettre le formulaire
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      // Envoyer les données
      await postDocteur(values);

      notification.success({
        message: 'Succès',
        description: 'Les informations ont été enregistrées avec succès.',
      });
      navigate('/liste_docteur');
      setIsModalVisible(false); // Fermer le modal
      window.location.reload();
    } catch (error) {
      notification.error({
        message: 'Erreur',
        description: "Une erreur s'est produite lors de l'enregistrement.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Afficher le modal de confirmation
  const showModal = () => {
    form.validateFields()
      .then(() => setIsModalVisible(true))
      .catch(() => notification.error({ message: 'Erreur', description: 'Veuillez corriger les erreurs avant de continuer.' }));
  };

  const handleOk = () => form.submit();
  const handleCancel = () => setIsModalVisible(false);

  return (
    <div className="docteurForm">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ specialite: '', phone_number: '' }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Nom d'utilisateur"
              name="username"
              rules={[{ required: true, message: 'Veuillez entrer le nom d\'utilisateur' }]}
            >
              <Input placeholder="Nom d'utilisateur" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Prénom"
              name="prenom"
              rules={[{ required: true, message: 'Veuillez entrer le prénom' }]}
            >
              <Input placeholder="Prénom" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Numéro de téléphone"
              name="phone_number"
              rules={[{ required: true, message: 'Veuillez entrer le numéro de téléphone' }]}
            >
              <Input placeholder="Numéro de téléphone" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Veuillez entrer un email valide' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Adresse"
              name="adresse"
              rules={[{ required: true, message: 'Veuillez entrer l\'adresse' }]}
            >
              <Input placeholder="Adresse" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Spécialité"
              name="specialite"
              rules={[{ required: true, message: 'Veuillez sélectionner une spécialité' }]}
            >
              <Select
                placeholder="Sélectionnez une spécialité"
                options={specialites?.map((specialite) => ({
                  label: specialite.nom_specialite,
                  value: specialite.id_specialite,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" onClick={showModal} loading={isLoading}>
            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <p>Êtes-vous sûr de vouloir enregistrer ces informations ?</p>
      </Modal>
    </div>
  );
};

export default DocteurForm;
