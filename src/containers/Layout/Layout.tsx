import React, { FC } from 'react'
import * as Styled from './Layout.styles'
import { Header } from '../../components/Header'

interface Layout {
  children?: React.ReactNode
}

export const Layout: FC<Layout> = ({ children }: Layout): JSX.Element => (
  <>
    <Header onClick={(): void => {}} />
    <Styled.ContentContainer>
      <Styled.Content>{children}</Styled.Content>
    </Styled.ContentContainer>
  </>
)
