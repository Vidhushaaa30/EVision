"use client"

import {
  TrendingUp,
  Zap,
  DollarSign,
  BatteryCharging,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const monthlyEnergy = [
  { month: "Aug", total: 480, optimized: 380 },
  { month: "Sep", total: 520, optimized: 400 },
  { month: "Oct", total: 490, optimized: 360 },
  { month: "Nov", total: 560, optimized: 410 },
  { month: "Dec", total: 530, optimized: 380 },
  { month: "Jan", total: 500, optimized: 350 },
]

const costBreakdown = [
  { month: "Aug", charging: 68, savings: 22 },
  { month: "Sep", charging: 72, savings: 28 },
  { month: "Oct", charging: 65, savings: 30 },
  { month: "Nov", charging: 78, savings: 35 },
  { month: "Dec", charging: 70, savings: 38 },
  { month: "Jan", charging: 62, savings: 42 },
]

const efficiencyData = [
  { month: "Aug", efficiency: 3.8 },
  { month: "Sep", efficiency: 3.9 },
  { month: "Oct", efficiency: 4.1 },
  { month: "Nov", efficiency: 4.0 },
  { month: "Dec", efficiency: 4.2 },
  { month: "Jan", efficiency: 4.3 },
]

const tooltipStyle = {
  backgroundColor: "oklch(0.17 0.01 240)",
  border: "1px solid oklch(0.28 0.02 240)",
  borderRadius: "8px",
  color: "oklch(0.95 0.01 240)",
}

const stats = [
  {
    label: "Total Energy Saved",
    value: "1,240 kWh",
    change: "+18% vs last quarter",
    icon: Zap,
  },
  {
    label: "Cost Savings",
    value: "$195.00",
    change: "+24% vs last quarter",
    icon: DollarSign,
  },
  {
    label: "Avg. Efficiency",
    value: "4.2 mi/kWh",
    change: "+0.4 improvement",
    icon: TrendingUp,
  }
]

export function AnalyticsView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Detailed insights into your EV performance and savings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                  <span className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-ev-green">
                    {stat.change}
                  </span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Energy Consumption */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Energy Consumption</CardTitle>
            <CardDescription className="text-muted-foreground">
              Total vs optimized energy usage (kWh)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyEnergy}>
                  <defs>
                    <linearGradient id="analyticsTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.62 0.18 240)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.62 0.18 240)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="analyticsOpt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.72 0.15 175)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.72 0.15 175)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 240)" />
                  <XAxis dataKey="month" stroke="oklch(0.65 0.02 240)" fontSize={12} />
                  <YAxis stroke="oklch(0.65 0.02 240)" fontSize={12} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="oklch(0.62 0.18 240)"
                    fillOpacity={1}
                    fill="url(#analyticsTotal)"
                    name="Total"
                  />
                  <Area
                    type="monotone"
                    dataKey="optimized"
                    stroke="oklch(0.72 0.15 175)"
                    fillOpacity={1}
                    fill="url(#analyticsOpt)"
                    name="Optimized"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Cost Breakdown</CardTitle>
            <CardDescription className="text-muted-foreground">
              Charging costs and savings per month ($)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 240)" />
                  <XAxis dataKey="month" stroke="oklch(0.65 0.02 240)" fontSize={12} />
                  <YAxis stroke="oklch(0.65 0.02 240)" fontSize={12} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="charging"
                    fill="oklch(0.62 0.18 240)"
                    radius={[4, 4, 0, 0]}
                    name="Charging Cost"
                  />
                  <Bar
                    dataKey="savings"
                    fill="oklch(0.72 0.15 175)"
                    radius={[4, 4, 0, 0]}
                    name="Savings"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Trend */}
      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-foreground">Efficiency Trend</CardTitle>
          <CardDescription className="text-muted-foreground">
            Average energy efficiency over time (mi/kWh)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 240)" />
                <XAxis dataKey="month" stroke="oklch(0.65 0.02 240)" fontSize={12} />
                <YAxis stroke="oklch(0.65 0.02 240)" fontSize={12} domain={[3.5, 4.5]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="oklch(0.72 0.15 175)"
                  strokeWidth={2}
                  dot={{ fill: "oklch(0.72 0.15 175)", strokeWidth: 0, r: 4 }}
                  name="Efficiency"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
