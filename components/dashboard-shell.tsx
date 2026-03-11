"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { AppSidebar } from "@/components/app-sidebar"
import { FleetDashboard } from "@/components/fleet-dashboard"
import { IndividualDashboard } from "@/components/individual-dashboard"
import { RoutePlannerView } from "@/components/route-planner-view"
import { AnalyticsView } from "@/components/analytics-view"
import { SettingsView } from "@/components/settings-view"
import { FleetMaintenance } from "@/components/fleet-maintenance"
import { IndividualMaintenance } from "@/components/individual-maintenance"
import { Menu, X } from "lucide-react"

export function DashboardShell() {
  const { role } = useAuth()
  const [activeView, setActiveView] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return role === "fleet"
          ? <FleetDashboard />
          : <IndividualDashboard />

      case "routes":
        return <RoutePlannerView />

      case "analytics":
        return <AnalyticsView />

      case "maintenance":
        return role === "fleet"
          ? <FleetMaintenance />
          : <IndividualMaintenance />

      case "settings":
        return <SettingsView />

      default:
        return role === "fleet"
          ? <FleetDashboard />
          : <IndividualDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AppSidebar
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </div>

      {/* Mobile Header */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4 md:hidden">
        <span className="text-lg font-bold text-foreground">EVision</span>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-foreground"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-50 md:hidden">
            <AppSidebar
              activeView={activeView}
              onViewChange={(view) => {
                setActiveView(view)
                setMobileMenuOpen(false)
              }}
            />
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
        <div className="mx-auto max-w-7xl p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}