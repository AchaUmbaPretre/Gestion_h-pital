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

export const getTypeAnalyse = async (user) => {
    return axios.get(`${DOMAIN}/api/labo/type_analyse?id_labo=${user}`);
  };

export const postLabo = async (data) => {
  return axios.post(`${DOMAIN}/api/labo`, data);
};
