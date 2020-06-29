import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {useAuth} from '../../../context/AuthContext'
import Home from './Home'
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import MahasiswaProfile from './MahasiswaProfile'
import MahasiswaList from './MahasiswaList'
import Antrian from './Antrian'

function generateGreetingMessage(id, fullname) {
  if (id === 1) {
    return `Halo, Pak ${fullname.slice(0, fullname.indexOf(' '))}`
  }

  return `Halo, Bu ${fullname.slice(0, fullname.indexOf(' '))}`
}

function DosenDashboard() {
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
        path="/profile/change-password"
        render={(routeProps) => (
          <ChangePassword id={id} role={role} {...routeProps} />
        )}
      />
      <Route
        path="/profile/edit"
        render={(routeProps) => <EditProfile user={user} {...routeProps} />}
      />
      <Route
        path="/profile"
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
        path="/mahasiswa/:id"
        render={(routeProps) => <MahasiswaProfile {...routeProps} />}
      />
      <Route
        path="/mahasiswa"
        render={(routeProps) => <MahasiswaList id={id} {...routeProps} />}
      />
      <Route
        path="/antrian"
        render={(routeProps) => <Antrian id={id} {...routeProps} />}
      />
      <Route
        path="/"
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

export default DosenDashboard
