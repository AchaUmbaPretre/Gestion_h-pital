import React, { useState } from 'react';
import { Form, Input, Button, Select, Space, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const FormTraitement = ({ onSubmit, initialData }) => {
  const [form] = Form.useForm();
  const [medicaments, setMedicaments] = useState([{ key: 1 }]);

  const handleAddRow = () => {
    const newMedicaments = [...medicaments, { key: medicaments.length + 1 }];
    setMedicaments(newMedicaments);
  };

  const handleRemoveRow = (key) => {
    if (medicaments.length > 1) {
      const newMedicaments = medicaments.filter(item => item.key !== key);
      setMedicaments(newMedicaments);
    }
  };

  const handleFinish = (values) => {
    onSubmit(values);
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
        initialValues={initialData}
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
          <Button type="primary" htmlType="submit">
            Soumettre
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormTraitement;
