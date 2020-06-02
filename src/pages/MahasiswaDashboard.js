import React from 'react'
import {useAuth} from '../context/AuthContext'

function MahasiswaDashboard() {
  const {logout} = useAuth()

  return (
    <>
      <div>hello from mahasiswa dashboard</div>
      <button onClick={logout} type="button">
        logout
      </button>
    </>
  )
}

export default MahasiswaDashboard
