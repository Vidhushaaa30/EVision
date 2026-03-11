"use client"

import { AlertTriangle, Wrench, CheckCircle2, BatteryCharging } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { predictEVHealth } from "@/lib/ev-health-model"

const fleetVehicles = [
  {
    id: "EV-001",
    model: "Tesla Model 3",
    battery: 85,
    fastChargesPerWeek: 1,
    effDropPercent: 2,
    kmSinceService: 4000,
    highTempUsage: false,
  },
  {
    id: "EV-002",
    model: "Rivian R1T",
    battery: 42,
    fastChargesPerWeek: 5,
    effDropPercent: 6,
    kmSinceService: 6000,
    highTempUsage: true,
  },
  {
    id: "EV-004",
    model: "Chevy Bolt",
    battery: 28,
    fastChargesPerWeek: 4,
    effDropPercent: 18,
    kmSinceService: 10000,
    highTempUsage: true,
  },
  {
    id: "EV-006",
    model: "BMW iX",
    battery: 54,
    fastChargesPerWeek: 2,
    effDropPercent: 12,
    kmSinceService: 8500,
    highTempUsage: false,
  },
]

function getBadge(status: string) {
  if (status === "Healthy")
    return <Badge className="bg-ev-green/15 text-ev-green border-ev-green/30">Healthy</Badge>

  if (status === "Monitor")
    return <Badge className="bg-yellow-400/15 text-yellow-400 border-yellow-400/30">Monitor</Badge>

  return <Badge className="bg-destructive/15 text-destructive border-destructive/30">Service Needed</Badge>
}

function getIcon(status: string) {
  if (status === "Healthy") return <CheckCircle2 className="h-4 w-4 text-ev-green" />
  if (status === "Monitor") return <AlertTriangle className="h-4 w-4 text-yellow-400" />
  return <Wrench className="h-4 w-4 text-destructive" />
}

function getRecommendation(status: string) {
  if (status === "Healthy") return "Vehicle operating normally. Next inspection as scheduled."
  if (status === "Monitor") return "Recommend battery cooling check & diagnostics scan."
  return "Immediate service recommended. Potential battery degradation detected."
}

export function FleetMaintenance() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="text-base text-foreground">
          Predictive Fleet Maintenance
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          AI-detected service risks across all vehicles
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {fleetVehicles.map((v) => {
          const result = predictEVHealth(v)

          return (
            <div
              key={v.id}
              className="flex items-start justify-between rounded-lg border border-border/50 bg-secondary/30 p-3"
            >
              <div className="flex gap-3">
                {getIcon(result.status)}

                <div>
                  <p className="text-sm font-medium text-foreground">
                    {v.model} — {v.id}
                  </p>

                  <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <BatteryCharging className="h-3 w-3" />
                    Battery: {v.battery}%
                  </p>

                  <p className="text-xs mt-1 text-muted-foreground">
                    AI Risk Score: {result.score}
                  </p>

                  <p className="text-xs mt-1 text-primary">
                    {getRecommendation(result.status)}
                  </p>
                </div>
              </div>

              {getBadge(result.status)}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}