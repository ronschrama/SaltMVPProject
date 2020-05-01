import React from 'react';
import { Checkbox } from 'antd';
import styled, { css } from 'styled-components';

const StyledCheckbox = styled(Checkbox)`
  background-color: ${props => props.theme.colors.background.light};
  display: block;
  border-radius: 0px;
  margin-top: 20px;
  margin-bottom: 40px;
  
  ${({ login }) =>
    login && css`
      width: 400px;
      height: 32px;
      font-size: ${props => props.theme.fonts.caption};
      line-height: 24px;
      color: ${props => props.theme.colors.text.dark};
      border: 0px;
      border-bottom: 2px solid ${props => props.theme.colors.link.quartary};
  `}
`


function DefaultCheckBox({ children }) {
  return (
    <div>
      <StyledCheckbox>{children}</StyledCheckbox>
    </div>
  )
}

export default DefaultCheckBox
