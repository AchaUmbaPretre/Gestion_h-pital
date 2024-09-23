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
import { useSelector } from 'react-redux';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const SideBar = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const role = useSelector((state) => state.user.currentUser.user.role);


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
          {(role === 'ADMINISTRATEUR') && (
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
          )}
          {(role === 'ADMINISTRATEUR' || role === 'RECEPTIONNISTE') && (
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
          )}
          {(role === 'ADMINISTRATEUR') && (
            <>
              <SubMenu key="sub4" icon={<AppstoreOutlined />} title="Service">
                <Menu.Item key="7">
                  <Link to='/liste_service'>
                    Liste des services
                  </Link>
                </Menu.Item>
              </SubMenu>
            </>
          )}
          {(role === 'ADMINISTRATEUR' || role === 'DOCTEUR') && (
          <SubMenu key="sub6" icon={<FormOutlined />} title="Consultation">
            <Menu.Item key="8">
              <Link to='/consultation'>
                Nouvelle consultation
              </Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to='/liste_consultation'>
                Liste des consultations
              </Link>
            </Menu.Item>
          </SubMenu> 
          )}
          {(role === 'ADMINISTRATEUR' || role === 'TECHNICIEN') && (
            <Item key="10" icon={<ExperimentOutlined />}>
              <Link to="/labo">Laboratoire</Link>
            </Item>
          ) }
          {(role === 'ADMINISTRATEUR' || role === 'TECHNICIEN') && (
            <Item key="30" icon={<FormOutlined />}>
              <Link to='/prescription_labo'>
                Prescription labo
              </Link>
            </Item>
          ) }
          {(role === 'ADMINISTRATEUR') && (
            <Item key="11" icon={<AuditOutlined />}>
              <Link to='/admission'>
                Admission
              </Link>
            </Item>
          )}
          {(role === 'RECEPTIONNISTE' || role === 'ADMINISTRATEUR' || role === 'DOCTEUR' ) && (
            <Item key="15" icon={<CalendarOutlined />}>
              <Link to='/liste_rdv'>
                Rendez-vous
              </Link>
            </Item>
          ) }
          {(role === 'DOCTEUR' || role === 'ADMINISTRATEUR') && (
            <>
              <Item key="12" icon={<MedicineBoxOutlined />}>
                <Link to='/traitement'>
                  Traitement
                </Link>
              </Item> 
                <Item key="13" icon={<MedicineBoxOutlined />}>
                  <Link to='/medicament'>
                    Médicament
                  </Link>
                </Item>
              <Item key="14" icon={<FileTextOutlined />}>
                <Link to='/ordonnance'>
                  Ordonnance
                </Link>
              </Item>
              <SubMenu key="sub12" icon={<DollarOutlined />} title="Paiement">
                <Menu.Item key="16">
                  <Link to='/paiement'>
                    Paiements en attente
                  </Link>
                </Menu.Item>
                <Menu.Item key="17">
                  <Link to='/historique_paiement'>
                    Historique des paiements
                  </Link>
                </Menu.Item>
              </SubMenu>             
            </>
          )}
          {(role === 'ADMINISTRATEUR') && (
            <>
              <SubMenu key="sub13" icon={<CreditCardOutlined />} title="Facturation">
              <Menu.Item key="18">
                <Link to='/factures'>
                  Liste des factures
                </Link>
              </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<SolutionOutlined />} title="Utilisateur">
                <Menu.Item key="19">
                  <Link to='/liste_user'>
                    Liste des utilisateurs
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub10" icon={<FundOutlined />} title="Rapports">
                <Menu.Item key="20">Rapports d'activité</Menu.Item>
                <Menu.Item key="21">Statistiques des patients</Menu.Item>
              </SubMenu>
              <Item key="22" icon={<SettingOutlined />}>
                Paramètres
              </Item>
            </>
          )}
        </Menu>
      </Sider>
    </div>
  );
}

export default SideBar;
