import React from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';

import { Menu, Dropdown, Button } from 'antd';
import { WechatOutlined, BellOutlined, DownOutlined } from '@ant-design/icons';
import user from '../../assets/userPhoto.png';
import auth from '../../services/auth';

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

const DropdownIcon = styled(DownOutlined)`
  color: ${props => props.theme.colors.background.primary};
  margin-left: 10px;
  margin-right: 10px;
  align-self: center;
`

const Photo = styled.img`
  align-self: center;
  border-radius: 50%;
  width: 38px;
  height: 38px;
`

const username = 'Denis K.';


function HeaderComponent(props) {
  function handleSubmit() {
    Cookies.set('authToken', null);
    // eslint-disable-next-line
    console.log('The cookie is now: ', Cookies.get('authToken'));
    auth.logout(() => {
      // eslint-disable-next-line
      props.history.push('/');
    });
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
      <WechatOutlined style={{ fontSize: '16px', color: '#BCBCCB', marginRight: '32px' }} />
      <BellOutlined style={{ fontSize: '16px', color: '#BCBCCB', marginRight: '24px' }} />
      <Dropdown overlay={menu} placement="bottomRight">
        <DropdownMenu>{username}<DropdownIcon /><Photo src={user} /></DropdownMenu>
      </Dropdown>
    </HeaderBackground>
  );
}

export default withRouter(HeaderComponent);