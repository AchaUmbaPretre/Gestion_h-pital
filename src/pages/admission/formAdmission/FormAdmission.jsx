import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const FormAdmission = ({ onSubmit, initialData }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    // Convertir les dates en format compatible avec MySQL
    const formattedValues = {
      ...values,
      dateAdmission: values.dateAdmission.format('YYYY-MM-DD'),
      dateSortie: values.dateSortie ? values.dateSortie.format('YYYY-MM-DD') : null,
    };

    // Appeler la fonction de soumission (onSubmit)
    onSubmit(formattedValues);
  };

  return (
    <div className="formAdmission">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...initialData,
          dateAdmission: initialData?.dateAdmission ? moment(initialData.dateAdmission) : null,
          dateSortie: initialData?.dateSortie ? moment(initialData.dateSortie) : null,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="patientId"
          label="Patient ID"
          rules={[{ required: true, message: 'Veuillez saisir l\'ID du patient' }]}
        >
          <Input placeholder="Entrez l'ID du patient" />
        </Form.Item>

        <Form.Item
          name="serviceId"
          label="Service ID"
          rules={[{ required: true, message: 'Veuillez saisir l\'ID du service' }]}
        >
          <Input placeholder="Entrez l'ID du service" />
        </Form.Item>

        <Form.Item
          name="dateAdmission"
          label="Date d'Admission"
          rules={[{ required: true, message: 'Veuillez sélectionner la date d\'admission' }]}
        >
          <DatePicker format="YYYY-MM-DD" placeholder="Sélectionnez la date d'admission" />
        </Form.Item>

        <Form.Item
          name="dateSortie"
          label="Date de Sortie"
        >
          <DatePicker format="YYYY-MM-DD" placeholder="Sélectionnez la date de sortie (optionnel)" />
        </Form.Item>

        <Form.Item
          name="raisonAdmission"
          label="Raison de l'Admission"
          rules={[{ required: true, message: 'Veuillez saisir la raison de l\'admission' }]}
        >
          <TextArea placeholder="Entrez la raison de l'admission" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Soumettre
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormAdmission;
