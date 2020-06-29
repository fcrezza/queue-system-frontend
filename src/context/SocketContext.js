import React, {useRef, useContext, createContext, useEffect} from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

function SocketProvider({children}) {
  const {current: socket} = useRef(io('http://localhost:4000'))

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
