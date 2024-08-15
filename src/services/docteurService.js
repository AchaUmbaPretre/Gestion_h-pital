// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getDocteur = async (user) => {
    return axios.get(`${DOMAIN}/api/docteur`);
  };

export const postDocteur = async (data) => {
  console.log(data)
  return axios.post(`${DOMAIN}/api/docteur`, data);
};
