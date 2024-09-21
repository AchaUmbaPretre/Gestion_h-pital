import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { loginUser, registerUser } from '../services/authService';
import { notifySuccess, notifyError } from '../hooks/useNotifications';

export const login = (dispatch, user, navigate) => {
  dispatch(loginStart());

  loginUser(user)
    .then((res) => {
      dispatch(loginSuccess(res.data));
      if (res.data.success) {
        notifySuccess('Connecté avec succès');
        navigate('/');
      } else {
        notifyError(res.data.message);
        navigate('/login');
      }
    })
    .catch((err) => {
      dispatch(loginFailure());
      notifyError("Erreur de connexion");
    });
};

export const register = (dispatch, user) => {
  dispatch(loginStart());

  registerUser(user)
    .then((res) => {
      dispatch(loginSuccess(res.data));
      if (res.data.success) {
        notifySuccess('Inscription réussie !');
      } else {
        notifyError(res.data.message);
      }
    })
    .catch((err) => {
      dispatch(loginFailure());
      notifyError("Erreur lors de l'inscription");
    });
};
