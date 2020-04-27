import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Layout, Row, Col } from 'antd';
import MainMenu from '../menu/Menu';
import Header from '../menu/Header';
import OverviewTable from '../table/OverviewTable';
import NotificationsTable from '../table/NotificationsTable';
import Heading from '../../components/Heading';
import TableBody from '../table/TableBody'

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
                  </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(Dashboard);
