import React from 'react';

import { Row, Col, Empty } from 'antd';
import Heading from '../../../components/Heading';

function Help() {
  return (
    <div>
      <Heading>Help Center</Heading>
      <Row justify="space-between">
        <Col className="gutter-row" span={24}>
          <Empty
            style={{ backgroundColor: '#F7FAFC', padding: '40px', margin: '0' }}
            description={
              <span>
                Placeholder
              </span>
            }
          />
        </Col>
      </Row>
    </div>
  )
}

export default Help
