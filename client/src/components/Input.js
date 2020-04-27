import React from 'react';
import { Input } from 'antd';
import styled, { css } from 'styled-components';

const StyledInput = styled(Input)`
  background-color: ${props => props.theme.colors.background.light};
  display: block;
  border-radius: 0px;
  margin-top: 20px;
  margin-bottom: 40px;
  
  ${({ login }) =>
    login && css`
      width: 400px;
      height: 32px;
      display: flex;
      align-self: center; 
      font-size: ${props => props.theme.fonts.caption};
      line-height: 24px;
      color: ${props => props.theme.colors.text.dark};
      border: 0px;
      border-bottom: 2px solid ${props => props.theme.colors.link.quartary};
  `}
`

function InputComponent(props, login) {
  return (
    <StyledInput
      login={login}
      placeholder={props.name}
    // ref={props.ref}
    />
  );
}

export default InputComponent;

// function Input(props) {
//   return (
//     <input
//       placeholder={props.name}
//       // ref={props.ref}
//       onChange={(e) => props.handleChange(e.target.value)}
//       type={props.type}
//     />
//   );
// }
