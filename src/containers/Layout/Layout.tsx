import React, { FC, useState, useContext, useEffect, useCallback, useRef } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import * as Styled from './Layout.styles'
import { Header } from '../../components/Header'
import useDebounce from '../../hooks/useDebounce'
import { ComicPage } from '../ComicPage'
import { SearchPage } from '../SearchPage'

interface Layout {
  children?: React.ReactNode
}

export const Layout: FC<Layout> = ({ children }: Layout): JSX.Element => {
  const history = useHistory()
  const [value, setValue] = useState('')

  const search = useDebounce(value, 500)

  useEffect(() => {
      history.push(`/search?name=${search}`)
  }, [search])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget
    setValue(value)
  }

  return (
    <>
      <Header
        onChange={handleChange}
        value={value}
        onClick={(): void => {}}
      />
      <Styled.ContentContainer>
        <Styled.Content>
          <Switch>
            <Route path="/comic">
              <ComicPage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Redirect from="*" to="/search" />
          </Switch>
        </Styled.Content>
      </Styled.ContentContainer>
    </>
  )
}
