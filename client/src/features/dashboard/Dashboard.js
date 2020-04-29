import React from 'react';
import {
  withRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

// import ProtectedRoute from '../../components/ProtectedRoute';
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
    <Layout>
        <Sider>
          <MainMenu />
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '40px 40px 40px 80px' }}>
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
