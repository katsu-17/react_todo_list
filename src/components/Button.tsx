import { memo, type FC, type ReactNode } from "react";
import styled, { css } from "styled-components";

type Props = {
  children: ReactNode;
  color?: string;
  onClick?: () => void;
}

export const Button: FC<Props> = memo((props) => {
  const { children, color, onClick} = props
  return (
    <StyledButton $background={color} onClick={onClick}>{children}</StyledButton>
  )
})

const StyledButton = styled.button<{ $background?: string; }>`
  background-color: #11999e;
  padding: 6px 12px;
  color: #fff;
  margin: 0 3px;
  border: none;
  border-radius: 9999px;
  outline: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  ${props => props.$background && css`
    background-color: ${props.$background};
  `}
`
