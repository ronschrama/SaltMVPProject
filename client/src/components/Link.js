import React from 'react';
import styled, { css } from 'styled-components';

import { Button } from 'antd';

const StyledLink = styled(Button)`
font-size: ${props => props.theme.fonts.base};
margin-top: 8px;
`

function Link({ children }) {
  return (
    <StyledLink type="link">{children}</StyledLink>
  )
}

export default Link;
