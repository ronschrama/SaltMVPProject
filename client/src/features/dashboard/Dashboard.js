import React from 'react';
import { withRouter } from 'react-router-dom';

import Overview from './overview/Overview';
import { Layout } from 'antd';
import MainMenu from '../dashboard/menu/Menu';
import Header from '../dashboard/menu/Header';

const { Content, Sider } = Layout;


function Dashboard(props) {
  return (
    <Layout>
      <Sider>
        <MainMenu />
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '40px 40px 40px 80px' }}>
          <Overview />
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(Dashboard);
