import React, { useEffect, useState } from 'react'
import api from '../utils/axios'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null)
  const [loading, setloading] = useState(true)
const [openAuth, setOpenAuth] = useState(false)
const [authView, setAuthView] = useState("login") // login | register | otp
const [authEmail, setAuthEmail] = useState("")

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setuser(JSON.parse(storedUser))
    }
    setloading(false)
  }, [])

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })

      if (data.token) {
        const userData = {
          ...data.user,
          token: data.token
        }

        setuser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', data.token)
      }

      return data
    } catch (error) {
      throw error.response?.data || { message: "Login failed" }
    }
  }

  // 📝 REGISTER
  const register = async (name, email, password, phone) => {
    try {
      const { data } = await api.post('/auth/register', {
        name,
        email,
        password,
        phone
      })
      return data
    } catch (error) {
      console.log('Error registering user', error)
    }
  }

  // 🔐 VERIFY OTP
  const verifyOtp = async (email, otp) => {
    try {
      const { data } = await api.post('/auth/verifyOtp', { email, otp })

      if (data.token) {
        const userData = {
          ...data.user,
          token: data.token
        }

        setuser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', data.token)
      }

      return data
    } catch (error) {
      console.log('OTP verification error', error)
      throw error
    }
  }

  // 🔥 NEW: UPDATE PROFILE
  const updateUser = async (updatedData) => {
    try {
      const { data } = await api.put(
        '/auth/update-email',
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      // ✅ Update user globally
      const updatedUser = {
        ...user,
        ...data.user
      }

      setuser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))

      return data

    } catch (error) {
      console.log("Update error", error)
      throw error
    }
  }

  // 🚪 LOGOUT
  const logout = () => {
    setuser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
  value={{
    user,
    loading,
    login,
    verifyOtp,
    register,
    logout,
    updateUser,

    // 🔥 NEW
    openAuth,
    setOpenAuth,
    authView,
    setAuthView,
    authEmail,
    setAuthEmail
  }}
>
      {children}
    </AuthContext.Provider>
  )
}