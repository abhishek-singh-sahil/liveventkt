import React, { useEffect, useState, useMemo } from 'react'
import api from '../utils/axios'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  
  // 🔥 UPGRADE 1: Instant Initialization to prevent "Flicker" on page refresh
  const [user, setuser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      return null
    }
  })
  
  const [loading, setloading] = useState(false) 
  const [openAuth, setOpenAuth] = useState(false)
  const [authView, setAuthView] = useState("login") // login | register | otp | forgot-password
  const [authEmail, setAuthEmail] = useState("")

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
      throw error.response?.data || { message: "Login failed. Please check your credentials." }
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
      throw error.response?.data || { message: "Registration failed. Please try again." }
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
      throw error.response?.data || { message: "Invalid verification code." }
    }
  }

  // 🔥 UPDATE PROFILE
  const updateUser = async (updatedData) => {
    try {
      // Note: Make sure this endpoint matches your backend route (e.g. /auth/update-profile)
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
      throw error.response?.data || { message: "Failed to update profile." }
    }
  }

  // ==========================================
  // 🔑 FORGOT PASSWORD (Send OTP) 
  // ==========================================
  const forgotPassword = async (email) => {
    try {
      const { data } = await api.post('/auth/forgot-password', { email })
      return data
    } catch (error) {
      throw error.response?.data || { message: "Failed to send reset email. Verify your address." }
    }
  }

  // ==========================================
  // 🔑 RESET PASSWORD (Verify OTP & Change) 
  // ==========================================
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const { data } = await api.post('/auth/reset-password', { email, otp, newPassword })
      return data
    } catch (error) {
      throw error.response?.data || { message: "Failed to reset password. Code may be expired." }
    }
  }

  // 🚪 LOGOUT
  const logout = () => {
    setuser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // 🔥 UPGRADE 2: Memoize Context values to prevent massive app-wide lag/re-renders
  const contextValue = useMemo(() => ({
    user,
    loading,
    login,
    verifyOtp,
    register,
    logout,
    updateUser,
    forgotPassword,
    resetPassword,
    openAuth,
    setOpenAuth,
    authView,
    setAuthView,
    authEmail,
    setAuthEmail
  }), [user, loading, openAuth, authView, authEmail])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}