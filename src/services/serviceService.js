// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getService = async () => {
    return axios.get(`${DOMAIN}/api/service`);
  };

export const postService = async (data) => {
  return axios.post(`${DOMAIN}/api/service`, data);
};
