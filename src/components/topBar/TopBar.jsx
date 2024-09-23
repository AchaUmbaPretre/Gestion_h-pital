import React, { useEffect, useState } from 'react';
import './topBar.scss';
import { useNavigate } from 'react-router-dom';
import { BellOutlined,DashOutlined } from '@ant-design/icons';
import users from './../../assets/user.png'
import { useSelector } from 'react-redux';
import { Button, Divider, message, notification, Popover } from 'antd';
import { logout } from '../../services/authService';
import { getRdvDocteurConfirmation } from '../../services/rdvService';

const LogoutButton = ({ onLogout }) => (
  <Button type="primary" danger onClick={onLogout} style={{ width: '100%' }}>
    Déconnexion
  </Button>
);

const TopBar = () => {
  const user = useSelector((state) => state.user.currentUser.user);
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.currentUser.user.role);
  const userId = useSelector((state) => state.user.currentUser.user.id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout(); // Appelle le service de déconnexion
      localStorage.removeItem('persist:root');
      message.success('Déconnexion réussie !');
      navigate('/login');
      window.location.reload();
    } catch (error) {
      message.error('Erreur lors de la déconnexion.');
    }
  };

  const fetchData = async () => {
    try {
        const response = await getRdvDocteurConfirmation(userId)
        setData(response.data);
        setLoading(false);
     
    } catch (error) {
      notification.error({
        message: 'Erreur de chargement',
        description: 'Une erreur est survenue lors du chargement des données.',
      });
      setLoading(false);

    }
  };

useEffect(() => {

  fetchData();
}, [userId]);

console.log(data.length)

  // Contenu du popover de déconnexion
  const renderLogoutContent = () => (
    <div style={{ textAlign: 'center' }}>
      <p>Voulez-vous vraiment vous déconnecter ?</p>
      <Divider />
      <LogoutButton onLogout={handleLogout} />
    </div>
  );

  return (
    <div className="topbar">
      <div className="topbar-left" onClick={() => navigate('/')}>
        <div
          style={{
            width: '45px',
            height: '45px',
            backgroundColor: '#0073e6',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          H
        </div>
        <span className="logo">Hôpital Général de Ndjili</span>
      </div>
      <div className="topbar-right">
        <div className="topbar-icons">
          <BellOutlined />
        </div>
        <hr />
        <div className="topbar-user-rows">
          <img src={users} alt="" className='user-logo'/>
          <div className="topbar-name-rows">
            <span className="topbar-name">{user.username}</span>
            <span className="topbar-sous-name">{user.role}</span>
          </div>
        </div>
        <Popover
            content={renderLogoutContent}
            title="Déconnexion"
            trigger="click"
            placement="bottomRight"
            arrowPointAtCenter
          >
            <DashOutlined className="topbar-icon" aria-label="Options utilisateur" />
          </Popover>
      </div>
    </div>
  );
};

export default TopBar;
