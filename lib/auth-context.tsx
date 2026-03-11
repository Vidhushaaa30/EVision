"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "fleet" | "individual"

interface AuthState {
  isLoggedIn: boolean
  role: UserRole | null
  email: string | null
}

interface AuthContextType extends AuthState {
  login: (email: string, role: UserRole) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    role: null,
    email: null,
  })

  const login = (email: string, role: UserRole) => {
    setAuth({ isLoggedIn: true, role, email })
  }

  const logout = () => {
    setAuth({ isLoggedIn: false, role: null, email: null })
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
