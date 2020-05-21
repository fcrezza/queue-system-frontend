import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'
import 'typeface-montserrat'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SignupVerification from './pages/SignupVerification'

const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		font-size: 10px;
		font-family: "Montserrat", sans-serif;
		box-sizing: border-box;
	}

	body {
		margin: 0;
		line-height: 1.5;
		background: #f9f9f9;
	}
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route
            exact
            path="/signup-verification"
            component={SignupVerification}
          />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </>
  )
}

export default App
