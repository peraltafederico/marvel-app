import React, { useState, useEffect, FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import * as Styled from './Layout.styles'
import { NavBar } from '../../components/NavBar'
import useDebounce from '../../hooks/useDebounce'
import useQuery from '../../hooks/useQuery'

interface Layout {
  children: React.ReactNode
}

export const Layout: FC<Layout> = ({ children }: Layout) => {
  const history = useHistory()
  const query = useQuery(`${useLocation().search}`)
  const inputParam = query.get('input') || ''
  const [value, setValue] = useState(inputParam)
  const [search, alreadySearched] = useDebounce(value, 500)

  useEffect(() => {
    if (alreadySearched && inputParam !== value) {
      history.push(`/search?input=${search}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, history])

  useEffect(() => {
    setValue(inputParam)
  }, [inputParam])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value)
  }

  return (
    <>
      <NavBar
        value={value}
        onChange={handleChange}
        starSelected={window.location.pathname === '/favorites'}
        starLinkPath={window.location.pathname === '/favorites' ? '/search' : '/favorites'}
      />
      <Styled.ContentContainer>
        <Styled.Content>{children}</Styled.Content>
      </Styled.ContentContainer>
    </>
  )
}
