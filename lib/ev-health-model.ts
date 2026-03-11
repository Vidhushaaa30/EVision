export function predictEVHealth(vehicle: any) {
  let score = 0

  if (vehicle.battery < 40) score += 25
  if (vehicle.battery < 25) score += 20

  if (vehicle.fastChargesPerWeek > 3) score += 15
  if (vehicle.effDropPercent > 10) score += 20
  if (vehicle.kmSinceService > 8000) score += 20
  if (vehicle.highTempUsage) score += 10

  if (score >= 60)
    return { status: "Service Needed", color: "red", score }

  if (score >= 30)
    return { status: "Monitor", color: "yellow", score }

  return { status: "Healthy", color: "green", score }
}