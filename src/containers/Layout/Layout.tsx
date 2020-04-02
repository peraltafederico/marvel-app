import React, { FC, useState, useEffect } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import * as Styled from './Layout.styles'
import { Header } from '../../components/Header'
import useDebounce from '../../hooks/useDebounce'
import { ComicPage } from '../ComicPage'
import { SearchPage } from '../SearchPage'
import useQuery from '../../hooks/useQuery'

export const Layout = (): JSX.Element => {
  const history = useHistory()
  const query = useQuery()
  const [value, setValue] = useState(query.get('name') || '')

  const [search, alreadySearched] = useDebounce(value, 500)

  useEffect(() => {
    if (alreadySearched) {
      history.push(`/search?character=${search}`)
    }
  }, [search, history])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget
    setValue(value)
  }

  return (
    <>
      <Header onChange={handleChange} value={value} onClick={(): void => {}} />
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
