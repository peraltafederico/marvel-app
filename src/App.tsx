import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import GlobalStyles from './globalStyles'
import { SearchPage } from './containers/SearchPage'
import { ComicPage } from './containers/ComicPage'

const App = (): JSX.Element => (
  <>
    <GlobalStyles />
    <Router>
      <Switch>
        <Route path="/comic">
          <ComicPage />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Redirect from="*" to="/search" />
      </Switch>
    </Router>
  </>
)

export default App
