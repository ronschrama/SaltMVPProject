import React from 'react';
import {
  BrowserRouter as Router,
  withRouter,
  Switch
} from 'react-router-dom';

import ProtectedRoute from '../../components/ProtectedRoute';
import Overview from './overview/Overview';
import Briefs from './briefs/Briefs';
import Help from './help/Help';
import Suppliers from './suppliers/Suppliers';
import Settings from './generalSettings/Settings';
import { Layout } from 'antd';
import MainMenu from '../dashboard/menu/Menu';
import Header from '../dashboard/menu/Header';

const { Content, Sider } = Layout;


function Dashboard(props) {
  return (
    <Layout>
      <Router>
        <Sider>
          <MainMenu />
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '40px 40px 40px 80px' }}>
            <Switch>
              <ProtectedRoute exact path="/dashboard" component={Overview} />
              <ProtectedRoute exact path="/dashboard/briefs" component={Briefs} />
              <ProtectedRoute exact path="/dashboard/help" component={Help} />
              <ProtectedRoute exact path="/dashboard/suppliers" component={Suppliers} />
              <ProtectedRoute exact path="/dashboard/settings" component={Settings} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
}

export default withRouter(Dashboard);
