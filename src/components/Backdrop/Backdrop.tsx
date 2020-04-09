import React from 'react'
import * as Styled from './Backdrop.styles'

interface Backdrop {
  onClick: () => void
}

export const Backdrop = ({ onClick }): JSX.Element => (
  <Styled.Backdrop onClick={onClick} />
)
