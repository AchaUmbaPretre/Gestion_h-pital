import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Table, Space, Popconfirm, notification } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { postPharma } from '../../../services/pharmaService';

const FormMedicament = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    const newData = {
      key: count,
      nomMedicament: '',
      description: '',
      stock: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const columns = [
    {
      title: 'Nom du Médicament',
      dataIndex: 'nomMedicament',
      width: '30%',
      render: (text, record) => (
        <Form.Item
          name={['medicaments', record.key, 'nomMedicament']}
          rules={[{ required: true, message: 'Veuillez entrer le nom du médicament' }]}
        >
          <Input placeholder="Entrez le nom du médicament" />
        </Form.Item>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      render: (text, record) => (
        <Form.Item name={['medicaments', record.key, 'description']}>
          <Input.TextArea placeholder="Entrez une description (optionnel)" rows={2} />
        </Form.Item>
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      width: '20%',
      render: (text, record) => (
        <Form.Item
          name={['medicaments', record.key, 'stock']}
          rules={[{ required: true, message: 'Veuillez entrer le stock disponible' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Stock" />
        </Form.Item>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Êtes-vous sûr de supprimer?" onConfirm={() => handleDelete(record.key)}>
            <Button type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        ) : null,
    },
  ];

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const { medicaments } = values;
      const filteredMedicaments = dataSource.map((item, index) => ({
        nomMedicament: medicaments[index]?.nomMedicament || '',
        description: medicaments[index]?.description || '',
        stock: medicaments[index]?.stock || 0,
      }));

      const traitementPromises = filteredMedicaments.map((data) =>
        postPharma({
          ...data,
        })
      );

      await Promise.all(traitementPromises);

      notification.success({
        message: 'Succès',
        description: 'Les informations ont été enregistrées avec succès.',
      });

      form.resetFields();
      setDataSource([]);
      setCount(0);
      window.location.reload();
      navigate('/medicament');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement :', error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'enregistrement des informations.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Gestion des Médicaments</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowClassName={() => 'editable-row'}
          bordered
          footer={() => (
            <Button
              type="dashed"
              onClick={handleAdd}
              icon={<PlusOutlined />}
              style={{ width: '100%' }}
            >
              Ajouter un médicament
            </Button>
          )}
        />
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: '20px', width: '100%' }} loading={isLoading}>
            Enregistrer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormMedicament;
