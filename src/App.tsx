import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import GlobalStyles from './globalStyles'
import { UserProvider } from './context/user'
import { ComicPage } from './containers/ComicPage'
import { SearchPage } from './containers/SearchPage'
import { FavoritesPage } from './containers/FavoritesPage'
import { AppProvider } from './context/app'

const App: FC = () => {
  return (
    <AppProvider>
      <UserProvider>
        <GlobalStyles />
        <Router>
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
        </Router>
      </UserProvider>
    </AppProvider>
  )
}

export default App
