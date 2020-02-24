import React, { FC } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './Modal.styles'

interface Modal {
  children?: React.ReactNode
}

export const Modal: FC<Modal> = ({ children }: Modal): JSX.Element => {
  return (
    <>
      <Styled.Container>
        <Styled.Backdrop />
        <Styled.Modal>
          <Styled.Header>
            <Styled.CloseIcon icon={faTimes} />
            <Styled.Title>Title</Styled.Title>
          </Styled.Header>
          <Styled.Content>{children}</Styled.Content>
        </Styled.Modal>
      </Styled.Container>
    </>
  )
}
