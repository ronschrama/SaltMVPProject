import React from 'react';
import styled, { css } from 'styled-components';

import { Button } from 'antd';

const StyledButton = styled(Button)`
  background-color: white;
  border-radius: 4px;
  border: 0px;
  
  ${({ login }) =>
    login && css`
      width: 400px;
      height: 50px;
      margin-bottom: 24px;
      margin-top: 40px;
      background-color: ${props => props.theme.colors.link.primary};
      font-size: ${props => props.theme.fonts.h2};
      line-height: 24px;
      color: ${props => props.theme.colors.background.light};
      ${'' /* padding: 18px 0px 18px; */}
  `}
`


function DefaultButton({ login, children }) {
  return (
    <div>
      <StyledButton
        htmlType="submit"
        login={login}>
        {children}
      </StyledButton>
    </div>
  );
}

export default DefaultButton;
