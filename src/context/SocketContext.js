import React, {useContext, createContext, useEffect} from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()
const socket = io('http://localhost:4000', {
  autoConnect: false,
})

function SocketProvider({children}) {
  useEffect(() => {
    socket.open()

    return () => {
      socket.close()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

function useSocket() {
  return useContext(SocketContext)
}

export {SocketProvider, useSocket}
