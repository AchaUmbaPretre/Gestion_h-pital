// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getPharma = async (user) => {
    return axios.get(`${DOMAIN}/api/pharma`);
  };

export const getPharmaOne = async (user) => {
    return axios.get(`${DOMAIN}/api/pharma/one`);
  };

export const postPharma = async (data) => {
  console.log(data)
  return axios.post(`${DOMAIN}/api/pharma`, data);
};
