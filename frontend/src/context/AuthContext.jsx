import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import LoadingScreen from '../components/LoadingScreen'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const AUTH_API = import.meta.env.VITE_AUTH_API
  const [isAuthentication, setIsAuthentication] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  const register = async (registerData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/register`, registerData, {
        withCredentials: true,
      })
      checkAuth()
      setIsAuthentication(true)
      toast.success(data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const login = async (loginData) => {
    try {
      const { data } = await axios.post(`${AUTH_API}/login`, loginData, {
        withCredentials: true,
      })
      checkAuth()
      setIsAuthentication(true)
      toast.success(data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      const { data } = await axios.get(`${AUTH_API}/logout`, {
        withCredentials: true,
      })
      checkAuth()
      setIsAuthentication(false)
      toast.success(data.message)
    } catch (error) {
      console.log(error)
      toast(error.message)
    }
  }

  const checkAuth = async () => {
    setAuthLoading(true)
    try {
      const { data } = await axios.get(`${AUTH_API}/check-auth`, {
        withCredentials: true,
      })
      setIsAuthentication(data.authenticated)
    } catch (error) {
      console.log(error)
      setIsAuthentication(false)
    } finally {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{ register, login, logout, isAuthentication, authLoading, checkAuth }}
    >
      {authLoading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  )
}
