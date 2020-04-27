import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Layout, Row, Col } from 'antd';
import MainMenu from '../Menu/Menu';
import Header from '../Menu/Header';
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
          <Heading>Overview</Heading>
          <Row justify="space-between">
            <Col className="gutter-row" span={15}>
              <OverviewTable />
            </Col>
            <Col className="gutter-row" span={8}>
              <NotificationsTable />
            </Col>
          </Row>
          <Row justify="space-between" style={{ marginTop: '40px' }}>
            <Col className="gutter-row" span={15}>
              <TableBody />
            </Col>
            <Col className="gutter-row" span={8}>
              <TableBody />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(Dashboard);
