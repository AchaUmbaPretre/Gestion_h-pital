// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

/* export const getConsultationCount = async () => {
  return axios.get(`${DOMAIN}/api/consultant/count`);
};
 */
export const getLabo = async (user) => {
    return axios.get(`${DOMAIN}/api/labo`);
  };

  export const getLabOne = async (id) => {
    return axios.get(`${DOMAIN}/api/labo/one?id_labo=${id}`);
  };

export const getTypeAnalyse = async () => {
    return axios.get(`${DOMAIN}/api/labo/type_analyse`);
  };

export const postLabo = async (data) => {
  return axios.post(`${DOMAIN}/api/labo`, data);
};

export const getPrescriptionLabo = async () => {
  return axios.get(`${DOMAIN}/api/labo/prescription`);
};

export const postPrescriptionLabo = async (data) => {
return axios.post(`${DOMAIN}/api/labo/prescription`, data);
};



export const getTransmission_resultant = async () => {
  return axios.get(`${DOMAIN}/api/labo/transmission`);
};

export const postTransmission_resultat = async (data) => {
  return axios.post(`${DOMAIN}/api/labo/transmission`, data);
  };


