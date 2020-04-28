import React from 'react';
import styled, { css } from 'styled-components';

import { Button } from 'antd';

const MenuItem = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 240px;
  height: 50px;
  background-color: ${props => props.theme.colors.background.dark};
  font-size: ${props => props.theme.fonts.caption};
  color: ${props => props.theme.colors.background.light};
  padding-left: 26px;
  border-radius: 0px;
  border: 0px;

  &:hover {
    background-color: ${props => props.theme.colors.background.link};
    color: ${props => props.theme.colors.link.tertiary};
  }

  ${
  ({ menuactive }) =>
    menuactive && css`
      display: flex;
      flex-direction: row;
      align-items: baseline;
      width: 240px;
      height: 50px;
      background-color: ${props => props.theme.colors.background.link};
      font-size: ${props => props.theme.fonts.caption};
      color: ${props => props.theme.colors.background.light};
      border-left: 4px solid ${props => props.theme.colors.link.tertiary};
      padding-left: 24px;
      border-radius: 0px;
      
      &:hover {
        background-color: ${props => props.theme.colors.background.link};
        font-size: ${props => props.theme.fonts.caption};
        color: ${props => props.theme.colors.link.tertiary};
        border-left: 4px solid ${props => props.theme.colors.link.tertiary};
        padding-left: 24px;
        border-radius: 0px;
      }
      &:focus {
        background-color: ${props => props.theme.colors.background.link};
        font-size: ${props => props.theme.fonts.caption};
        color: ${props => props.theme.colors.link.tertiary};
        border-left: 4px solid ${props => props.theme.colors.link.tertiary};
        padding-left: 24px;
        border-radius: 0px;
      }
  `}
`


function DefaultButton({ menuactive, icon, children }) {
  return (
    <div>
      <MenuItem
        menuactive={menuactive}
        icon={icon}>
        {children}
      </MenuItem>
    </div>
  );
}

export default DefaultButton;
