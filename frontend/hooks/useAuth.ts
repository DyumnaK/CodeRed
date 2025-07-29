"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  image?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("auth-user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error parsing saved user data:", error)
        localStorage.removeItem("auth-user")
      }
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("auth-user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("auth-user")
    window.location.href = "/auth/signin"
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
}
