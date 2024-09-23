import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { getTypeAnalyse, postPrescriptionLabo } from '../../../services/laboService';

const { Option } = Select;

const PrescriptionLaboratoireForm = ({id_consultation, onClick}) => {
  const [consultations, setConsultations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [typesAnalyse, setTypesAnalyse] = useState([]);
  const [loading, setLoading] = useState(false);


  const [form] = Form.useForm();

  // Fetch data for consultations, patients, doctors, and types of analyses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ typesAnalyseRes] = await Promise.all([
            getTypeAnalyse()
        ]);

        setTypesAnalyse(typesAnalyseRes.data);
      } catch (error) {
        notification.error({ message: 'Erreur', description: "Erreur lors du chargement des données" });
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Format date
      const formattedValues = {
        ...values,
        id_consultation: id_consultation,
        date_prescription: moment(values.date_prescription).format('YYYY-MM-DD HH:mm:ss'),
      };

      await postPrescriptionLabo(formattedValues)
      notification.success({ message: 'Succès', description: 'Prescription ajoutée avec succès.' });
      form.resetFields();
      onClick()
    } catch (error) {
      notification.error({ message: 'Erreur', description: 'Erreur lors de l’ajout de la prescription.' });
    }
    setLoading(false);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: '600px', margin: 'auto' }}
    >

      <Form.Item
        name="id_type_analyse"
        label="Type d'analyse"
        rules={[{ required: true, message: "Veuillez sélectionner un type d'analyse" }]}
      >
        <Select placeholder="Sélectionner un type d'analyse">
          {typesAnalyse.map((analyse) => (
            <Option key={analyse.id_type_analyse} value={analyse.id_type_analyse}>
              {analyse.nom_analyse}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="date_prescription"
        label="Date de prescription"
        rules={[{ required: true, message: 'Veuillez sélectionner la date de prescription' }]}
      >
        <DatePicker
          showTime
          placeholder="Sélectionner la date"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        name="status"
        label="Statut de la prescription"
        rules={[{ required: true, message: 'Veuillez sélectionner le statut' }]}
        initialValue="PRESCRIT"
      >
        <Select>
          <Option value="PRESCRIT">Prescrit</Option>
          <Option value="REALISÉ">Realisé</Option>
          <Option value="ANNULÉ">Annulé</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Enregistrer la prescription
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PrescriptionLaboratoireForm;
