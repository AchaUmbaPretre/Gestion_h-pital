// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getAdmission = async () => {
    return axios.get(`${DOMAIN}/api/admission`);
  };

export const postAdmission = async (data) => {
  return axios.post(`${DOMAIN}/api/admission`, data);
};
