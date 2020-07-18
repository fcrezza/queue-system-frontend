import React, {createContext, useContext, useEffect, useState} from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Spinner from '../components/Spinner'
import useAsyncError from '../hooks/useAsyncError'

axios.defaults.withCredentials = true
const AuthContext = createContext()

function AuthProvider({children}) {
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const {data: user, isValidating, mutate, error} = useSWR('/user')
  const setAsyncError = useAsyncError()

  useEffect(() => {
    if (error) {
      setAsyncError(error)
    }
  }, [error])

  useEffect(() => {
    if (!isValidating && typeof user === 'object') {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [isValidating, user])

  const login = async (inputData) => {
    setLoadingMessage('Login ...')
    const url = 'http://localhost:4000/login'
    await axios.post(url, inputData)
    await mutate()
  }

  const logout = async () => {
    setLoading(true)
    setLoadingMessage('Logout ...')
    await axios.get('http://localhost:4000/logout')
    await mutate(null, false)
  }

  const signup = async (data) => {
    setLoadingMessage('Signup ...')
    const url = 'http://localhost:4000/signup'
    await axios.post(url, data)
    await mutate()
  }

  if (loading) {
    return <Spinner>{loadingMessage}</Spinner>
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
