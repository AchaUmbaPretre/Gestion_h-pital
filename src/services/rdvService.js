// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getRdv = async () => {
    return axios.get(`${DOMAIN}/api/rendezVous`);
  };

export const postRdv = async (data) => {
  return axios.post(`${DOMAIN}/api/rendezVous`, data);
};
