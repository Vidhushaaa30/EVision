"use client"

import { useState } from "react"
import { Zap, MapPin } from "lucide-react"

import {
  Card, CardContent, CardHeader,
  CardTitle, CardDescription
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table"

import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select"

const vehicles = [
  {
    id:"EV-001",
    model:"Tesla Model 3",
    battery:85,
    route:"Tambaram",
    status:"active",
    driver:"Ram",
    lastCharge:"Today 10:30 AM",
    location:"12.9249, 80.1000"
  },
  {
    id:"EV-002",
    model:"Rivian R1T",
    battery:42,
    route:"Arcot Road",
    status:"charging",
    driver:"Gopal",
    lastCharge:"Today 1:10 PM",
    location:"13.0604, 80.2110"
  },
  {
    id:"EV-003",
    model:"Ford F-150 LTN",
    battery:91,
    route:"Kilambakkam",
    status:"active",
    driver:"William",
    lastCharge:"Today 7:45 AM",
    location:"12.8390, 80.0605"
  },
  {
    id:"EV-004",
    model:"Chevy Bolt",
    battery:28,
    route:"Porur",
    status:"low battery",
    driver:"Kumar",
    lastCharge:"Yesterday 6:20 PM",
    location:"13.0382, 80.1565"
  },
  {
    id:"EV-005",
    model:"Tesla Model Y",
    battery:67,
    route:"Mylapore",
    status:"active",
    driver:"Karthick",
    lastCharge:"Yesterday 9:45 PM",
    location:"13.0321, 80.2682"
  },
  {
    id:"EV-006",
    model:"BMW iX",
    battery:54,
    route:"West Tambaram",
    status:"active",
    driver:"Krish",
    lastCharge:"Today 11:10 AM",
    location:"12.9253, 80.1180"
  },
]

function badge(status:string){
  if(status==="active") return <Badge className="bg-ev-green/15 text-ev-green border-ev-green/30">Active</Badge>
  if(status==="charging") return <Badge className="bg-ev-blue/15 text-ev-blue border-ev-blue/30">Charging</Badge>
  if(status==="low battery") return <Badge className="bg-destructive/15 text-destructive border-destructive/30">Low Battery</Badge>
  return <Badge>{status}</Badge>
}

function aiMessage(v:any){
  if(v.battery < 25) return "Critical battery level detected. Immediate charging recommended."
  if(v.battery < 40) return "Battery below optimal range. Assign short routes or schedule charging."
  if(v.status==="charging") return "Vehicle charging. Dispatch after reaching optimal charge."
  if(v.battery > 85) return "High charge available. Suitable for long-distance assignments."
  return "Vehicle operating efficiently. Route optimization active."
}

export function FleetDashboard(){

  const [selectedVehicle,setSelectedVehicle] = useState(vehicles[0])

  return(
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold">Fleet Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Real-time overview of your electric vehicle fleet
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* TABLE */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Vehicle Fleet</CardTitle>
            <CardDescription>Click or select a vehicle</CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Battery</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {vehicles.map(v=>(
                  <TableRow
                    key={v.id}
                    onClick={()=>setSelectedVehicle(v)}
                    className="cursor-pointer hover:bg-secondary/40"
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{v.model}</span>
                        <span className="text-xs text-muted-foreground">{v.id}</span>
                      </div>
                    </TableCell>

                    <TableCell>{v.driver}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={v.battery} className="w-16 h-2"/>
                        <span>{v.battery}%</span>
                      </div>
                    </TableCell>

                    <TableCell className="flex items-center gap-1">
                      <MapPin className="h-3 w-3"/>
                      {v.route}
                    </TableCell>

                    <TableCell>{badge(v.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* INSIGHTS */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Insights</CardTitle>
            <CardDescription>Select vehicle health</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">

            {/* DROPDOWN */}
            <Select
              value={selectedVehicle.id}
              onValueChange={(id)=>{
                const v=vehicles.find(x=>x.id===id)
                if(v) setSelectedVehicle(v)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose vehicle"/>
              </SelectTrigger>

              <SelectContent>
                {vehicles.map(v=>(
                  <SelectItem key={v.id} value={v.id}>
                    {v.model} — {v.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* DETAILS */}
            <p><b>Vehicle:</b> {selectedVehicle.model}</p>
            <p><b>Driver:</b> {selectedVehicle.driver}</p>
            <p><b>Route:</b> {selectedVehicle.route}</p>
            <p><b>Last Charge:</b> {selectedVehicle.lastCharge}</p>

            <a
              href={`https://www.google.com/maps?q=${selectedVehicle.location}`}
              target="_blank"
              className="text-primary text-sm underline"
            >
              View current GPS location
            </a>

            <div>
              <div className="flex justify-between text-sm">
                <span>Battery</span>
                <span>{selectedVehicle.battery}%</span>
              </div>
              <Progress value={selectedVehicle.battery} className="mt-2"/>
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
              <div className="flex gap-2 text-primary">
                <Zap className="h-4 w-4"/>
                <span className="font-medium text-sm">AI Recommendation</span>
              </div>
              <p className="text-xs mt-1 text-muted-foreground">
                {aiMessage(selectedVehicle)}
              </p>
            </div>

          </CardContent>
        </Card>

      </div>

    </div>
  )
}