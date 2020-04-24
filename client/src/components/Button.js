import React from 'react';
import { Button } from 'antd';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  background-color: white;
  border-radius: 4px;
  margin-bottom: 24px;
  
  ${({ login }) =>
    login && css`
  width: 400px;
  height: 50px;
  margin-top: 40px;
  background-color: ${props => props.theme.colors.link.primary};
  font-size: ${props => props.theme.fonts.h2};
  line-height: 24px;
  color: ${props => props.theme.colors.background.light};
  border: 0px;
  ${'' /* padding: 18px 0px 18px; */}
  `}
`


function DefaultButton({ login, children }) {
  return (
    <div>
      <StyledButton type="submit" login={login}>{children}</StyledButton>
    </div>
  );
}

export default DefaultButton;
