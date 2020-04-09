import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalStyles from './globalStyles'
import { Layout } from './containers/Layout'
import { UserProvider } from './store/user'

const App = (): JSX.Element => (
  <UserProvider>
    <GlobalStyles />
    <Router>
      <Layout />
    </Router>
  </UserProvider>
)

export default App
