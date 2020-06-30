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
      .then(({data}) => {
        setUser(data)
        setLoading(false)
      })
      .catch((err) => {
        // may caused by network error
        console.log('error from getUser context: ', err)
      })
  }

  const login = async (inputData) => {
    const {role, username, password} = inputData
    const url = `http://localhost:4000/login/${role}`
    try {
      await axios.post(url, {
        username,
        password,
      })
      setLoading(true)
      getUser()
    } catch (error) {
      throw error.response.data.message
    }
  }

  const logout = () => {
    axios
      .get('http://localhost:4000/logout')
      .then(() => {
        setUser(null)
        window.location.reload()
      })
      .catch((err) => {
        console.log('error from logout context: ', err)
      })
  }

  const signup = async (data) => {
    const url = 'http://localhost:4000/signup'
    try {
      await axios.post(url, data)
      setLoading(true)
      getUser()
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      }

      throw error
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user?.role === 'professor') {
      socket.emit('makeMeOnline', user.id)
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
