"use client"

import { useState } from "react"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Zap,
  Truck,
  User,
  Mail,
  Lock,
  ChevronRight,
} from "lucide-react"

export function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password && selectedRole) {
      login(email, selectedRole)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-ev-blue/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-7 w-7" />
          </div>
          <span className="text-3xl font-bold tracking-tight text-foreground">
            EVision
          </span>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-foreground">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to your EV optimization platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Role Selection */}
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">
                  Select your role
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("fleet")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-sm transition-all ${
                      selectedRole === "fleet"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <Truck className="h-6 w-6" />
                    <span className="font-medium">Fleet Operator</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("individual")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-sm transition-all ${
                      selectedRole === "individual"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <User className="h-6 w-6" />
                    <span className="font-medium">Individual User</span>
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border bg-secondary/50 pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-border bg-secondary/50 pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!email || !password || !selectedRole}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
              >
                Sign In
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Demo: enter any email/password and select a role
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
