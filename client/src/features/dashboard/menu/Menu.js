import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import logo from '../../../assets/logoWhite@2x.png';
import MenuItem from './MenuItem';
import { HomeOutlined, MailOutlined, BarcodeOutlined, SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const MenuBackground = styled.div`
  background-color: ${props => props.theme.colors.background.dark};
  width: 240px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
`

const LogoImage = styled.img`
  width: 100px;
  height: 26px;
  margin: 18px;
  margin-left: 24px;
  margin-bottom: 40px;
`;


function MenuComponent(props) {
  return (
    <MenuBackground>
      <LogoImage src={logo} />
      <Link to="/dashboard" >
        <MenuItem icon={<HomeOutlined style={{ fontSize: '15px', marginRight: '16px' }} />}>Overview</MenuItem>
      </Link>
      <Link to="/dashboard/briefs" >
        <MenuItem icon={<MailOutlined style={{ alignSelf: 'baseline', fontSize: '15px', marginRight: '16px' }} />}>Briefs</MenuItem>
      </Link>
      <Link to="/dashboard/suppliers" >
        <MenuItem icon={<BarcodeOutlined style={{ alignSelf: 'baseline', fontSize: '15px', marginRight: '16px' }} />}>Suppliers</MenuItem>
      </Link>
      <Link to="/dashboard/help" >
        <MenuItem icon={<QuestionCircleOutlined style={{ fontSize: '15px', marginRight: '16px' }} />}>Help</MenuItem>
      </Link>
      <Link to="/dashboard/settings">
        <MenuItem icon={<SettingOutlined style={{ fontSize: '15px', marginRight: '16px' }} />}>Settings</MenuItem>
      </Link>
    </MenuBackground>
  );
}

export default MenuComponent;
