import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true
const AuthContext = createContext()

function AuthProvider({children}) {
	const [status, setStatus] = useState('pending')
	const [user, setUser] = useState(null)

	const getUser = () => {
		axios.get('http://localhost:4000/getUser').then((res) => {
			setUser(res.data)
			setStatus('complete')
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
				setStatus('pending')
				callback()
				getUser()
			})
			.catch((err) => {
				callback(err.response.data.message)
			})
	}

	const logout = () => {
		axios.get('http://localhost:4000/logout').then(() => {
			setStatus('pending')
			setUser(null)
			setStatus('complete')
		})
	}

	const signup = (data, callback) => {
		axios
			.post(`http://localhost:4000/signup`, {
				...data,
			})
			.then((_res) => {
				setStatus('pending')
				callback()
				getUser()
			})
			.catch((err) => {
				console.log(err)
				callback(err.response.data.message)
			})
	}

	useEffect(() => {
		getUser()
	}, [])

	if (status === 'pending') {
		return <div>loading ...</div>
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
