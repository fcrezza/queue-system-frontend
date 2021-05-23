import React, {useContext, createContext, useEffect} from "react";
import io from "socket.io-client";

const SocketContext = createContext();
const socket = io(process.env.REACT_APP_API_URL, {
  autoConnect: false
});

function SocketProvider({children}) {
  useEffect(() => {
    socket.open();

    return () => {
      socket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

function useSocket() {
  return useContext(SocketContext);
}

export {SocketProvider, useSocket};
