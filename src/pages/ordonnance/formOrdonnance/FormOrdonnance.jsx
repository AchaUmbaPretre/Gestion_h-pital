import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Popconfirm, notification, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { postOrdonnance } from '../../../services/ordonnanceService';
import { getPharma } from '../../../services/pharmaService';

const { Option } = Select;

const FormOrdonnance = ({ id_consultation }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [medicaments, setMedicaments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPharma();
        setMedicaments(response.data);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };

    fetchData();
  }, []);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const medicamentsList = values.medicaments || [];

      const traitementPromises = medicamentsList.map(data =>
        postOrdonnance({
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
      navigate('/traitement');

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

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Créer une Ordonnance</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.List name="medicaments">
          {(fields, { add, remove }) => (
            <>
              <Table
                dataSource={fields}
                columns={[
                  {
                    title: 'Médicament',
                    dataIndex: 'medicamentId',
                    key: 'medicamentId',
                    render: (text, record, index) => (
                      <Form.Item
                        name={[index, 'medicamentId']}
                        rules={[{ required: true, message: 'Veuillez sélectionner un médicament' }]}
                      >
                        <Select placeholder="Sélectionnez un médicament">
                          {medicaments.map((medicament) => (
                            <Option key={medicament.id} value={medicament.id}>
                              {medicament.nomMedicament}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ),
                  },
                  {
                    title: 'Quantité',
                    dataIndex: 'quantite',
                    key: 'quantite',
                    render: (text, record, index) => (
                      <Form.Item
                        name={[index, 'quantite']}
                        rules={[{ required: true, message: 'Veuillez entrer la quantité' }]}
                      >
                        <Input placeholder="Entrez la quantité" type="number" />
                      </Form.Item>
                    ),
                  },
                  {
                    title: 'Action',
                    key: 'action',
                    render: (_, __, index) => (
                      fields.length > 1 ? (
                        <Popconfirm title="Êtes-vous sûr de supprimer?" onConfirm={() => remove(index)}>
                          <Button type="link" icon={<MinusCircleOutlined />} />
                        </Popconfirm>
                      ) : null
                    ),
                  },
                ]}
                pagination={false}
                rowKey="key"
              />
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: '100%' }}
                >
                  Ajouter un médicament
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={isLoading}>
            Enregistrer l'Ordonnance
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormOrdonnance;
