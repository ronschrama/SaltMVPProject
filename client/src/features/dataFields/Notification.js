import React from 'react';
import styled, { css } from 'styled-components';
import Link from '../../components/Link';

const StyledNotification = styled.p`
font-size: ${props => props.theme.fonts.base};
font-weight: bold;
color: ${props => props.theme.colors.text.primary};
text-align: left;
margin-bottom: 0px;
`;

const StyledNotificationAmount = styled.p`
font-size: ${props => props.theme.fonts.h3};
color: ${props => props.theme.colors.text.semiTransparant};
text-align: left;
margin-bottom: 10px;
`;

function Notification({ notif, notifSubject, amount, suppliers }) {
  return (
    <div>
      <StyledNotification>New <a>{notifSubject}</a> {notif}</StyledNotification>
      <StyledNotificationAmount>{amount} {suppliers}</StyledNotificationAmount>
    </div>
  )
}

export default Notification;
