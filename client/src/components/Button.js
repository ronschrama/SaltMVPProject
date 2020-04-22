import React from 'react';
import styled, { css } from 'styled-components';

// const StyledButton = styled.button`
//   background-color: white;
//   font-size: 16px;
//   border-radius: 4px;
//   ${({ primary }) =>
//     primary && css`
//   width: 400px;
//   padding: 12px;
//   background-color: #3C78D8;
//   color: white;
//   `}
//    `;

function Button({ children }) {
  return (
    <button>{children}</button>
  )
}

export default Button;