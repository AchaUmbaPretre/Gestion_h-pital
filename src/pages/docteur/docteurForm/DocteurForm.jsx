import React, { useEffect, useState } from 'react'; 
import { Modal, notification, Select } from 'antd';
import './docteurForm.scss';
import { getDocteurSpecialite, postDocteur } from '../../../services/docteurService';
import { useNavigate } from 'react-router-dom';

const DocteurForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    prenom: '',
    specialite: '',
    phone_number: '',
    email: '',
    adresse: '',
    img: null,
  });
  const [speciale, setSpeciale] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prevData => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [specialiteResponse] = await Promise.all([
          getDocteurSpecialite()
        ]);

        setSpeciale(specialiteResponse.data.data);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };

    fetchData();
  }, []);

  const validate = () => {
    let tempErrors = {};
    for (const field in formData) {
      if (!formData[field] && field !== 'img') {
        tempErrors[field] = 'Ce champ est requis';
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      await postDocteur(formData);
      notification.success({
        message: 'Succès',
        description: 'Les informations ont été enregistrées avec succès.',
      });
      navigate('/liste_docteur');
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
      <div className="docteurForm">
        <h2 className="docteur-h2">Docteur</h2>
        <div className="docteurForm-wrapper">
          {['username', 'prenom', 'phone_number', 'email', 'adresse'].map(field => (
            <div className="docteur-rows" key={field}>
              <label htmlFor={field} className="docteur-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="docteur-input"
              />
              {errors[field] && <span className="error-text">{errors[field]}</span>}
            </div>
          ))}
          <div className="docteur-rows">
            <label htmlFor="specialite" className="docteur-label">Specialité</label>
            <Select
              name="specialite"
              options={speciale?.map(item => ({
                value: item.id_specialite,
                label: item.nom_specialite,
              }))}
              placeholder="Sélectionnez une specialité..."
              onChange={(selectedOption) => setFormData((prev) => ({ ...prev, specialite: selectedOption.value }))}
            />
          </div>
          <div className="docteur-rows">
            <label htmlFor="img" className="docteur-label">Image</label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={handleChange}
              className="docteur-input"
            />
          </div>
        </div>
        <button 
          className="docteur-btn"
          type="button"
          onClick={showModal}
          disabled={isLoading}
        >
          {isLoading ? 'Enregistrement...' : 'Enregistrer'}
        </button>

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
};

export default DocteurForm;
