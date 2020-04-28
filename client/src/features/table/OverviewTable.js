import React from 'react';
import styled, { css } from 'styled-components';

import { Table, Tag } from 'antd';
import Heading from '../../components/Heading';
import TableBody from './TableBody';
// import Tag from './Tag';

const StyledTable = styled(Table)`
font-size: ${props => props.theme.fonts.base};
`

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
          let color = status.length;
          if (status === 'Cancelled') {
            color = `red`;
          }
          if (status === 'Awaiting proposals') {
            color = `yellow`;
          }
          if (status === 'Proposals recieved') {
            color = `green`;
          }
          if (status === 'On hold') {
            color = `grey`;
          }
          return (
            <Tag color={color} key={status}>
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
  },
  {
    title: 'Data',
    dataIndex: 'data',
    key: 'data',
  },
];

const data = [
  {
    key: '1',
    name: 'Women_day_campaign',
    territory: 'Netherlands',
    statuses: ['Awaiting proposals'],
    createdby: 'Denis K.',
    totalBudget: '$190,291',
    data: '02 Mar 2020',

  },
  {
    key: '2',
    name: 'New_shoes_campaign',
    territory: 'France',
    statuses: ['Proposals recieved'],
    createdby: 'Galya G.',
    totalBudget: '$170,638',
    data: '01 Mar 2020',
  },
  {
    key: '3',
    name: 'Tshit_goretext_campaign',
    territory: 'Germany',
    statuses: ['Cancelled'],
    createdby: 'Denis K.',
    totalBudget: '$160,218',
    data: '25 Feb 2020',
  },
  {
    key: '4',
    name: 'N_Marathon_campaign',
    territory: 'Russia',
    statuses: ['On hold'],
    createdby: 'Galya G.',
    totalBudget: '$14,421',
    data: '19 Feb 2020',
  },
  {
    key: '5',
    name: 'New_shoes_campaign',
    territory: 'UK',
    statuses: ['Proposals recieved'],
    createdby: 'Galya G.',
    totalBudget: '$120,370',
    data: '23 Jan 2020',
  },
  {
    key: '6',
    name: 'NA_women_day_campaign',
    territory: 'USA',
    statuses: ['Proposals recieved'],
    createdby: 'Galya G.',
    totalBudget: '$9,928',
    data: '10 Jan 2020',
  },
];


function OverviewTable() {
  return (
    <TableBody>
      <Heading tableHeading>Briefs</Heading>
      <StyledTable columns={columns} dataSource={data} pagination={false} />
    </TableBody>
  )
}

export default OverviewTable
