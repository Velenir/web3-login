import React from "react"
import { Button } from "./Button"
import {styled} from "@linaria/react"

interface ControlProps {
  label: React.ReactNode
  onClick(): void
  value?: React.ReactNode
}

const StyledControl = styled.div`
  display: flex;
  gap: 1.5rem;
`

export const Control  = ({label, onClick, value}:ControlProps): JSX.Element => {
  return <StyledControl>
    <Button onClick={onClick}>{label}</Button>
    <div>{value}</div>
  </StyledControl>
}