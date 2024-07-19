import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './sideBar.css'; // Assurez-vous d'importer le fichier CSS

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
  return (
    <div className="sidebar">
          <Sider >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0, width:'250px' }}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="1">Profile</Menu.Item>
          <Menu.Item key="2">Settings</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<CalendarOutlined />} title="Events">
          <Menu.Item key="3">Upcoming Events</Menu.Item>
          <Menu.Item key="4">Past Events</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<FileTextOutlined />} title="Documents">
          <Menu.Item key="5">Reports</Menu.Item>
          <Menu.Item key="6">Policies</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<FileTextOutlined />} title="Documents">
          <Menu.Item key="7">Reports</Menu.Item>
          <Menu.Item key="8">Policies</Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" icon={<FileTextOutlined />} title="Documents">
          <Menu.Item key="9">Reports</Menu.Item>
          <Menu.Item key="10">Policies</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
    </div>
  );
}

export default SideBar;
