import React, { FC, useEffect } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import * as Styled from './Modal.styles'

interface Modal {
  children?: React.ReactNode
  onClose: () => void
}

export const Modal: FC<Modal> = ({ children, onClose }: Modal): JSX.Element => {
  const scrollToTop = (): void => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <>
      <Styled.Backdrop onClick={(): void => onClose()} />
      <Styled.Modal>
        <Styled.Header>
          <Styled.CloseIcon onClick={(): void => onClose()} icon={faTimes} />
          <Styled.Title>Title</Styled.Title>
        </Styled.Header>
        <Styled.Content>{children}</Styled.Content>
      </Styled.Modal>
    </>
  )
}
