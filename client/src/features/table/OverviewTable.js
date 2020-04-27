import React from 'react';
import styled, { css } from 'styled-components';


import { Table } from 'antd';
import Heading from '../../components/Heading';
import TableBody from './TableBody';
import Tag from './Tag';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Territory',
    dataIndex: 'territory',
    key: 'territory',
  },
  {
    title: 'Status',
    key: 'statuses',
    dataIndex: 'statuses',
    render: statuses => (
      <span>
        {statuses.map(status => {
          let color = status.length > 5 ? 'geekblue' : 'green';
          if (status === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag recieved key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Created By',
    dataIndex: 'createdby',
    key: 'createdby',
  },
  {
    title: 'Total Budget',
    dataIndex: 'totalBudget',
    key: 'totalBudget',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Data',
    dataIndex: 'data',
    key: 'data',
    render: text => <a>{text}</a>,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    territory: 32,
    createdby: 'Denis K.',
    statuses: ['Awaiting proposals'],
  },
  {
    key: '2',
    name: 'Jim Green',
    territory: 42,
    createdby: 'Galya G.',
    statuses: ['Proposals recieved'],
  },
  {
    key: '3',
    name: 'Joe Black',
    territory: 32,
    createdby: 'Denis K.',
    statuses: ['Cancelled'],
  },
];


function OverviewTable() {
  return (
    <TableBody>
      <Heading tableHeading>Briefs</Heading>
      <Table columns={columns} dataSource={data} pagination={false} />
    </TableBody>
  )
}

export default OverviewTable
