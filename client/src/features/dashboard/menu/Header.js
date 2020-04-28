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
`

const DropdownMenu = styled(Button)`
  display: flex;
  align-items: center;
  height: 38px;
  margin-right: 20px;
  padding-left: 20px;
  border: 0px;
  border-left: 1px solid ${props => props.theme.colors.background.primary};
  box-shadow: 0px 0px 0px;
`

const Photo = styled.img`
  align-self: center;
  border-radius: 50%;
  width: 38px;
  height: 38px;
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
    <Menu>
      <Menu.Item>
        <a target="/" onClick={handleSubmit}>
          Logout
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderBackground>
      <Icon src={chatIcon} />
      <Icon src={notificationIcon} />
      <Dropdown overlay={menu} placement="bottomRight">
        <DropdownMenu>{username}<Icon cheveron src={cheveronDown} /><Photo src={user} /></DropdownMenu>
      </Dropdown>
    </HeaderBackground>
  );
}

export default withRouter(HeaderComponent);
