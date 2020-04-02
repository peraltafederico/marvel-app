import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalStyles from './globalStyles'
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
