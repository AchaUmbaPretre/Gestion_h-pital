// src/utils/validationSchema.js
import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().min(4, 'Le mot de passe doit comporter au moins 6 caractères').required('Mot de passe requis'),
});


export const patientSchema = Yup.object({
  nom: Yup.string().required('Nom est requis'),
  prenom: Yup.string().required('Prénom est requis'),
  sexe: Yup.string().required('Sexe est requis'),
  dateNaissance: Yup.date().required('Date de naissance est requise'),
  lieuNaissance: Yup.string().required('Lieu de naissance est requis'),
  province: Yup.string().required('Province est requise'),
  adresse: Yup.string().required('Adresse est requise'),
  tel: Yup.string().required('Téléphone mobile est requis'),
  email: Yup.string().email('Email invalide').required('Email est requis')
});