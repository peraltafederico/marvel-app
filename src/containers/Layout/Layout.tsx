import React, { useState, useEffect } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import * as Styled from './Layout.styles'
import { Header } from '../../components/Header'
import useDebounce from '../../hooks/useDebounce'
import { ComicPage } from '../ComicPage'
import { SearchPage } from '../SearchPage'
import useQuery from '../../hooks/useQuery'
import { FavoritesPage } from '../FavoritesPage'

export const Layout = (): JSX.Element => {
  const history = useHistory()
  const query = useQuery()
  const [value, setValue] = useState(query.get('name') || '')
  const [favorites, setFavorites] = useState(false)
  const [search, alreadySearched] = useDebounce(value, 500)

  useEffect(() => {
    if (alreadySearched) {
      history.push(`/search?character=${search}`)
    }
  }, [search, history])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget
    setFavorites(false)
    setValue(value)
  }

  const handleClickFavorites = (): void => {
    setFavorites(!favorites)
    !favorites ? history.push(`/favorites`) : history.push(`/search`)
  }

  return (
    <>
      <Header
        onChange={handleChange}
        value={value}
        starSelected={favorites}
        onClickStar={handleClickFavorites}
      />
      <Styled.ContentContainer>
        <Styled.Content>
          <Switch>
            <Route path="/comic/:id">
              <ComicPage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/favorites">
              <FavoritesPage />
            </Route>
            <Redirect from="*" to="/search" />
          </Switch>
        </Styled.Content>
      </Styled.ContentContainer>
    </>
  )
}
