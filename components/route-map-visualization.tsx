"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Zap, Navigation } from "lucide-react"

interface RoutePoint {
  x: number
  y: number
  label?: string
  type?: "start" | "end" | "charging" | "waypoint"
}

interface RouteData {
  name: string
  points: RoutePoint[]
  color: string
  isBest?: boolean
  distance: string
  time: string
  cost: string
  batteryImpact: string
  chargingStops: number
}

function generateRoutePoints(
  startLabel: string,
  endLabel: string,
  seed: number,
  variant: number
): RoutePoint[] {
  const startX = 40
  const startY = 220 + variant * 15
  const endX = 560
  const endY = 60 + variant * 20

  const points: RoutePoint[] = [
    { x: startX, y: startY, label: startLabel, type: "start" },
  ]

  const numMidPoints = 3 + (seed % 2)
  for (let i = 1; i <= numMidPoints; i++) {
    const t = i / (numMidPoints + 1)
    const baseX = startX + (endX - startX) * t
    const baseY = startY + (endY - startY) * t
    const offsetX = Math.sin(seed * i * 0.7 + variant * 2) * 40
    const offsetY = Math.cos(seed * i * 0.5 + variant * 1.5) * 30

    const isCharging = i === Math.floor(numMidPoints / 2) && variant === 0
    points.push({
      x: baseX + offsetX,
      y: baseY + offsetY,
      type: isCharging ? "charging" : "waypoint",
    })
  }

  points.push({ x: endX, y: endY, label: endLabel, type: "end" })
  return points
}

function buildSmoothPath(points: RoutePoint[]): string {
  if (points.length < 2) return ""
  let d = `M ${points[0].x} ${points[0].y}`

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4
    const cpy1 = prev.y
    const cpx2 = prev.x + (curr.x - prev.x) * 0.6
    const cpy2 = curr.y
    d += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${curr.x} ${curr.y}`
  }

  return d
}

export function RouteMapVisualization({
  routes,
  selectedRoute,
  onSelectRoute,
  isAnimating,
}: {
  routes: RouteData[]
  selectedRoute: number | null
  onSelectRoute: (index: number) => void
  isAnimating: boolean
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [animProgress, setAnimProgress] = useState(0)

  useEffect(() => {
    if (!isAnimating) {
      setAnimProgress(1)
      return
    }
    setAnimProgress(0)
    let start: number | null = null
    const duration = 1200

    function step(timestamp: number) {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      setAnimProgress(progress)
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isAnimating])

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/10">
      <svg
        ref={svgRef}
        viewBox="0 0 600 280"
        className="h-full w-full"
        style={{ minHeight: "220px" }}
      >
        {/* Grid pattern */}
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="oklch(0.25 0.02 240)"
              strokeWidth="0.5"
            />
          </pattern>
          {routes.map((route, i) => (
            <linearGradient
              key={`grad-${i}`}
              id={`routeGrad-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={route.color} stopOpacity={0.9} />
              <stop offset="100%" stopColor={route.color} stopOpacity={0.6} />
            </linearGradient>
          ))}
        </defs>
        <rect width="600" height="280" fill="url(#grid)" />

        {/* Render all route paths */}
        {routes.map((route, i) => {
          const pathD = buildSmoothPath(route.points)
          const isSelected = selectedRoute === i
          const isBest = route.isBest
          const dimmed = selectedRoute !== null && !isSelected

          return (
            <g
              key={i}
              onClick={() => onSelectRoute(i)}
              className="cursor-pointer"
              opacity={dimmed ? 0.25 : 1}
              style={{ transition: "opacity 0.3s ease" }}
            >
              {/* Glow for best/selected */}
              {(isBest || isSelected) && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={route.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity={0.2}
                  strokeDasharray={isAnimating ? "1200" : "none"}
                  strokeDashoffset={isAnimating ? 1200 * (1 - animProgress) : 0}
                />
              )}

              {/* Main path */}
              <path
                d={pathD}
                fill="none"
                stroke={`url(#routeGrad-${i})`}
                strokeWidth={isSelected || isBest ? 3.5 : 2}
                strokeLinecap="round"
                strokeDasharray={isAnimating ? "1200" : isBest ? "none" : "8 4"}
                strokeDashoffset={isAnimating ? 1200 * (1 - animProgress) : 0}
                style={{ transition: "stroke-width 0.3s ease" }}
              />

              {/* Points */}
              {animProgress >= 1 &&
                route.points.map((pt, pi) => {
                  if (pt.type === "start" || pt.type === "end") {
                    return (
                      <g key={pi}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={pt.type === "start" ? 8 : 8}
                          fill={
                            pt.type === "start"
                              ? "oklch(0.72 0.15 175)"
                              : "oklch(0.62 0.18 240)"
                          }
                          opacity={0.2}
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={5}
                          fill={
                            pt.type === "start"
                              ? "oklch(0.72 0.15 175)"
                              : "oklch(0.62 0.18 240)"
                          }
                          stroke="oklch(0.13 0.01 240)"
                          strokeWidth="2"
                        />
                        {pt.label && (
                          <text
                            x={pt.x}
                            y={pt.type === "start" ? pt.y + 20 : pt.y - 14}
                            textAnchor="middle"
                            fill="oklch(0.88 0.01 240)"
                            fontSize="11"
                            fontWeight="600"
                            fontFamily="var(--font-sans)"
                          >
                            {pt.label}
                          </text>
                        )}
                      </g>
                    )
                  }
                  if (pt.type === "charging") {
                    return (
                      <g key={pi}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={6}
                          fill="oklch(0.78 0.14 85)"
                          stroke="oklch(0.13 0.01 240)"
                          strokeWidth="2"
                        />
                        <text
                          x={pt.x}
                          y={pt.y + 4}
                          textAnchor="middle"
                          fill="oklch(0.13 0.01 240)"
                          fontSize="8"
                          fontWeight="bold"
                        >
                          {"⚡"}
                        </text>
                      </g>
                    )
                  }
                  return null
                })}
            </g>
          )
        })}

        {/* Legend */}
        {animProgress >= 1 && (
          <g>
            <circle cx="20" cy="12" r="4" fill="oklch(0.72 0.15 175)" />
            <text x="28" y="16" fill="oklch(0.65 0.02 240)" fontSize="9">
              Start
            </text>
            <circle cx="70" cy="12" r="4" fill="oklch(0.62 0.18 240)" />
            <text x="78" y="16" fill="oklch(0.65 0.02 240)" fontSize="9">
              End
            </text>
            <circle cx="110" cy="12" r="4" fill="oklch(0.78 0.14 85)" />
            <text x="118" y="16" fill="oklch(0.65 0.02 240)" fontSize="9">
              Charging
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}

export function generateRoutesForTrip(
  from: string,
  to: string
): RouteData[] {
  const seed1 = from.length + to.length
  const seed2 = from.charCodeAt(0) || 65
  const seed3 = to.charCodeAt(0) || 90

  const baseDist = 15 + ((seed1 * seed2) % 40)

  return [
    {
      name: "Fastest Route",
      points: generateRoutePoints(from, to, seed1, 0),
      color: "oklch(0.72 0.15 175)",
      isBest: true,
      distance: `${baseDist.toFixed(1)} mi`,
      time: `${Math.round(baseDist * 1.3)} min`,
      cost: `$${(baseDist * 0.1).toFixed(2)}`,
      batteryImpact: `-${Math.round(baseDist * 0.38)}%`,
      chargingStops: 0,
    },
    {
      name: "Most Economical",
      points: generateRoutePoints(from, to, seed2, 1),
      color: "oklch(0.62 0.18 200)",
      isBest: false,
      distance: `${(baseDist * 1.15).toFixed(1)} mi`,
      time: `${Math.round(baseDist * 1.6)} min`,
      cost: `$${(baseDist * 0.07).toFixed(2)}`,
      batteryImpact: `-${Math.round(baseDist * 0.30)}%`,
      chargingStops: 0,
    },
    {
      name: "Scenic / Alternate",
      points: generateRoutePoints(from, to, seed3, 2),
      color: "oklch(0.68 0.12 290)",
      isBest: false,
      distance: `${(baseDist * 1.3).toFixed(1)} mi`,
      time: `${Math.round(baseDist * 1.9)} min`,
      cost: `$${(baseDist * 0.12).toFixed(2)}`,
      batteryImpact: `-${Math.round(baseDist * 0.45)}%`,
      chargingStops: baseDist > 30 ? 1 : 0,
    },
  ]
}
