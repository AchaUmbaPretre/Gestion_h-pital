// src/components/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/validationSchema';
import { Spin } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { registerUser } from '../../services/authService';
import iconLogin from '../../assets/hopital.png';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // État de chargement
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true); // Activer l'état de chargement
    try {
      await registerUser(data);
      navigate('/login');
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
      console.error("Erreur lors de l'inscription :", error);
    } finally {
      setIsLoading(false); // Désactiver l'état de chargement
    }
  };

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <div className="login_left">
          <div className="login_left_top">
            <h2 className="login_h2">S'enregistrer</h2>
            <span className="login_span">
              Avez-vous un compte ?
              <span className="login_span_sous">
                <Link to="/login"> Connectez-vous</Link>
              </span>
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="login_control">
              <label htmlFor="username" className="login_label">Nom</label>
              <input
                type="text"
                id="username"
                placeholder="Entrer votre nom..."
                className="login_input"
                {...register('username')}
              />
              {errors.username && <p role="alert" style={{ color: 'red' }}>{errors.username.message}</p>}
            </div>
            <div className="login_control">
              <label htmlFor="email" className="login_label">Email</label>
              <input
                type="email"
                id="email"
                placeholder="votre@exemple.com"
                className="login_input"
                {...register('email')}
              />
              {errors.email && <p role="alert" style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>
            <div className="login_control">
              <label htmlFor="password" className="login_label">Mot de passe</label>
              <div className="login_password_wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="login_input"
                  placeholder="Entrer mot de passe"
                  {...register('password')}
                />
                <span
                  className="login_password_eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </span>
              </div>
              {errors.password && <p role="alert" style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>
            <div className="login-btn">
              <button type="submit" className="btn" disabled={isLoading}>Envoyer</button>
              {isLoading && (
                <div className="loader-container loader-container-center">
                  <Spin size="large" />
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="login_right">
          <img src={iconLogin} alt="Login Illustration" className="login-img" />
        </div>
      </div>
    </div>
  );
};

export default Register;
