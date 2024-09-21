import React from 'react';
import { Form, Input, Button, DatePicker, Select, Card, Row, Col, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const LaboForm = () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    // Envoyer les données au serveur ou traiter les données ici
    console.log('Form Values:', values);
    message.success('Analyse de laboratoire enregistrée avec succès!');
  };

  const handleFinishFailed = (errorInfo) => {
    message.error('Veuillez remplir correctement le formulaire.');
  };

  return (
    <Card title="Ajouter une nouvelle analyse de laboratoire" bordered={false} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        initialValues={{
          date_demande: moment(),
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="id_patient"
              label="Patient"
              rules={[{ required: true, message: 'Veuillez sélectionner un patient' }]}
            >
              <Select placeholder="Sélectionner un patient">
                <Option value="1">Patient 1</Option>
                <Option value="2">Patient 2</Option>
                {/* Ajouter les options de patients dynamiquement */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="id_type_analyse"
              label="Type d'analyse"
              rules={[{ required: true, message: "Veuillez sélectionner un type d'analyse" }]}
            >
              <Select placeholder="Sélectionner un type d'analyse">
                <Option value="1">Prise de sang</Option>
                <Option value="2">Analyse d'urine</Option>
                {/* Ajouter les types d'analyse dynamiquement */}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="date_demande"
              label="Date de la demande"
              rules={[{ required: true, message: 'Veuillez sélectionner la date de demande' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Sélectionner une date"
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="date_analyse"
              label="Date de l'analyse"
              rules={[{ required: false }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Sélectionner une date d'analyse"
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="resultats"
          label="Résultats de l'analyse"
          rules={[{ required: true, message: "Veuillez entrer les résultats de l'analyse" }]}
        >
          <TextArea rows={4} placeholder="Entrez les résultats ici" />
        </Form.Item>

        <Form.Item
          name="remarques"
          label="Remarques"
        >
          <TextArea rows={2} placeholder="Ajoutez des remarques si nécessaire" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} block>
            Enregistrer l'analyse
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LaboForm;
