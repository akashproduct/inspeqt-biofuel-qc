"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Filter, Download, AlertTriangle, FileText, Search } from "lucide-react"

const mockReports = [
  {
    id: "QT-2024-001",
    date: "2024-02-15",
    supplier: "Green Pellets Inc.",
    truckId: "GPI-T-001",
    parameters: {
      gcv: 4250,
      moisture: 8.2,
      fineness: 3.5,
      totalAsh: 6.8
    },
    status: "pass"
  },
  {
    id: "QT-2024-002",
    date: "2024-02-15",
    supplier: "Bio Energy Solutions",
    truckId: "BES-T-045",
    parameters: {
      gcv: 2750,
      moisture: 9.1,
      fineness: 5.2,
      totalAsh: 7.2
    },
    status: "fail"
  },
  {
    id: "QT-2024-003",
    date: "2024-02-14",
    supplier: "Green Pellets Inc.",
    truckId: "GPI-T-002",
    parameters: {
      gcv: 4150,
      moisture: 8.5,
      fineness: 3.8,
      totalAsh: 6.5
    },
    status: "pass"
  },
  {
    id: "QT-2024-004",
    date: "2024-02-14",
    supplier: "Bio Energy Solutions",
    truckId: "BES-T-046",
    parameters: {
      gcv: 3950,
      moisture: 8.8,
      fineness: 4.2,
      totalAsh: 6.9
    },
    status: "pass"
  },
  {
    id: "QT-2024-005",
    date: "2024-02-13",
    supplier: "Green Pellets Inc.",
    truckId: "GPI-T-003",
    parameters: {
      gcv: 2650,
      moisture: 9.5,
      fineness: 5.8,
      totalAsh: 7.5
    },
    status: "fail"
  }
]

function calculatePrice(report: typeof mockReports[0]) {
  const qualityFactor = report.parameters.gcv / 4000 // Normalize against base GCV of 4000
  const moisturePenalty = report.parameters.moisture > 8.5 ? 0.95 : 1 // 5% penalty for high moisture
  const ashPenalty = report.parameters.totalAsh > 4 ? 0.95 : 1 // 5% penalty for high ash content
  
  const pricePerTon = report.parameters.gcv / 1000 // Price per kg
  return {
    pricePerTon: Math.round(pricePerTon),
    totalPrice: Math.round(pricePerTon * 1000) // Price per ton
  }
}

export default function ReportsPage() {
  const [date, setDate] = useState<Date>()
  const [supplierFilter, setSupplierFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredReports = mockReports.filter(report => {
    const matchesSupplier = supplierFilter === "all" || report.supplier.includes(supplierFilter)
    const matchesStatus = statusFilter === "all" || report.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSupplier && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900/10 dark:to-background">
      <div className="container py-8 px-4 mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Quality Reports</h1>
          <p className="text-muted-foreground">
            View and manage quality test reports for all deliveries.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8 max-w-sm"
              />
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => {
            const pricing = calculatePrice(report)
            return (
              <Card key={report.id} className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    {report.id}
                    {(report.parameters.gcv < 2800 || report.parameters.fineness > 5) && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-purple-700 hover:text-purple-800 hover:bg-purple-100">
                    View Details
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-medium">{report.date}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Truck ID</p>
                        <p className="font-medium">{report.truckId}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Supplier</p>
                        <p className="font-medium">{report.supplier}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Quality Parameters</div>
                      <div className="grid grid-cols-2 gap-2 p-2 bg-purple-50/50 rounded-lg text-sm">
                        <div>
                          <p className="text-muted-foreground">GCV</p>
                          <p className={`font-medium ${report.parameters.gcv < 2800 ? 'text-red-600' : ''}`}>
                            {report.parameters.gcv} kcal/kg
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Moisture</p>
                          <p className="font-medium">{report.parameters.moisture}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Fineness</p>
                          <p className={`font-medium ${report.parameters.fineness > 5 ? 'text-red-600' : ''}`}>
                            {report.parameters.fineness}%
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Ash</p>
                          <p className="font-medium">{report.parameters.totalAsh}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-purple-100">
                      <div className="flex items-center">
                        <span className={`inline-block h-2 w-2 rounded-full mr-2 ${
                          report.status === 'pass' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className={`text-sm font-medium ${
                          report.status === 'pass' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {report.status === 'pass' ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
} 