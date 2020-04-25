import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Layout } from 'antd';
import MainMenu from '../Menu/Menu';
import Header from '../Menu/Header';

const { Content, Sider } = Layout;

const Body = styled.div`
  /* display: flex;
  flex-direction: row; */
`

function Dashboard(props) {
  return (
    <Body>
      <Layout>
        <Sider>
          <MainMenu />
        </Sider>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        {/* <Content style={{ margin: '24px 16px 0' }}> */}
        {/* </Content> */}
      </Layout>
    </Body>
  );
}

export default withRouter(Dashboard);
