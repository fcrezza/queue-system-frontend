import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import SignupVerification from '../pages/SignupVerification'

function UnauthenticatedRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route
          exact
          path="/signup-verification"
          component={SignupVerification}
        />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </Router>
  )
}

export default UnauthenticatedRoute
