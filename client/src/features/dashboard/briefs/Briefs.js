import React from 'react';

import { Row, Col, Skeleton } from 'antd';
import Heading from '../../../components/Heading';

function Briefs() {
  return (
    <div>
      <Heading>Briefs</Heading>
      <Row justify="space-between">
        <Col className="gutter-row" span={20}>
          <Skeleton avatar paragraph={{ rows: 2 }} />
          <Skeleton avatar paragraph={{ rows: 2 }} />
          <Skeleton avatar paragraph={{ rows: 2 }} />
        </Col>
      </Row>
    </div>
  )
}

export default Briefs
