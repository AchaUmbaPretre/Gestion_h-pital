// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getFacture = async () => {
    return axios.get(`${DOMAIN}/api/factures`);
  };

export const postFacture = async (data) => {
  return axios.post(`${DOMAIN}/api/factures`, data);
};
