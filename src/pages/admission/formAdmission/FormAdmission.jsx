import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Button, notification, Row, Col, Select } from 'antd';
import moment from 'moment';
import { postAdmission } from '../../../services/admissionService';
import { getService } from '../../../services/serviceService';
import { getPatient } from '../../../services/patientService';

const { TextArea } = Input;
const { Option } = Select;

const FormAdmission = ({ initialData = {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState([]);
  const [user, setUser] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getPatient();
        setUser(response.data);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getService();
        setService(response.data);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };

    fetchData();
  }, []);

  const handleFinish = async (values) => {
    setIsLoading(true);

    const formattedValues = {
      ...values,
      dateAdmission: values.dateAdmission.format('YYYY-MM-DD'),
      dateSortie: values.dateSortie ? values.dateSortie.format('YYYY-MM-DD') : null,
    };

    try {
      await postAdmission(formattedValues);
      notification.success({
        message: 'Succès',
        description: 'Les informations ont été enregistrées avec succès.',
      });
      form.resetFields();
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s est produite lors de l enregistrement des informations.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="formAdmission" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...initialData,
          dateAdmission: initialData.dateAdmission ? moment(initialData.dateAdmission) : null,
          dateSortie: initialData.dateSortie ? moment(initialData.dateSortie) : null,
        }}
        onFinish={handleFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="patientId"
              label="Patient"
              rules={[{ required: true, message: 'Veuillez saisir le nom du patient' }]}
            >
              <Select placeholder="Sélectionnez un patient" showSearch>
                {user.map((p) => (
                  <Option key={p.id_patient} value={p.id_patient}>
                    {p.nom_patient}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="serviceId"
              label="Service"
              rules={[{ required: true, message: 'Veuillez saisir l\'ID du service' }]}
            >
              <Select placeholder="Sélectionnez un service" showSearch>
                {service.map((s) => (
                  <Option key={s.id} value={s.id}>
                    {s.nomService}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateAdmission"
              label="Date d'Admission"
              rules={[{ required: true, message: 'Veuillez sélectionner la date d\'admission' }]}
            >
              <DatePicker format="YYYY-MM-DD" placeholder="Sélectionnez la date d'admission" style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="dateSortie"
              label="Date de Sortie"
            >
              <DatePicker format="YYYY-MM-DD" placeholder="Sélectionnez la date de sortie (optionnel)" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="raisonAdmission"
              label="Raison de l'Admission"
              rules={[{ required: true, message: 'Veuillez saisir la raison de l\'admission' }]}
            >
              <TextArea placeholder="Entrez la raison de l'admission" rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%' }}>
            Soumettre
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormAdmission;
