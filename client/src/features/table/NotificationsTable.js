import React from 'react';

import Heading from '../../components/Heading';
import TableBody from './TableBody';
import { Table } from 'antd'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
  },
  {
    key: '2',
    name: 'Jim Green',
  },
  {
    key: '3',
    name: 'Joe Black',
  },
];



function OverviewTable(props) {
  return (
    <TableBody>
      <Heading tableHeading>Notifications</Heading>
      <Table columns={columns} dataSource={data} size="middle" pagination={false} />
    </TableBody>
  )
}

export default OverviewTable
