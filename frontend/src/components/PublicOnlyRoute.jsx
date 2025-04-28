import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function PublicOnlyRoute({ children }) {
  const { isAuthentication } = useContext(AuthContext)
  const location = useLocation()

  // Get the redirect path from location state or default to home page
  const from = location.state?.from || '/'

  // If the user is already authenticated, redirect to the home page
  // or to the page they were trying to access before being redirected to login
  if (isAuthentication) {
    return <Navigate to={from} replace />
  }

  // If the user is not authenticated, render the children components
  return children
}
