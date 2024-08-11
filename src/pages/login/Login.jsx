import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/validationSchema';
import { FacebookFilled, GoogleOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import iconLogin from './../../assets/hopital.png';
import './login.scss';
import { useDispatch } from 'react-redux';  // Importez useDispatch
import { login } from '../../redux/apiCalls';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  // Initialisez dispatch
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true); // Activer l'état de chargement
    try {
      await login(dispatch, data, navigate);  // Passez dispatch et navigate
    } catch (error) {
      console.error("Erreur lors de se connecter:", error);
    } finally {
      setIsLoading(false); // Désactiver l'état de chargement
    }
  };

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <div className="login_left">
          <div className="login_left_top">
            <h2 className="login_h2">Se connecter</h2>
            <span className="login_span">
              Tu n'as pas de compte ?
              <span className="login_span_sous">
                <Link to="/register"> Inscrivez-vous</Link>
              </span>
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="login_control">
              <label htmlFor="email" className="login_label">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="votre@exemple.com" 
                className="login_input" 
                autoComplete="off"
                {...register('email')}
              />
              {errors.email && <p role="alert" style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>
            <div className="login_control">
              <div className="login_controle_row">
                <label htmlFor="password" className="login_label">Mot de passe</label>
              </div>
              <div className="login_password_wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  className="login_input" 
                  placeholder='Entrer votre mot de passe'
                  autoComplete="new-password"
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
            <div className="login_remember_row">
              <div className="login_row_checked">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me" className="login_checkbox">Remember me</label>
              </div>
              <Link to={'/forgot'} className='login_forgot'>Mot de passe oublié ?</Link>
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

          <div className="login-ligne">
            <span className="ligne"></span>
            Or login with
            <span className="ligne"></span>
          </div>

          <div className="login-rsx-rows">
            <button className="btn-rx fb">
              <FacebookFilled /> Facebook
            </button>
            <button className="btn-rx google">
              <GoogleOutlined /> Google
            </button>
          </div>
        </div>
        <div className="login_right">
          <img src={iconLogin} alt="Login Illustration" className="login-img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
