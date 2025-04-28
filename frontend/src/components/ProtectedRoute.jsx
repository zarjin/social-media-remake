import { useContext, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthentication } = useContext(AuthContext)
  const location = useLocation()

  // If the user is not authenticated, redirect to login page
  // We pass the current location to the login page so that after login,
  // the user can be redirected back to the page they were trying to access
  if (!isAuthentication) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />
  }

  // If the user is authenticated, render the children components
  return children
}
