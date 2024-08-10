// src/utils/validationSchema.js
import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().min(6, 'Le mot de passe doit comporter au moins 6 caractères').required('Mot de passe requis'),
});
