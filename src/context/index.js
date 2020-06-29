import React from 'react'
import {AuthProvider} from './AuthContext'
import {SocketProvider} from './SocketContext'

function ContextProvider({children}) {
  return (
    <SocketProvider>
      <AuthProvider>{children}</AuthProvider>
    </SocketProvider>
  )
}

export default ContextProvider
