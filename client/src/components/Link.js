import React from 'react';
// import styled, { css } from 'styled-components';

// const StyledButton = styled.button`
//   background-color: white;
//   font-size: 16px;
//   border-radius: 4px;

//   ${({ primary }) =>
//     primary && css`
//     background-color: palevioletred;
//     color: white;
//   `}
// `;

function Link({ children }) {
  return (
    <a>{children}</a>
  )
}

export default Link;