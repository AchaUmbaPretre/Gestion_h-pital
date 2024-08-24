// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getUser = async () => {
    return axios.get(`${DOMAIN}/api/user`);
  };

export const postUser = async (data) => {
  return axios.post(`${DOMAIN}/api/user`, data);
};
