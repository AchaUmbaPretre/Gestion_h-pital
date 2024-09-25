import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { notification } from "antd";
import moment from "moment";
import { postTransmission_resultat } from "../../../../services/laboService";


const TransmissionForm = ({idLabo,idDoctor}) => {
  const [form] = Form.useForm();

  const onFinish = async(values) => {
    const formData = {
      ...values,
      id_laboratoire : idLabo,
      id_docteur : idDoctor
    }
    await postTransmission_resultat(formData);
    notification.success({
      message: "Succès",
      description: "Les données ont été soumises avec succès.",
    });
    window.location.reload();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message: "Erreur",
      description: "Il y a des erreurs dans le formulaire.",
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        date_transmission: moment(), // Date actuelle comme valeur par défaut
      }}
    >

      {/* date_transmission */}
      <Form.Item
        label="Date de Transmission"
        name="date_transmission"
        rules={[{ required: true, message: "Veuillez sélectionner une date" }]}
      >
        <DatePicker
          format="YYYY-MM-DD"
          placeholder="Sélectionner une date"
          style={{ width: "100%" }}
          defaultValue={moment()} // Affiche la date actuelle par défaut
        />
      </Form.Item>

      {/* remarques */}
      <Form.Item label="Remarques" name="remarques">
        <Input.TextArea rows={4} placeholder="Ajouter des remarques" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Soumettre
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransmissionForm;
