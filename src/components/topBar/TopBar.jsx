import React from 'react';
import './topBar.scss';
import { useNavigate } from 'react-router-dom';
import { BellOutlined } from '@ant-design/icons';
import image from './../../assets/high-school-concept-illustration_114360-8499.jpg';

const TopBar = () => {
  const navigate = useNavigate();
  return (
    <div className="topbar">
      <div className="topbar-left" onClick={() => navigate('/')}>
        <img src={image} alt="Logo" className="topbar-img" />
        <span className="logo"></span>
      </div>
      <div className="topbar-right">
        <div className="topbar-icons">
          <BellOutlined />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
