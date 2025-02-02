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
import { Calendar as CalendarIcon, Filter, Download } from "lucide-react"

const reports = [
  {
    id: 1,
    date: "2024-02-02",
    supplier: "Green Pellets Inc.",
    truckId: "BPT-2024-089",
    metrics: {
      gcv: 4250,
      moisture: 8.2,
      ash: 3.5,
      volatileMatter: 75.3,
      fixedCarbon: 13.0
    },
    status: "Approved",
    basePrice: 5500, // Price per ton
    quantity: 25 // tons
  },
  {
    id: 2,
    date: "2024-02-01",
    supplier: "Bio Energy Solutions",
    truckId: "BPT-2024-088",
    metrics: {
      gcv: 4200,
      moisture: 8.4,
      ash: 3.7,
      volatileMatter: 74.8,
      fixedCarbon: 13.1
    },
    status: "Pending",
    basePrice: 5450,
    quantity: 28
  },
  // Add more reports...
]

function calculatePrice(report: typeof reports[0]) {
  const qualityFactor = report.metrics.gcv / 4000 // Normalize against base GCV of 4000
  const moisturePenalty = report.metrics.moisture > 8.5 ? 0.95 : 1 // 5% penalty for high moisture
  const ashPenalty = report.metrics.ash > 4 ? 0.95 : 1 // 5% penalty for high ash content
  
  const pricePerTon = report.basePrice * qualityFactor * moisturePenalty * ashPenalty
  return {
    pricePerTon: Math.round(pricePerTon),
    totalPrice: Math.round(pricePerTon * report.quantity)
  }
}

export default function ReportsPage() {
  const [date, setDate] = useState<Date>()
  const [supplierFilter, setSupplierFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredReports = reports.filter(report => {
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
            View and analyze quality test reports for all deliveries.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] pl-3 text-left font-normal">
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={supplierFilter} onValueChange={setSupplierFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suppliers</SelectItem>
              <SelectItem value="Green Pellets Inc.">Green Pellets Inc.</SelectItem>
              <SelectItem value="Bio Energy Solutions">Bio Energy Solutions</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredReports.map((report) => {
            const pricing = calculatePrice(report)
            return (
              <Card key={report.id} className="bg-white/50 backdrop-blur-sm border-green-100 dark:border-green-900/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">Report #{report.id}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{report.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        report.status === "Approved" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-100">
                    View Details
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Supplier Info */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{report.supplier}</p>
                        <p className="text-sm text-muted-foreground">Truck ID: {report.truckId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{report.quantity} tons</p>
                      </div>
                    </div>

                    {/* Quality Metrics */}
                    <div className="grid grid-cols-5 gap-4 p-4 bg-green-50/50 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">GCV</p>
                        <p className="font-semibold">{report.metrics.gcv}</p>
                      </div>
                      <div className="text-center border-l border-green-100">
                        <p className="text-sm text-muted-foreground">Moisture</p>
                        <p className="font-semibold">{report.metrics.moisture}%</p>
                      </div>
                      <div className="text-center border-l border-green-100">
                        <p className="text-sm text-muted-foreground">Ash</p>
                        <p className="font-semibold">{report.metrics.ash}%</p>
                      </div>
                      <div className="text-center border-l border-green-100">
                        <p className="text-sm text-muted-foreground">VM</p>
                        <p className="font-semibold">{report.metrics.volatileMatter}%</p>
                      </div>
                      <div className="text-center border-l border-green-100">
                        <p className="text-sm text-muted-foreground">FC</p>
                        <p className="font-semibold">{report.metrics.fixedCarbon}%</p>
                      </div>
                    </div>

                    {/* Price Calculation */}
                    <div className="p-4 bg-green-100/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">Base Price</p>
                        <p className="font-semibold">₹{report.basePrice}/ton</p>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">Quality Adjusted Price</p>
                        <p className="font-semibold">₹{pricing.pricePerTon}/ton</p>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-green-200">
                        <p className="text-sm font-medium">Total Amount</p>
                        <p className="text-lg font-bold text-green-700">₹{pricing.totalPrice}</p>
                      </div>
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