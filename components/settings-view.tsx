"use client"

import { useAuth } from "@/lib/auth-context"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function SettingsView() {
  const { email, role } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and notification preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Profile</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input
                defaultValue={email ?? ""}
                className="border-border bg-secondary/50 text-foreground"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Role</Label>
              <Input
                defaultValue={role === "fleet" ? "Fleet Operator" : "Individual User"}
                className="border-border bg-secondary/50 text-foreground"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Display Name</Label>
              <Input
                placeholder="Enter your name"
                className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button className="w-fit bg-primary text-primary-foreground hover:bg-primary/90">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Notifications</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage alert preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-foreground">Low Battery Alerts</span>
                <span className="text-xs text-muted-foreground">
                  Notify when battery drops below 20%
                </span>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border/50" />
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-foreground">Route Optimization</span>
                <span className="text-xs text-muted-foreground">
                  Get notified of better route options
                </span>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border/50" />
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-foreground">Charging Complete</span>
                <span className="text-xs text-muted-foreground">
                  Alert when charging is done
                </span>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border/50" />
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-foreground">Monthly Reports</span>
                <span className="text-xs text-muted-foreground">
                  Email summary of usage and savings
                </span>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
