import React, { FC } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './Modal.styles'
import { Backdrop } from '../Backdrop'

interface Modal {
  children?: React.ReactNode
  title: string
  onClose: () => void
}

export const Modal: FC<Modal> = ({ children, onClose, title }: Modal): JSX.Element => {
  return (
    <>
      <Backdrop onClick={onClose} />
      <Styled.Modal>
        <Styled.Content>
          <Styled.Header>
            <Styled.CloseIcon size="lg" onClick={onClose} icon={faTimes} />
            <Styled.Title>{title}</Styled.Title>
          </Styled.Header>
          {children}
        </Styled.Content>
      </Styled.Modal>
    </>
  )
}
