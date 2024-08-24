import React from 'react';
import { Form, Input, DatePicker, Button, Row, Col } from 'antd';

const FormOrdonnance = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Code to handle form submission, e.g., sending data to an API
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Créer une Ordonnance</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="consultationId"
              label="ID de la Consultation"
              rules={[{ required: true, message: 'Veuillez entrer l\'ID de la consultation' }]}
            >
              <Input placeholder="Entrez l'ID de la consultation" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="medicamentId"
              label="ID du Médicament"
              rules={[{ required: true, message: 'Veuillez entrer l\'ID du médicament' }]}
            >
              <Input placeholder="Entrez l'ID du médicament" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="quantite"
              label="Quantité"
              rules={[{ required: true, message: 'Veuillez entrer la quantité' }]}
            >
              <Input placeholder="Entrez la quantité" type="number" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="dateOrdre"
              label="Date de l'Ordonnance"
              rules={[{ required: true, message: 'Veuillez sélectionner la date de l\'ordonnance' }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                placeholder="Sélectionnez la date de l'ordonnance"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Enregistrer l'Ordonnance
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormOrdonnance;
