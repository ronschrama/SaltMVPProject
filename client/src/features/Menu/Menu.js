import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/logoWhite@2x.png';
import MenuItem from './MenuItem';
import { HomeOutlined, MailOutlined, SettingOutlined, BarcodeOutlined, QuestionCircleOutlined } from '@ant-design/icons';

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
      <MenuItem icon={<HomeOutlined style={{ fontSize: '15px', color: '#A5A4BF', marginRight: '16px' }} />}>Overview</MenuItem>
      <MenuItem icon={<MailOutlined style={{ fontSize: '15px', color: '#A5A4BF', marginRight: '16px' }} />}>Briefs</MenuItem>
      <MenuItem menuActive icon={<BarcodeOutlined style={{ fontSize: '15px', color: '#A3A0FB', marginRight: '16px' }} />}>Suppliers</MenuItem>
      <MenuItem icon={<QuestionCircleOutlined style={{ fontSize: '15px', color: '#A5A4BF', marginRight: '16px' }} />}>Help Center</MenuItem>
      <MenuItem icon={<SettingOutlined style={{ fontSize: '15px', color: '#A5A4BF', marginRight: '16px' }} />}>Settings</MenuItem>
    </MenuBackground>
  );
}

export default MenuComponent;