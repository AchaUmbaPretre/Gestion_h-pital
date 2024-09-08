import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Radio, Row, Col, Modal, notification } from 'antd'; // Ant Design imports
import './patientForm.scss'; // Your custom SCSS for additional styling
import { getTypePatient, postPatient } from '../../../services/patientService';
import moment from 'moment';

const { Option } = Select;

const PatientForm = () => {
  const [form] = Form.useForm(); // Ant Design Form
  const [type, setType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typeResponse] = await Promise.all([getTypePatient()]);
        setType(typeResponse.data);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await postPatient(values);
      notification.success({
        message: 'Succès',
        description: 'Les informations ont été enregistrées avec succès.',
      });
      form.resetFields(); // Reset form after submission
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: 'Erreur',
        description: "Une erreur s'est produite lors de l'enregistrement des informations.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <div className="patientForm">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          dateNaissance: moment(),
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nom du patient"
              name="nom_patient"
              rules={[{ required: true, message: 'Veuillez entrer le nom du patient' }]}
            >
              <Input placeholder="Entrez le nom..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Prénom"
              name="prenom"
              rules={[{ required: true, message: 'Veuillez entrer le prénom' }]}
            >
              <Input placeholder="Entrez le prénom..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Date de Naissance"
              name="dateNaissance"
              rules={[{ required: true, message: 'Veuillez sélectionner la date de naissance' }]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Lieu de Naissance"
              name="lieuNaissance"
              rules={[{ required: true, message: 'Veuillez entrer le lieu de naissance' }]}
            >
              <Input placeholder="Entrez le lieu..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Sexe"
              name="sexe"
              rules={[{ required: true, message: 'Veuillez sélectionner le sexe' }]}
            >
              <Radio.Group>
                <Radio value="M">Masculin</Radio>
                <Radio value="F">Féminin</Radio>
                <Radio value="Autres">Autres</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Groupe Sanguin"
              name="groupeSanguin"
              rules={[{ required: true, message: 'Veuillez sélectionner le groupe sanguin' }]}
            >
              <Select placeholder="Sélectionnez le groupe sanguin">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                  <Option key={group} value={group}>{group}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Province"
              name="province"
              rules={[{ required: true, message: 'Veuillez entrer la province' }]}
            >
              <Input placeholder="Entrez la province..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Adresse"
              name="adresse"
              rules={[{ required: true, message: "Veuillez entrer l'adresse" }]}
            >
              <Input placeholder="Entrez l'adresse..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Téléphone"
              name="tel"
              rules={[{ required: true, message: 'Veuillez entrer un numéro de téléphone' }]}
            >
              <Input type="tel" placeholder="Entrez le numéro..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email (facultatif)"
              name="email"
            >
              <Input type="email" placeholder="Entrez l'email..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Société du patient (facultatif)" name="societePatient">
              <Input placeholder="Entrez la société..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Assurance (facultatif)" name="assurance">
              <Input placeholder="Entrez l'assurance..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Profession (facultatif)" name="profession">
              <Input placeholder="Entrez la profession..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Type de Patient"
              name="typePatient"
              rules={[{ required: true, message: 'Veuillez sélectionner le type de patient' }]}
            >
              <Select placeholder="Sélectionnez le type de patient">
                {type.map((tp) => (
                  <Option key={tp.id_typePatient} value={tp.id_typePatient}>{tp.nom_typePatient}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" onClick={showModal} loading={isLoading} block>
            Enregistrer
          </Button>
        </Form.Item>
        <Modal
          title="Confirmation"
          visible={isModalVisible}
          onOk={form.submit}
          onCancel={handleCancel}
          confirmLoading={isLoading}
        >
          <p>Êtes-vous sûr de vouloir enregistrer ces informations ?</p>
        </Modal>
      </Form>
    </div>
  );
};

export default PatientForm;
