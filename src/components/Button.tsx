import type { FC, ReactNode } from "react";
import styled, { css } from "styled-components";

type Props = {
  children: ReactNode;
  color?: string;
  onClick?: () => void;
}

export const Button: FC<Props> = (props) => {
  const { children, color, onClick} = props
  return (
    <StyledButton $background={color} onClick={onClick}>{children}</StyledButton>
  )
}

const StyledButton = styled.button<{ $background?: string; }>`
  background-color: #11999e;
  color: #fff;
  margin: 0 8px;
  color: white;

  ${props => props.$background && css`
    background-color: ${props.$background};
  `}
`
