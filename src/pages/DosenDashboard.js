import React from 'react'
import {useAuth} from '../context/AuthContext'

function DosenDashboard() {
  const {logout} = useAuth()

  return (
    <>
      <div>hello from DosenDashboard</div>
      <button onClick={logout} type="button">
        logout
      </button>
    </>
  )
}

export default DosenDashboard
