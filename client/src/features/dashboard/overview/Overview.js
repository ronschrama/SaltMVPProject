import React from 'react';

import { Row, Col } from 'antd';
import OverviewTable from '../../dataFields/OverviewTable';
import NotificationsTable from '../../dataFields/NotificationsTable';
import Heading from '../../../components/Heading';
import AnualSpend from '../../dataFields/AnnualSpend';
import DepartmentSpend from '../../dataFields/DepartmendSpend';

function Overview() {
  return (
    <div>
      <Heading>Overview</Heading>
      <Row justify="space-between" gutter={[40, 40]}>
        <Col className="gutter-row" span={16}>
          <OverviewTable />
        </Col>
        <Col className="gutter-row" span={8}>
          <NotificationsTable />
        </Col>
      </Row>
      <Row gutter={[40, 40]}>
        <Col className="gutter-row" span={8}>
          <AnualSpend />
        </Col>
        <Col className="gutter-row" span={8}>
          <DepartmentSpend />
        </Col>
      </Row>
    </div>
  )
}

export default Overview
