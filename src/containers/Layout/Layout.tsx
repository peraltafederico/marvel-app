import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as Styled from './Layout.styles'
import { Header } from '../../components/Header'

interface Layout {
  children?: React.ReactNode
}

export const Layout: FC<Layout> = ({ children }: Layout): JSX.Element => {
  const [value, setValue] = useState('')
  const history = useHistory()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value)

    // if (window.location.pathname !== '/search') {
    //   history.push('/search')
    // }
  }

  return (
    <>
      <Header
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => handleChange(event)}
        value={value}
        onClick={(): void => {}}
      />
      <Styled.ContentContainer>
        <Styled.Content>{children}</Styled.Content>
      </Styled.ContentContainer>
    </>
  )
}
