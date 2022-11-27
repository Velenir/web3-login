import {styled} from "@linaria/react"
import React from "react"

const Dialog = styled.dialog`
  width: min(450px,90%);
  /* height: min(450px, 90%); */
  border: 1px solid antiquewhite;
  box-shadow: 3px 2px 5px 0px #00000057;
  border-radius: 7px;
`
interface ModalProps {
  children?: React.ReactNode
  open?: boolean
}


export const Modal = (props: ModalProps) : JSX.Element => {
  return <Dialog {...props}/>
}

export interface ModalContextProps {
  closeModal(): void
}