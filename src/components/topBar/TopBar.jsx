import React from 'react';
import './topBar.scss';
import { useNavigate } from 'react-router-dom';
import { BellOutlined,DashOutlined } from '@ant-design/icons';
import image from './../../assets/hopital.png';
import users from './../../assets/user.png'
import { useSelector } from 'react-redux';
const TopBar = () => {
  const user = useSelector((state) => state.user.currentUser.user);
  const navigate = useNavigate();

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
            <span className="topbar-sous-name">{user.role === 1 ? 'Admin' : 'Docteur'}</span>
          </div>
        </div>
        <div className="topBar-trait">
          <DashOutlined className='topbar-icon' />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
