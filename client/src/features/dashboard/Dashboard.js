import React from 'react';
import {
  withRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Overview from './overview/Overview';
import Briefs from './briefs/Briefs';
import Help from './help/Help';
import Suppliers from './suppliers/Suppliers';
import Settings from './generalSettings/Settings';
import { Layout } from 'antd';
import MainMenu from '../dashboard/menu/Menu';
import Header from '../dashboard/menu/Header';
import Files from '../files/Files';

const { Content, Sider } = Layout;


function Dashboard(props) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider style={{ width: '240px' }}>
        <MainMenu />
      </Sider>
      <Layout style={{ height: '100vh', width: '100vw', marginLeft: '40px' }}>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '40px' }}>
          <Switch>
            <Route exact path="/dashboard" component={Overview} />
            <Route exact path="/dashboard/briefs" component={Briefs} />
            <Route exact path="/dashboard/help" component={Help} />
            <Route exact path="/dashboard/suppliers" component={Suppliers} />
            <Route exact path="/dashboard/settings" component={Settings} />
            <Route exact path="/dashboard/files" component={Files} />
            <Redirect to="/dashboard" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(Dashboard);
