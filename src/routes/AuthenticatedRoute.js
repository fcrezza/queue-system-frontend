import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import MahasiswaDashboard from '../pages/Dashboard/Mahasiswa'
import DosenDashboard from '../pages/Dashboard/Dosen'
import {useAuth} from '../context/AuthContext'
import {SocketProvider} from '../context/SocketContext'

function AuthenticatedRoute() {
  const {user} = useAuth()
  const component =
    user.role === 'mahasiswa' ? MahasiswaDashboard : DosenDashboard

  return (
    <SocketProvider>
      <Router>
        <Switch>
          <Route path="/" component={component} />
        </Switch>
      </Router>
    </SocketProvider>
  )
}

export default AuthenticatedRoute
