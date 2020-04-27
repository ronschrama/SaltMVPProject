import React from 'react'
import styled from 'styled-components';

const Body = styled.div`
  background-color: ${props => props.theme.colors.background.light};
  padding: 20px;
  box-shadow: 0px 2px 6px #0000000A;
`

function TableBody({ children }) {
  return (
    <Body>{children}</Body>
  );
}

export default TableBody