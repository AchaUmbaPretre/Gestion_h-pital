import React, { useState } from 'react';
import './patientForm.scss';
import { Modal, notification } from 'antd'; // Importation des composants Ant Design
import { postPatient } from '../../../services/patientService';

// Composant PatientForm
const PatientForm = () => {
  const [formData, setFormData] = useState({
    nom_patient: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    sexe: '',
    province: '',
    adresse: '',
    tel: '',
    email: '',
    societePatient: '',
    assurance: '',
    groupeSang: '',
    profession: '',
    typePatient: '',
  });

  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Validation des données du formulaire
  const validate = () => {
    let tempErrors = {};
    for (const field in formData) {
      if (!formData[field]) {
        tempErrors[field] = 'Ce champ est requis';
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      await postPatient(formData);
      notification.success({
        message: 'Succès',
        description: 'Les informations ont été enregistrées avec succès.',
      });
      setIsModalVisible(false); // Fermer le modal après succès
    } catch (error) {
      console.error("Erreur lors de se connecter:", error);
      notification.error({
        message: 'Erreur',
        description: 'Une erreur s\'est produite lors de l\'enregistrement des informations.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Afficher le modal
  const showModal = () => setIsModalVisible(true);
  // Masquer le modal
  const handleCancel = () => setIsModalVisible(false);
  // Confirmer la soumission
  const handleOk = () => {
    handleSubmit(); // Soumettre le formulaire après confirmation
  };
  return (
    <>
      <div className="patientForm">
        <form onSubmit={e => e.preventDefault()} className="patient-wrapper">
          <div className="patient-left">
            <h2 className="patient-h2">Information Générale</h2>
            {['nom_patient', 'prenom', 'dateNaissance', 'lieuNaissance'].map((field) => (
              <div className="patient-rows" key={field}>
                <label className="patient-label">
                  {field === 'dateNaissance' ? 'Date de naissance' : field.charAt(0).toUpperCase() + field.slice(1)}
                  <span>*</span>
                </label>
                <input
                  type={field === 'dateNaissance' ? 'date' : 'text'}
                  name={field}
                  className="patient-input"
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Entrez le ${field}....`}
                />
                {errors[field] && <p className="error-message">{errors[field]}</p>}
              </div>
            ))}
            <div className="patient-rows">
              <label className="patient-label">Sexe <span>*</span></label>
              <div className="radio-group">
                {['male', 'female', 'other'].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="sexe"
                      value={value}
                      checked={formData.sexe === value}
                      onChange={handleChange}
                    />
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                ))}
              </div>
              {errors.sexe && <p className="error-message">{errors.sexe}</p>}
            </div>
          </div>
          <div className="patient-left">
            <h2 className="patient-h2">Adresse</h2>
            {['province', 'adresse', 'tel', 'email'].map((field) => (
              <div className="patient-rows" key={field}>
                <label className="patient-label">
                  {field === 'tel' ? 'Tel mobile' : field.charAt(0).toUpperCase() + field.slice(1)}
                  <span>*</span>
                </label>
                <input
                  type={field === 'tel' ? 'tel' : field === 'email' ? 'email' : 'text'}
                  name={field}
                  className="patient-input"
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Entrez le ${field}....`}
                />
                {errors[field] && <p className="error-message">{errors[field]}</p>}
              </div>
            ))}
          </div>
          <div className="patient-left">
            <h2 className="patient-h2">Assurance</h2>
            {['societePatient', 'assurance'].map((field) => (
              <div className="patient-rows" key={field}>
                <label className="patient-label">
                  {field === 'societePatient' ? 'Société du patient' : 'Assurance'}
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name={field}
                  className="patient-input"
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Entrez le ${field}....`}
                />
                {errors[field] && <p className="error-message">{errors[field]}</p>}
              </div>
            ))}
          </div>
          <div className="patient-left">
            <h2 className="patient-h2">Autres</h2>
            <div className="patient-rows">
              <label className="patient-label">Groupe Sanguin <span>*</span></label>
              <select
                name="groupeSang"
                className="patient-input"
                value={formData.groupeSang}
                onChange={handleChange}
              >
                <option value="">Sélectionnez le groupe sanguin</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              {errors.groupeSang && <p className="error-message">{errors.groupeSang}</p>}
            </div>
            {['profession', 'typePatient'].map((field) => (
              <div className="patient-rows" key={field}>
                <label className="patient-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name={field}
                  className="patient-input"
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Entrez le ${field}....`}
                />
                {errors[field] && <p className="error-message">{errors[field]}</p>}
              </div>
            ))}
          </div>
        </form>
        <button
          type="button"
          className="button-patient"
          onClick={showModal}
          disabled={isLoading}
        >
          {isLoading ? 'Enregistrement...' : 'Enregistrer'}
        </button>

        {/* Modal de confirmation */}
        <Modal
        title="Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <p>Êtes-vous sûr de vouloir enregistrer ces informations ?</p>
      </Modal>
      </div>
    </>
  );
}

export default PatientForm;
