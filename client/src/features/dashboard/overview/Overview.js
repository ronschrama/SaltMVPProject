import React from 'react'

import { Row, Col } from 'antd';
import OverviewTable from '../../table/OverviewTable';
import NotificationsTable from '../../table/NotificationsTable';
import Heading from '../../../components/Heading';
import TableBody from '../../table/TableBody';

function Overview() {
  return (
    <div>
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
    </div>
  )
}

export default Overview