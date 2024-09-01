import React, { useState } from 'react';
import { Form, Input, Button, Select, Space, Table, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { postTraitement } from '../../../services/traitementService';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const FormTraitement = ({ id_consultation }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [medicaments, setMedicaments] = useState([{ key: 1 }]);

  const handleAddRow = () => {
    setMedicaments([...medicaments, { key: medicaments.length + 1 }]);
  };

  const handleRemoveRow = (key) => {
    if (medicaments.length > 1) {
      setMedicaments(medicaments.filter(item => item.key !== key));
    }
  };

  const handleFinish = async (values) => {
    console.log(values); // Vérifiez ici les données avant soumission
    setIsLoading(true);
    try {
      const { medicaments: medicamentsList } = values;
      
      // Filtrer les éléments `undefined` ou `null`
      const filteredMedicaments = medicamentsList.filter(item => item !== undefined && item !== null);
      
      const traitementPromises = filteredMedicaments.map(data =>
        postTraitement({
          ...data,
          consultationId: id_consultation,
        })
      );
      await Promise.all(traitementPromises);
      notification.success({
        message: 'Succès',
        description: 'Les informations ont été enregistrées avec succès.',
      });
      form.resetFields();
      setMedicaments([{ key: 1 }]);
      window.location.reload();
      navigate('/traitement')

    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'enregistrement des informations.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const columns = [
    {
      title: 'Médicament',
      dataIndex: 'medicament',
      key: 'medicament',
      render: (_, record) => (
        <Form.Item
          name={['medicaments', record.key, 'medicament']}
          rules={[{ required: true, message: 'Veuillez sélectionner un médicament' }]}
        >
          <Select placeholder="Sélectionnez un médicament">
            <Option value="medicament1">Médicament 1</Option>
            <Option value="medicament2">Médicament 2</Option>
            <Option value="medicament3">Médicament 3</Option>
            {/* Ajoutez d'autres options de médicaments ici */}
          </Select>
        </Form.Item>
      )
    },
    {
      title: 'Dose',
      dataIndex: 'dose',
      key: 'dose',
      render: (_, record) => (
        <Form.Item
          name={['medicaments', record.key, 'dose']}
          rules={[{ required: true, message: 'Veuillez entrer la dose' }]}
        >
          <Input placeholder="Entrez la dose" />
        </Form.Item>
      )
    },
    {
      title: 'Fréquence',
      dataIndex: 'frequence',
      key: 'frequence',
      render: (_, record) => (
        <Form.Item
          name={['medicaments', record.key, 'frequence']}
          rules={[{ required: true, message: 'Veuillez entrer la fréquence' }]}
        >
          <Input placeholder="Entrez la fréquence" />
        </Form.Item>
      )
    },
    {
      title: 'Durée',
      dataIndex: 'duree',
      key: 'duree',
      render: (_, record) => (
        <Form.Item
          name={['medicaments', record.key, 'duree']}
          rules={[{ required: true, message: 'Veuillez entrer la durée' }]}
        >
          <Input placeholder="Entrez la durée" />
        </Form.Item>
      )
    },
    {
      title: 'Instructions supplémentaires',
      dataIndex: 'instructions',
      key: 'instructions',
      render: (_, record) => (
        <Form.Item
          name={['medicaments', record.key, 'instructions']}
        >
          <TextArea placeholder="Entrez les instructions supplémentaires" rows={2} />
        </Form.Item>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <MinusCircleOutlined onClick={() => handleRemoveRow(record.key)} />
      )
    }
  ];

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Table
          dataSource={medicaments}
          columns={columns}
          pagination={false}
          rowKey="key"
          bordered
        />
        <Form.Item>
          <Button
            type="dashed"
            onClick={handleAddRow}
            icon={<PlusOutlined />}
            style={{ width: '100%', marginTop: '20px' }}
          >
            Ajouter un autre médicament
          </Button>
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={isLoading}
          >
            Soumettre
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormTraitement;
