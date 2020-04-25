import React from 'react';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Layout } from 'antd';
import MainMenu from '../Menu/Menu';
import Header from '../Menu/Header';
import SubmitButton from '../../components/Button';
import auth from '../../services/auth';

const { Content, Sider } = Layout;

const Body = styled.div`
  /* display: flex;
  flex-direction: row; */
`

function Dashboard(props) {
  function handleSubmit() {
    Cookies.set('authToken', null);
    // eslint-disable-next-line
    console.log('The cookie is now: ', Cookies.get('authToken'));
    auth.logout(() => {
      // eslint-disable-next-line
      props.history.push('/');
    });
  }

  return (
    <Body>
      <Layout>
        <Sider>
          <MainMenu />
        </Sider>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        {/* <Content style={{ margin: '24px 16px 0' }}> */}
        {/* <form
            onSubmit={
              (e) => {
                e.preventDefault();
                handleSubmit();
              }
            }
          >
            <SubmitButton login>Logout</SubmitButton>
          </form> */}
        {/* </Content> */}
      </Layout>
    </Body>
  );
}

export default withRouter(Dashboard);
