import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {useAuth} from '../../../context/AuthContext'
import Home from './Home'
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import StudentProfile from './StudentProfile'
import StudentList from './StudentList'
import Queue from './Queue'

function generateGreetingMessage(id, fullname) {
  if (id === 1) {
    return `Halo, Pak ${fullname.slice(0, fullname.indexOf(' '))}`
  }

  return `Halo, Bu ${fullname.slice(0, fullname.indexOf(' '))}`
}

function ProfessorDashboard({match}) {
  const {user} = useAuth()
  const {
    id,
    role,
    gender,
    username,
    nip,
    address,
    fullname,
    avatar,
    faculty,
  } = user
  const greetingMessage = generateGreetingMessage(gender.id, fullname)

  return (
    <Switch>
      <Route
        path={`${match.path}profile/change-password`}
        render={(routeProps) => (
          <ChangePassword id={id} role={role} {...routeProps} />
        )}
      />
      <Route
        path={`${match.path}profile/edit`}
        render={(routeProps) => <EditProfile user={user} {...routeProps} />}
      />
      <Route
        path={`${match.path}profile`}
        render={(routeProps) => (
          <Profile
            username={username}
            fullname={fullname}
            nip={nip}
            avatar={avatar}
            address={address}
            genderName={gender.name}
            facultyName={faculty.name}
            {...routeProps}
          />
        )}
      />
      <Route
        path={`${match.path}students/:id`}
        render={(routeProps) => <StudentProfile {...routeProps} />}
      />
      <Route
        path={`${match.path}students`}
        render={(routeProps) => <StudentList id={id} {...routeProps} />}
      />
      <Route
        path={`${match.path}queue`}
        render={(routeProps) => <Queue id={id} {...routeProps} />}
      />
      <Route
        path={match.path}
        render={(routeProps) => (
          <Home
            greetingMessage={greetingMessage}
            avatar={avatar}
            fullname={fullname}
            facultyName={faculty.name}
            {...routeProps}
          />
        )}
      />
    </Switch>
  )
}

export default ProfessorDashboard
