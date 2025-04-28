import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const USER_API = import.meta.env.VITE_USER_API

  const [userData, setUserData] = useState([])

  const userUpdate = async (updateData) => {
    try {
      const { data } = await axios.post(`${USER_API}/update-user`, updateData, {
        withCredentials: true,
      })
      getAllUsers()
      toast.success(data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const userFollow = async (id) => {
    try {
      const { data } = await axios.put(
        `${USER_API}/following/${id}`,
        {}, // Empty object as body
        { withCredentials: true } // This should be the third parameter for config
      )
      getAllUsers() // Refresh user data after following/unfollowing
      toast.success(data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${USER_API}/get-all-users`, {
        withCredentials: true,
      })
      setUserData(data)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAllUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider value={{ userUpdate, userFollow, getAllUsers, userData }}>
      {children}
    </UserContext.Provider>
  )
}
