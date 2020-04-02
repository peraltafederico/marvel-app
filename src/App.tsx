import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import GlobalStyles from './globalStyles'
import { SearchPage } from './containers/SearchPage'
import { ComicPage } from './containers/ComicPage'
import { Layout } from './containers/Layout'

const App = (): JSX.Element => (
  <>
    <GlobalStyles />
    <Router>
      <Layout />
    </Router>
  </>
)

export default App
