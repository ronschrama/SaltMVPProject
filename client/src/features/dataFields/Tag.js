import React from 'react'
import styled, { css } from 'styled-components';

import { Tag } from 'antd';

const TableTag = styled(Tag)`
  border: 0px;
  border-radius: 14px;
  padding: 4px 10px 4px;
  color: ${props => props.theme.colors.text.tag};
  font-size: ${props => props.theme.fonts.h3};
  font-weight: bold; 
  line-height: 18px;
  ${({ recieved }) =>
    recieved && css`
      background-color: ${props => props.theme.colors.label.primary};
    `}
  ${({ awaiting }) =>
    awaiting && css`
      background-color: ${props => props.theme.colors.label.secondary};
    `}
    ${({ cancelled }) =>
    cancelled && css`
      background-color: ${props => props.theme.colors.label.tertiary};
    `}
    ${({ hold }) =>
    hold && css`
      background-color: ${props => props.theme.colors.label.quartary};
    `}
`

function DefaultTag({ recieved, awaiting, cancelled, hold, children }) {
  return (
    <TableTag
      recieved={recieved}
      awaiting={awaiting}
      cancelled={cancelled}
      hold={hold}
    >
      {children}
    </TableTag>
  )
}

export default DefaultTag;
