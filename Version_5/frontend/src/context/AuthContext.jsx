import React, { createContext, useReducer, useEffect, useState } from 'react'

// Define the initial state
const initialState = {
	isAuthenticated: false,
	user: null
}

// Create AuthContext
export const AuthContext = createContext()

// Define authReducer to handle actions
const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isAuthenticated: true,
				user: action.payload
			};
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				user: null
			};
		default:
			return state;
	}
}

// Create AuthProvider to wrap the app
export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState)
	const [isInitialized, setInitialized] = useState(false)

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))
		const admin = JSON.parse(localStorage.getItem('admin'))

		if (user || admin) {
			const userData = user || admin
			dispatch({type: 'LOGIN', payload: userData})
		}

		setInitialized(true)
	}, [])

	console.log(state)

	return (
		<AuthContext.Provider value={{ state, dispatch, isInitialized }}>
			{children}
		</AuthContext.Provider>
	)
}