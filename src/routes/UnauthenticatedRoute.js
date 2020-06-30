import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import NotFound from '../pages/NotFound/index'

function UnauthenticatedRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default UnauthenticatedRoute
