"use client"

import { useState } from "react"
import { MapPin, CheckCircle2, AlertTriangle, Navigation } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  RouteMapVisualization,
  generateRoutesForTrip,
} from "@/components/route-map-visualization"

const savedRoutes = [
  { name: "Ramapuram → Tambaram", distance: "29 km", time: "25 min", cost: "₹110", battery: "-8%" },
  { name: "Porur → Panimalar College", distance: "10 km", time: "14 min", cost: "₹40", battery: "-3%" },
  { name: "Nungambakkam → Kilambakkam", distance: "71 km", time: "55 min", cost: "₹260", battery: "-18%" },
]

function RiskBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col gap-1 text-[11px]">
      <div className="flex justify-between">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 w-full rounded bg-muted overflow-hidden">
        <div className="h-full rounded" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  )
}

export function RoutePlannerView() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [routes, setRoutes] = useState<any[] | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null)
  const [rerouteInfo, setRerouteInfo] = useState<null | { from: string; to: string }>(null)

  function scoreRoutes(generated: any[]) {
    return generated.map((r, i) => {
      const pothole = Math.floor(Math.random() * 70) + 10
      const accident = Math.floor(Math.random() * 60) + 10
      const roadwork = Math.floor(Math.random() * 50) + 5
      const avg = Math.round((pothole + accident + roadwork) / 3)

      return {
        ...r,
        pothole,
        accident,
        roadwork,
        score: 100 - avg,
        cost: `₹${Math.round(parseFloat(r.cost.replace(/[^0-9.]/g, "")) * 83)}`,
      }
    })
  }

  function handleOptimize() {
    if (!from || !to) return
    const generated = generateRoutesForTrip(from, to)
    setRoutes(scoreRoutes(generated))
    setSelectedRoute(0)
    setRerouteInfo(null)
  }

  function reroute() {
    if (!to) return

    const current = "Current GPS Location"
    const generated = generateRoutesForTrip(current, to)

    setRoutes(scoreRoutes(generated))
    setSelectedRoute(0)

    // 🔥 shows banner
    setRerouteInfo({ from: current, to })
  }

  function reportIssue(route: string) {
    const issue = prompt("Report issue: pothole / accident / flood / roadwork")
    if (!issue) return

    const data = JSON.parse(localStorage.getItem("reports") || "[]")
    data.push({ route, issue, time: new Date() })
    localStorage.setItem("reports", JSON.stringify(data))

    alert("Report stored ✔ AI will learn from this.")
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">

      {/* LEFT PANEL */}
      <div className="lg:col-span-3 flex flex-col gap-4">

        <Card>
          <CardHeader>
            <CardTitle>Plan Route</CardTitle>
            <CardDescription>AI optimized EV routing</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
              <Input placeholder="From" value={from} onChange={e=>setFrom(e.target.value)} />
              <Input placeholder="To" value={to} onChange={e=>setTo(e.target.value)} />
              <Button onClick={handleOptimize}>Optimize</Button>
            </div>

            {routes ? (
              <RouteMapVisualization
                routes={routes}
                selectedRoute={selectedRoute}
                onSelectRoute={setSelectedRoute}
                isAnimating={false}
              />
            ) : (
              <div className="flex h-56 items-center justify-center border rounded">
                <MapPin className="opacity-40"/>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 🔥 REROUTE STATUS BANNER */}
        {rerouteInfo && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300">
            <b>Re-routing completed.</b><br/>
            From: {rerouteInfo.from} → To: {rerouteInfo.to}
          </div>
        )}

        {/* ROUTES */}
        {routes && (
          <div className="grid gap-3 sm:grid-cols-3">
            {routes.map((r,i)=>(
              <div
                key={i}
                onClick={()=>setSelectedRoute(i)}
                className={`cursor-pointer rounded-xl border p-4 ${
                  selectedRoute===i?"border-primary bg-primary/10":""
                }`}
              >
                <div className="flex justify-between">
                  <b>{r.name}</b>
                  <Badge>{r.score}/100</Badge>
                </div>

                <div className="text-xs mt-2 space-y-1">
                  <div>⏱ {r.time}</div>
                  <div>💰 {r.cost}</div>
                  <div>🔋 {r.batteryImpact}</div>
                </div>

                <div className="mt-3 space-y-2">
                  <RiskBar label="Pothole Risk" value={r.pothole} color="#f97316"/>
                  <RiskBar label="Accident Risk" value={r.accident} color="#ef4444"/>
                  <RiskBar label="Roadwork Risk" value={r.roadwork} color="#eab308"/>
                </div>

                {selectedRoute===i && (
                  <div className="text-xs mt-2 text-primary flex gap-1 items-center">
                    <CheckCircle2 className="h-3 w-3"/> Selected
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* REROUTE BOX */}
        {routes && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-red-400">
              <AlertTriangle className="h-4 w-4"/>
              Facing an emergency on this route?
            </div>
            <Button onClick={reroute}>
              <Navigation className="mr-2 h-4 w-4"/> Reroute
            </Button>
          </div>
        )}

      </div>

      {/* RIGHT PANEL */}
      <Card className="lg:col-span-2 h-fit">
        <CardHeader>
          <CardTitle>Saved Routes</CardTitle>
          <CardDescription>Frequent trips</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {savedRoutes.map(r=>(
            <div key={r.name} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <b>{r.name}</b>
                <Badge>Optimized</Badge>
              </div>

              <div className="mt-2 grid grid-cols-2 text-xs gap-2 text-muted-foreground">
                <span>⏱ {r.time}</span>
                <span>💰 {r.cost}</span>
                <span>📍 {r.distance}</span>
                <span>🔋 {r.battery}</span>
              </div>

              <button
                onClick={()=>reportIssue(r.name)}
                className="text-xs mt-2 text-red-400 underline"
              >
                Report Issue
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  )
}