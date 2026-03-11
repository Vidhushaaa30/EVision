"use client"

import { useState } from "react"
import {
  BatteryCharging,
  Navigation,
  Gauge,
  Clock,
  IndianRupee,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Progress } from "@/components/ui/progress"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"


/* 🇮🇳 INDIAN VEHICLE DATA */
const vehicles = [
  {
    name: "Tesla Model 3 Long Range",
    battery: 78,
    range: 395, // km
    efficiency: "6.7 km/kWh",
    distance: "20,080 km",
    cost: 3480,
    lastCharge: "2h ago",
  },
  {
    name: "Tata Nexon EV",
    battery: 64,
    range: 295,
    efficiency: "6.1 km/kWh",
    distance: "14,360 km",
    cost: 2480,
    lastCharge: "5h ago",
  },
  {
    name: "MG ZS EV",
    battery: 91,
    range: 465,
    efficiency: "7.2 km/kWh",
    distance: "24,500 km",
    cost: 4120,
    lastCharge: "1h ago",
  },
]

const energyHistory = [
  { day: "Mon", usage: 18 },
  { day: "Tue", usage: 24 },
  { day: "Wed", usage: 12 },
  { day: "Thu", usage: 28 },
  { day: "Fri", usage: 22 },
  { day: "Sat", usage: 32 },
  { day: "Sun", usage: 15 },
]

/* 🇮🇳 FORMAT RUPEES */
const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)


export function IndividualDashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState(0)
  const vehicle = vehicles[selectedVehicle]

  return (
    <div className="flex flex-col gap-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          My Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Your personal EV status and trip planning
        </p>
      </div>

      {/* VEHICLE STATUS */}
      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base text-foreground">
            <span className="flex items-center gap-2">
              <BatteryCharging className="h-5 w-5 text-primary" />
              My Vehicles
            </span>

            <Select
              value={String(selectedVehicle)}
              onValueChange={(v) => setSelectedVehicle(Number(v))}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((v, i) => (
                  <SelectItem key={i} value={String(i)}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>

          <CardDescription>{vehicle.name}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">

          {/* BATTERY */}
          <div className="rounded-xl border border-border/50 bg-secondary/30 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Battery Level
              </span>
              <span className="text-2xl font-bold text-ev-green">
                {vehicle.battery}%
              </span>
            </div>

            <Progress value={vehicle.battery} className="mt-3 h-3" />

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>Range: ~{vehicle.range} km</span>
              <span>100%</span>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={Gauge} label="Efficiency" value={vehicle.efficiency} />
            <Stat icon={Navigation} label="Total Distance" value={vehicle.distance} />
            <Stat icon={IndianRupee} label="This Month" value={formatINR(vehicle.cost)} />
            <Stat icon={Clock} label="Last Charge" value={vehicle.lastCharge} />
          </div>
        </CardContent>
      </Card>

      {/* ENERGY CHART */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <CardTitle>Energy Usage History</CardTitle>
          <CardDescription>
            Daily energy consumption this week (kWh)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#10b981"
                  fill="#10b98133"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


/* STAT COMPONENT */
function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-border/50 bg-secondary/20 p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
    </div>
  )
}