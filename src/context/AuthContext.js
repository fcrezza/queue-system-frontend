import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {useSocket} from './SocketContext'
import Spinner from '../components/Spinner'

axios.defaults.withCredentials = true
const AuthContext = createContext()

function AuthProvider({children}) {
  const socket = useSocket()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const getUser = () => {
    axios
      .get('http://localhost:4000/getUser')
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log('error from getUser context: ', err)
      })
  }

  const login = (inputData, callback) => {
    const {role, username, password} = inputData
    axios
      .post(`http://localhost:4000/login/${role}`, {
        username,
        password,
      })
      .then(() => {
        setLoading(false)
        callback()
        getUser()
      })
      .catch((err) => {
        callback(err.response.data.message)
      })
  }

  const logout = () => {
    axios
      .get('http://localhost:4000/logout')
      .then(() => {
        setLoading(true)
        setUser(null)
        // window.location.reload()
        setLoading(false)
      })
      .catch((err) => {
        console.log('error from logout context: ', err)
      })
  }

  const signup = (data, callback) => {
    axios
      .post(`http://localhost:4000/signup`, {
        ...data,
      })
      .then(() => {
        setLoading(true)
        callback()
        getUser()
      })
      .catch((err) => {
        console.log('error from signup context: ', err)
        callback(err.response.data.message)
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user?.role === 'dosen') {
      socket.emit('make-me-online', user.id)
    }
  }, [user])

  if (loading) {
    return <Spinner>Loading ...</Spinner>
  }

  return (
    <AuthContext.Provider value={{user, logout, login, signup}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export {AuthProvider, useAuth}
