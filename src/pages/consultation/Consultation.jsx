import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './consultation.scss'
import { getPatient } from '../../services/patientService';
import { notification } from 'antd';

const Consultation = () => {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPatient();  // Ajoutez le dateFilter si nécessaire
        setPatient(response.data);
      } catch (error) {
        notification.error({
          message: 'Erreur de chargement',
          description: 'Une erreur est survenue lors du chargement des données.',
        });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="consultation">
        <div className="consultation-wrapper">
          <div className="consultation-top">
            <div className="consultation-top-left">
              <label htmlFor="">Sélectionnez un patient <span>*</span></label>
              <Select
                name="id_patient"
                options={patient?.map((item) => ({
                value: item.id_patient,
                label: item.nom_patient,
                }))}
                placeholder="Sélectionnez un patient..."
              />
            </div>
            <div className="consultation-top-right">

            </div>
          </div>
          <div className="consultation-center">
            <div className="consultation-left">

            </div>
            <div className="consultation-right">
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Consultation
