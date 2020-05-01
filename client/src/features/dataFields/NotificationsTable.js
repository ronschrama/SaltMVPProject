import React from 'react';
import styled, { css } from 'styled-components';

import Heading from '../../components/Heading';
import Card from '../../components/Card';
import Notification from './Notification';
import Link from '../../components/Link';

const NotificationBackground = styled.div`
  border-bottom: 1px solid #dbdbdb;
  padding: 10px 12px 0 12px;
  &:hover {
    background-color: #fafafa;
  }
  ${({ first }) =>
    first && css`
      border-top: 1px solid #dbdbdb;
    `}
`;

function OverviewTable(props) {
  return (
    <Card style={{ height: '480px' }}>
      <Heading tableHeading>Notifications</Heading>
      <NotificationBackground first>
        <Notification notifSubject='Car Lease' notif='project has been added to the system in Bulgaria.' amount='Total amount $180.000.'></Notification>
      </NotificationBackground> 
      <NotificationBackground>
        <Notification notifSubject='Telecom' notif='project has been launched in the Netherlands.' amount='Total amount $80.000.' suppliers=' 3 suppliers involved'></Notification>
      </NotificationBackground>
      <NotificationBackground>
        <Notification notifSubject='Car Lease' notif='project has been added to the system in Bulgaria.' amount='Total amount $180.000.'></Notification>
      </NotificationBackground> 
      <NotificationBackground>
        <Notification notifSubject='Telecom' notif='project has been launched in the Netherlands.' amount='Total amount $80.000.' suppliers=' 3 suppliers involved'></Notification>
      </NotificationBackground>
      <Link>Show More</Link>
    </Card>
  )
}

export default OverviewTable;
