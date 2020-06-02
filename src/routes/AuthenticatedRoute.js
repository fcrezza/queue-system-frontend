import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import MahasiswaDashboard from '../pages/MahasiswaDashboard'
import DosenDashboard from '../pages/DosenDashboard'
import {useAuth} from '../context/AuthContext'

function AuthenticatedRoute() {
  const {user} = useAuth()

  if (user.role === 'mahasiswa') {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MahasiswaDashboard} />
        </Switch>
      </Router>
    )
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DosenDashboard} />
      </Switch>
    </Router>
  )
}

export default AuthenticatedRoute
