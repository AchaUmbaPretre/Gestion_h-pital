// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getPatient = async () => {
    return axios.get(`${DOMAIN}/api/patient`);
  };

export const getPatientOne = async (id) => {
    return axios.get(`${DOMAIN}/api/patient/One?id_patient=${id}`);
  };

export const postPatient = async (data) => {
  return axios.post(`${DOMAIN}/api/patient`, data);
};
