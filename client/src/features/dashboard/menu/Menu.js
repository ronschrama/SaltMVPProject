import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

import logo from '../../../assets/logoWhite@2x.png';
import MenuItem from './MenuItem';
import { HomeOutlined } from '@ant-design/icons';
import home from '../../../assets/home.svg';
import mail from '../../../assets/mail.svg';
import barcode from '../../../assets/barcode.svg';
import settings from '../../../assets/settings.svg';
import support from '../../../assets/support.svg';

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

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 24px;
  align-self: center;

  ${({ active }) =>
    active && css`
      fill: #A3A0FB;
    `}
`


function MenuComponent(props) {
  return (
    <MenuBackground>
      <LogoImage src={logo} />
      {/* <MenuItem icon={<Icon active src={home} />}>Test</MenuItem> */}
      <Link to="/dashboard" >
        <MenuItem menuactive icon={<HomeOutlined style={{ fontSize: '15px', color: '#A3A0FB', marginRight: '16px' }} />}>Overview</MenuItem>
      </Link>
      <Link to="/dashboard/briefs" >
        <MenuItem icon={<Icon src={mail} />}>Briefs</MenuItem>
      </Link>
      <Link to="/dashboard/suppliers" >
        <MenuItem icon={<Icon src={barcode} />}>Suppliers</MenuItem>
      </Link>
      <Link to="/dashboard/help" >
        <MenuItem icon={<Icon src={support} />}>Help</MenuItem>
      </Link>
      <Link to="/dashboard/settings">
        <MenuItem icon={<Icon src={settings} />}>Settings</MenuItem>
      </Link>
    </MenuBackground>
  );
}

export default MenuComponent;
