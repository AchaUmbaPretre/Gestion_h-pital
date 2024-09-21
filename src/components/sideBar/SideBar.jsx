import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  SolutionOutlined,
  AppstoreOutlined,
  AuditOutlined,
  FormOutlined,
  FundOutlined,
  SettingOutlined,
  DollarOutlined,
  CreditCardOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import './sideBar.css'; // Assurez-vous d'importer le fichier CSS
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const SideBar = () => {
  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <div className="sidebar">
      <Sider>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultSelectedKeys={['/']}
          style={{
            height: '100%',
            borderRight: 0,
            width: '260px',
          }}
        >
          <Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Accueil</Link>
          </Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Personnel médical">
            <Menu.Item key="1">
              <Link to="/form_personnel" className="sidebarLink">
                Nouveau personnel
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/liste_docteur">
                Liste des personnels
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<MedicineBoxOutlined />} title="Patient">
            <Menu.Item key="5">
              <Link to='/form_patient'>
                Nouveau patient
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to='/liste_patient'>
                Liste des patients
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<AppstoreOutlined />} title="Service">
            <Menu.Item key="9">
              <Link to='/liste_service'>
                Liste des services
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<FormOutlined />} title="Consultation">
            <Menu.Item key="13">
              <Link to='/consultation'>
                Nouvelle consultation
              </Link>
            </Menu.Item>
            <Menu.Item key="12">
              <Link to='/liste_consultation'>
                Liste des consultations
              </Link>
            </Menu.Item>
          </SubMenu>
          <Item key="/" icon={<ExperimentOutlined />}>
            <Link to="/labo">Laboratoire</Link>
          </Item>
          <SubMenu key="sub5" icon={<AuditOutlined />} title="Admission">
            <Menu.Item key="11">
              <Link to='/admission'>
                Liste des admissions
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" icon={<MedicineBoxOutlined />} title="Traitement">
            <Menu.Item key="15">
              <Link to='/traitement'>
                Traitements
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub8" icon={<MedicineBoxOutlined />} title="Médicament">
            <Menu.Item key="17">
              <Link to='/medicament'>
                Médicaments
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub9" icon={<FileTextOutlined />} title="Ordonnance">
            <Menu.Item key="20">
              <Link to='/ordonnance'>
                Liste des ordonnances
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub11" icon={<CalendarOutlined />} title="Rendez-vous">
            <Menu.Item key="25">
              <Link to='/liste_rdv'>
                Liste des rendez-vous
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub12" icon={<DollarOutlined />} title="Paiement">
            <Menu.Item key="26">
              <Link to='/paiement'>
                Paiements en attente
              </Link>
            </Menu.Item>
            <Menu.Item key="27">
              <Link to='/historique_paiement'>
                Historique des paiements
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub13" icon={<CreditCardOutlined />} title="Facturation">
            <Menu.Item key="29">
              <Link to='/factures'>
                Liste des factures
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<SolutionOutlined />} title="Utilisateur">
            <Menu.Item key="4">
              <Link to='/liste_user'>
                Liste des utilisateurs
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub10" icon={<FundOutlined />} title="Rapports">
            <Menu.Item key="21">Rapports d'activité</Menu.Item>
            <Menu.Item key="22">Statistiques des patients</Menu.Item>
          </SubMenu>
          <Item key="23" icon={<SettingOutlined />}>
            Paramètres
          </Item>
        </Menu>
      </Sider>
    </div>
  );
}

export default SideBar;
