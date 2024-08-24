import React from 'react';
import { Form, Input, InputNumber, Button, Table, Space, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const FormMedicament = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = React.useState([]);
  const [count, setCount] = React.useState(0);

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

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setDataSource(newData);
    }
  };

  const columns = [
    {
      title: 'Nom du Médicament',
      dataIndex: 'nomMedicament',
      width: '30%',
      editable: true,
      render: (text, record) => (
        <Form.Item
          name={`nomMedicament_${record.key}`}
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
      editable: true,
      render: (text, record) => (
        <Form.Item name={`description_${record.key}`}>
          <Input.TextArea placeholder="Entrez une description (optionnel)" rows={2} />
        </Form.Item>
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      width: '20%',
      editable: true,
      render: (text, record) => (
        <Form.Item
          name={`stock_${record.key}`}
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

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Traitez les données soumises ici, par exemple les envoyer à une API
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
          <Button type="primary" htmlType="submit" style={{ marginTop: '20px', width: '100%' }}>
            Enregistrer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormMedicament;
