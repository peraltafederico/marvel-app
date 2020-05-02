import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './globalStyles'
import { UserProvider } from './context/user'
import { ComicPage } from './containers/ComicPage'
import { SearchPage } from './containers/SearchPage'
import { FavoritesPage } from './containers/FavoritesPage'
import { theme } from './theme'

const App = (): JSX.Element => (
  <UserProvider>
    <ThemeProvider theme={theme.dark}>
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
    </ThemeProvider>
  </UserProvider>
)

export default App
