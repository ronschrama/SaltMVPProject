import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { withCookies } from 'react-cookie';
// import styled from 'styled-components';

import 'antd/dist/antd.css';
import { Layout, Row, Col, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Heading from '../../components/Heading';

const { Content } = Layout;
const { Dragger } = Upload;

const uploadProps = {
  name: 'file',
  headers: { authorization: `Bearer ${Cookies.get('authToken')}` },
  multiple: true,
  withCredentials: true,
  action: 'http://localhost:5000/file/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function Files() {

  return (
    <div>
      <Heading>Upload files</Heading>
      <Row justify="space-between">
        <Col className="gutter-row" span={24}>
          <Dragger {...uploadProps} showUploadList={false} style={{ padding: '40px' }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Dragger>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Files);
