// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getDocteurCount = async () => {
  return axios.get(`${DOMAIN}/api/docteur/count`);
};

export const getDocteurOne = async (id) => {
  return axios.get(`${DOMAIN}/api/docteur/one?id_docteur=${id}`);
};

export const getDocteur = async () => {
    return axios.get(`${DOMAIN}/api/docteur`);
  };


export const getDocteurSpecialite = async () => {
    return axios.get(`${DOMAIN}/api/docteur/specialite`);
  };

export const postDocteur = async (data) => {
  return axios.post(`${DOMAIN}/api/docteur`, data);
};
