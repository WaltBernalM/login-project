import React, { createContext, useEffect, useState } from "react"
import { authService } from "../services/auth.service"

const AuthContext = createContext()

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const logout = async () => {
    try {
      setIsLoading(true)
      await authService.logout()
    } catch (error) {
      console.error('logout error:', error)
    } finally {
      setIsLoggedIn(false)
      setIsLoading(false)
      setUser(null)
    }
  }

  const login = async (userData) => {
    try {
      setIsLoading(true)
      const res = await authService.login(userData)
      const userLogged = res.data
      setUser(userLogged)
      setIsLoggedIn(true)
      setAttempts(0)
      return userLogged
    } catch (error) {
      setUser(null)
      setIsLoggedIn(false)
      setAttempts(prev => prev + 1)
    } finally {
      setIsLoading(false)
    }
  }

  const verify = async () => {
    try {
      setIsLoading(true)
      const res = await authService.verify()
      const userLogged = res.data
      setUser(userLogged)
      setIsLoggedIn(true)
      setAttempts(0)
      return userLogged
    } catch (error) {
      setUser(null)
      setIsLoggedIn(false)
      setAttempts(0)
    } finally {
      setIsLoading(false)
    }
    
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        attempts,
        login,
        logout,
        verify
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }