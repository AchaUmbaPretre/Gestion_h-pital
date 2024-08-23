// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getTraitement = async (user) => {
    return axios.get(`${DOMAIN}/api/traitement`);
  };

export const getTraitementOne = async (user) => {
    return axios.get(`${DOMAIN}/api/traitement/one`);
  };

export const postTraitement = async (data) => {
  return axios.post(`${DOMAIN}/api/traitement`, data);
};
