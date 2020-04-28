import React from 'react';
import styled, { css } from 'styled-components';

import { Button } from 'antd';

const StyledButton = styled(Button)`
  border-radius: 4px;
  
  ${({ login }) =>
    login && css`
      width: 400px;
      height: 50px;
      margin-bottom: 24px;
      margin-top: 40px;
      background-color: ${props => props.theme.colors.link.primary};
      font-size: ${props => props.theme.fonts.h2};
      color: ${props => props.theme.colors.background.light};
  `}
`


function DefaultButton({ login, children }) {
  return (
    <div>
      <StyledButton
        type="primary"
        htmlType="submit"
        login={login}>
        {children}
      </StyledButton>
    </div>
  );
}

export default DefaultButton;
