import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Route, Switch} from 'react-router-dom'
import {useSocket} from '../../../context/SocketContext'
import Home from './Home'
import Antrian from './Antrian'
import Profile from './Profile'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import ProfilePembimbing from './ProfilePembimbing'
import Spinner from '../../../components/Spinner'
import {useAuth} from '../../../context/AuthContext'

function MahasiswaDashboard({match}) {
  const {user} = useAuth()
  const socket = useSocket()
  const [professor, setProfessor] = useState(null)
  const {id, fullname, avatar, study, role, professorID} = user

  useEffect(() => {
    socket.on('dosenStatus', (data) => {
      if (professorID === data.id) {
        setProfessor((prevData) => ({
          ...prevData,
          status: data.status,
        }))
      }
    })
  }, [])

  useEffect(() => {
    const url = `http://localhost:4000/getDosen/${professorID}`
    axios
      .get(url)
      .then(({data}) => {
        setProfessor(data)
      })
      .catch((error) => {
        console.log('error from fetch professor: ', error)
      })
  }, [])

  if (!professor) {
    return <Spinner>Memuat data ...</Spinner>
  }

  return (
    <Switch>
      <Route
        path={`${match.path}antrian`}
        render={(routerProps) => (
          <Antrian
            id={id}
            professorID={professorID}
            professorName={professor.fullname}
            professorAvatar={professor.avatar}
            professorStatus={professor.status}
            {...routerProps}
          />
        )}
      />
      <Route
        path={`${match.path}dosen-pembimbing`}
        render={(routerProps) => (
          <ProfilePembimbing professor={professor} {...routerProps} />
        )}
      />
      <Route
        path={`${match.path}profil/ubah-password`}
        render={(routerProps) => (
          <ChangePassword role={role} id={id} {...routerProps} />
        )}
      />
      <Route
        path={`${match.path}profil/edit`}
        render={(routerProps) => <EditProfile user={user} {...routerProps} />}
      />
      <Route
        path={`${match.path}profil`}
        render={(routerProps) => (
          <Profile
            user={user}
            professorName={professor.fullname}
            {...routerProps}
          />
        )}
      />
      <Route
        path={match.path}
        render={(routerProps) => (
          <Home
            professorName={professor.fullname}
            professorAvatar={professor.avatar}
            professorStatus={professor.status}
            study={study.name}
            fullname={fullname}
            avatar={avatar}
            {...routerProps}
          />
        )}
      />
    </Switch>
  )
}

export default MahasiswaDashboard
