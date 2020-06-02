import React from 'react'

import AuthenticatedRoute from './routes/AuthenticatedRoute'
import UnauthenticatedRoute from './routes/UnauthenticatedRoute'
import {useAuth} from './context/AuthContext'

function App() {
  const {user} = useAuth()
  return user ? <AuthenticatedRoute /> : <UnauthenticatedRoute />
}

export default App
