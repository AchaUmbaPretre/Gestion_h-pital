// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getOrdonnance = async () => {
    return axios.get(`${DOMAIN}/api/ordonnance`);
  };


export const getOrdonnanceOne = async (id) => {
    return axios.get(`${DOMAIN}/api/ordonnance/one?id_ordonnance=${id}`);
  };

export const postOrdonnance = async (data) => {
  console.log(data)
  return axios.post(`${DOMAIN}/api/ordonnance`, data);
};
