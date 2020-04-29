import React from 'react';
import { withRouter } from 'react-router-dom';
// import { withCookies } from 'react-cookie';
// import styled from 'styled-components';

import 'antd/dist/antd.css';
import { Layout, Row, Col, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Dragger } = Upload;

const uploadProps = {
  name: 'file',
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
    <Layout>
        <Content style={{ margin: '80px' }}>
          <Row justify="space-around" style={{ padding: 50 }}>
            <Col className="gutter-row" span={14}>
              <div><h1>Upload a File:</h1></div>
              <Dragger {...uploadProps} showUploadList={false}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                  band files
                </p>
              </Dragger>
            </Col>
          </Row>
          <Row justify="space-between" style={{ padding: 50 }}>
            <Col className="gutter-row" span={4}>
              <div>col 1</div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div>Col 2</div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div>col 3</div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div>Col 4</div>
            </Col>
          </Row>
        </Content>
    </Layout>
  );
}

export default withRouter(Files);