import React from 'react'
import styled, { css } from 'styled-components';

const Heading = styled.h1`
  font-size: ${props => props.theme.fonts.h1};
  color: ${props => props.theme.colors.text.dark};
  line-height: 0px;
  text-align: left;
  margin-bottom: 40px;

  ${({ tableHeading }) =>
    tableHeading && css`
      font-size: ${props => props.theme.fonts.h2};
      color: ${props => props.theme.colors.text.primary};
      line-height: 13px;
      text-align: left;
      margin-bottom: 20px;
    `}
  ${({ loginHeading }) =>
    loginHeading && css`
      font-size: ${props => props.theme.fonts.h2};
      color: ${props => props.theme.colors.text.semiTransparant};
      margin-bottom: 40px;
      margin-top: 20px;
    `
  }
`

function DefaultHeading({ tableHeading, loginHeading, children }) {
  return (
    <Heading
      tableHeading={tableHeading}
      loginHeading={loginHeading}
    >{children}
    </Heading>
  );
}

export default DefaultHeading
