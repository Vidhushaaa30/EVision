"use client"

import { CheckCircle2, AlertTriangle, Wrench, BatteryCharging } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { predictEVHealth } from "@/lib/ev-health-model"

const myVehicles = [
  {
    model: "Tesla Model Y",
    battery: 67,
    fastChargesPerWeek: 1,
    effDropPercent: 2,
    kmSinceService: 3200,
    highTempUsage: false,
  },
  {
    model: "MG ZS EV",
    battery: 54,
    fastChargesPerWeek: 3,
    effDropPercent: 8,
    kmSinceService: 7500,
    highTempUsage: true,
  },
  {
    model: "Tata Nexon EV",
    battery: 41,
    fastChargesPerWeek: 4,
    effDropPercent: 12,
    kmSinceService: 9800,
    highTempUsage: true,
  },
]

function badge(status: string) {
  if (status === "Healthy")
    return <Badge className="bg-ev-green/15 text-ev-green border-ev-green/30">Healthy</Badge>
  if (status === "Monitor")
    return <Badge className="bg-yellow-400/15 text-yellow-400 border-yellow-400/30">Monitor</Badge>
  return <Badge className="bg-destructive/15 text-destructive border-destructive/30">Service Needed</Badge>
}

function icon(status: string) {
  if (status === "Healthy") return <CheckCircle2 className="h-4 w-4 text-ev-green" />
  if (status === "Monitor") return <AlertTriangle className="h-4 w-4 text-yellow-400" />
  return <Wrench className="h-4 w-4 text-destructive" />
}

export function IndividualMaintenance() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle>Your EV Health Report</CardTitle>
        <CardDescription>AI analysis of your vehicle performance</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {myVehicles.map((v, i) => {
          const result = predictEVHealth(v)

          return (
            <div
              key={i}
              className="flex items-start justify-between rounded-lg border border-border/50 bg-secondary/30 p-4"
            >
              <div className="flex gap-3">
                {icon(result.status)}

                <div>
                  <p className="text-sm font-medium text-foreground">
                    {v.model}
                  </p>

                  <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <BatteryCharging className="h-3 w-3" />
                    Battery: {v.battery}%
                  </p>

                  <p className="text-xs mt-1 text-muted-foreground">
                    AI Health Score: {result.score}/100
                  </p>

                  <p className="text-xs mt-1 text-primary">
                    {result.status === "Healthy"
                      ? "Your EV is performing optimally. No service needed."
                      : result.status === "Monitor"
                      ? "Performance changes detected. Consider a diagnostic check."
                      : "Service recommended soon to prevent battery degradation."}
                  </p>
                </div>
              </div>

              {badge(result.status)}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}