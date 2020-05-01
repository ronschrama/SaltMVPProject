import React from 'react';
import styled, { css } from 'styled-components';
import { useCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loggingOut } from '../../login/loginSlice';

import { Menu, Dropdown, Button } from 'antd';
import chatIcon from '../../../assets/chatIcon.svg';
import notificationIcon from '../../../assets/notification.svg';
import cheveronDown from '../../../assets/cheveronDown.svg';
import user from '../../../assets/userPhoto.png';

const HeaderBackground = styled.div`
  background-color: ${props => props.theme.colors.background.light};
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end; 
  align-items: center;
  padding: 16px; 
  position: sticky;
  top: 0;
  z-index: 50;
`
const DropdownMenu = styled(Menu)`
  margin-top: 13px;
  width: 160px;
`

const MenuButton = styled(Button)`
  display: flex;
  align-items: center;
  height: 38px;
  margin-right: 20px;
  padding-left: 20px;
  border: 0px;
  border-radius: 0px;
  border-left: 1px solid ${props => props.theme.colors.background.primary};
  box-shadow: 0px 0px 0px;
  &:hover {
    border-left: 1px solid ${props => props.theme.colors.background.primary};
    color: ${props => props.theme.colors.link.tertiary};
  }
  &:active {
    border-left: 1px solid ${props => props.theme.colors.background.primary};
    color: ${props => props.theme.colors.link.tertiary};
  }
  &:focus {
    border-left: 1px solid ${props => props.theme.colors.background.primary};
    color: ${props => props.theme.colors.link.tertiary};
  }
`

const Photo = styled.img`
  align-self: flex-start;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  margin-top: -5px;
`

const Icon = styled.img`
  align-self: center;
  width: 16px;
  height: 16px;
  margin-right: 32px;
  margin-left: 10px;

  ${({ cheveron }) =>
    cheveron && css`
      margin-right: 10px;
      margin-left: 10px;
    `}
`;

const username = 'Denis K.';


function HeaderComponent(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
  const dispatch = useDispatch();

  function handleSubmit() {
    removeCookie('authToken');
    dispatch(loggingOut());
  }

  const menu = (
    <DropdownMenu>
      <Menu.Item>
        <a target="_self" rel="Profile" href="/profile">
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_self" rel="Messages" href="/messages">
          Messages
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_self" rel="Documents" href="/documents">
          Files
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_self" rel="Upload Files" href="/dashboard/files">
          Upload Files
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="/" onClick={handleSubmit}>
          Logout
        </a>
      </Menu.Item>
    </DropdownMenu>
  );

  return (
    <HeaderBackground>
      <Icon src={chatIcon} />
      <Icon src={notificationIcon} />
      <Dropdown overlay={menu} placement="bottomRight">
        <MenuButton>{username}<Icon cheveron src={cheveronDown} /><Photo src={user} /></MenuButton>
      </Dropdown>
    </HeaderBackground>
  );
}

export default withRouter(HeaderComponent);
