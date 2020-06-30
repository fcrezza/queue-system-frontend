import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {SocketProvider} from '../context/SocketContext'
import StudentDashboard from '../pages/Dashboard/Student'
import ProfessorDashboard from '../pages/Dashboard/Professor'

function AuthenticatedRoute() {
  const {user} = useAuth()
  const component =
    user.role === 'student' ? StudentDashboard : ProfessorDashboard

  return (
    <Router>
      <Switch>
        <SocketProvider>
          <Route path="/" component={component} />
        </SocketProvider>
      </Switch>
    </Router>
  )
}

export default AuthenticatedRoute
