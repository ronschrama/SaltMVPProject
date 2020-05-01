import React from 'react';
import styled from 'styled-components';

import { Table } from 'antd';
import Heading from '../../components/Heading';
import Card from '../../components/Card';
import Tag from './Tag';
import Link from '../../components/Link';

const StyledTable = styled(Table)`
font-size: ${props => props.theme.fonts.base};
overflow-x: auto;
`

const columns = [
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'TERRITORY',
    dataIndex: 'territory',
    key: 'territory',
  },
  {
    title: 'STATUS',
    key: 'statuses',
    dataIndex: 'statuses',
    render: statuses => (
      <span>
        {statuses.map(status => {
          let color = status.length;
          if (status === 'Cancelled') {
            return (
              <Tag cancelled>
                {status}
              </Tag>
            );
          }
          if (status === 'Awaiting proposals') {
            return (
              <Tag awaiting>
                {status}
              </Tag>
            );
          }
          if (status === 'Proposals recieved') {
            return (
              <Tag recieved>
                {status}
              </Tag>
            );
          }
          if (status === 'On hold') {
            return (
              <Tag hold>
                {status}
              </Tag>
            );
          }
        })}
      </span>
    ),
  },
  {
    title: 'CREATED BY',
    dataIndex: 'createdby',
    key: 'createdby',
  },
  {
    title: 'TOTAL BUDGET',
    dataIndex: 'totalBudget',
    key: 'totalBudget',
  },
  {
    title: 'DATE',
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
    <Card>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Heading tableHeading>Briefs</Heading>
        <a>+ Add new brief</a>
      </div>
      <StyledTable columns={columns} dataSource={data} pagination={false} align="center" size="middle" />
      <Link>Show More</Link>
    </Card>
  )
}

export default OverviewTable;
