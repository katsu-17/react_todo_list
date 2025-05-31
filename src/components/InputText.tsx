import { memo, type ChangeEvent, type FC } from "react";
import styled from "styled-components";

type Props = {
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string
}

export const InputText: FC<Props> = memo((props) => {
  const { value, onChange, placeholder } = props

  return (
    <StyledInput type="text" placeholder={placeholder} value={value} onChange={onChange} />
  )
})

const StyledInput = styled.input`
  padding: 8px 16px;
  border-radius: 8px;
  outline: none;
  border: solid #ddd 1px;
`
