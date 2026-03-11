"use client"

import { AuthProvider, useAuth } from "@/lib/auth-context"
import { LoginPage } from "@/components/login-page"
import { DashboardShell } from "@/components/dashboard-shell"

function AppContent() {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <DashboardShell /> : <LoginPage />
}

export default function Page() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
