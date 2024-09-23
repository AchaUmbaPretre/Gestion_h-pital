// src/services/authService.js
import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getRdv = async () => {
    return axios.get(`${DOMAIN}/api/rendezVous`);
  };

export const getRdvDocteur = async (id) => {
    return axios.get(`${DOMAIN}/api/rendezVous/docteur_rdv?id=${id}`);
  };

export const getRdvDocteurConfirmation = async (id) => {
    return axios.get(`${DOMAIN}/api/rendezVous/docteur_rdv/confirmation'?id=${id}`);
  };

export const postRdv = async (data) => {
  return axios.post(`${DOMAIN}/api/rendezVous`, data);
};

export const putRdvConfirmation = async (id) => {
  console.log(id)
  return axios.put(`${DOMAIN}/api/rendezVous/rdv_confirmation?id=${id}`);
};
