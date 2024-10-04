import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { state, isInitialized } = useContext(AuthContext)

    if (!isInitialized) {
        return <div>Loading...</div>
    }

    if (!state.isAuthenticated) {
        return <Navigate to='/adminLogin' />
    }
    
    return children
}

export default ProtectedRoute