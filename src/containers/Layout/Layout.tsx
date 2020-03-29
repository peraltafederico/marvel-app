import React, { FC, useState, useContext, useEffect, useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import * as Styled from './Layout.styles'
import { Header } from '../../components/Header'
import useDebounce from '../../hooks/useDebounce'

interface Layout {
  children?: React.ReactNode
}

export const Layout: FC<Layout> = ({ children }: Layout): JSX.Element => {
  const history = useHistory()
  const [value, setValue] = useState('')

  const search = useDebounce(value, 500)

  useEffect(() => {
    if (search) {
      history.push(`/search?name=${search}`)
    } else {
      history.push(`/search`)
    }
  }, [search])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget
    setValue(value)
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
