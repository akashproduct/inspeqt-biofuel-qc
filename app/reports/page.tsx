"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Download, Search, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const reports = [
  {
    id: "QT-2024-001",
    date: "2024-02-01",
    supplier: "Green Pellets Inc.",
    truckId: "BPT-2024-089",
    gcv: 3850,
    moisture: 8.2,
    fineness: 4.5,
    totalAsh: 6.8,
    status: "pass",
    priceAdjustment: "none",
    qualityFlag: "optimal"
  },
  {
    id: "QT-2024-002",
    date: "2024-02-01",
    supplier: "Bio Energy Solutions",
    truckId: "BPT-2024-090",
    gcv: 3150,
    moisture: 8.5,
    fineness: 5.2,
    totalAsh: 7.2,
    status: "pass",
    priceAdjustment: "fineness",
    qualityFlag: "attention"
  },
  {
    id: "QT-2024-003",
    date: "2024-02-02",
    supplier: "EcoPellet Corp",
    truckId: "BPT-2024-091",
    gcv: 2650,
    moisture: 12.5,
    fineness: 4.8,
    totalAsh: 8.1,
    status: "low",
    priceAdjustment: "gcv-75",
    qualityFlag: "warning"
  },
  {
    id: "QT-2024-004",
    date: "2024-02-02",
    supplier: "Green Pellets Inc.",
    truckId: "BPT-2024-092",
    gcv: 2250,
    moisture: 13.8,
    fineness: 5.5,
    totalAsh: 8.5,
    status: "low",
    priceAdjustment: "gcv-50",
    qualityFlag: "critical"
  },
  {
    id: "QT-2024-005",
    date: "2024-02-03",
    supplier: "Bio Energy Solutions",
    truckId: "BPT-2024-093",
    gcv: 1950,
    moisture: 15.2,
    fineness: 6.2,
    totalAsh: 9.0,
    status: "reject",
    priceAdjustment: "reject",
    qualityFlag: "reject"
  }
]

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/10 dark:to-background">
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-10 max-w-sm"
              />
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card 
              key={report.id}
              className={cn(
                "bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20 transition-all hover:shadow-lg",
                report.qualityFlag === 'reject' ? 'border-l-4 border-l-red-500' :
                report.qualityFlag === 'critical' ? 'border-l-4 border-l-orange-500' :
                report.qualityFlag === 'warning' ? 'border-l-4 border-l-yellow-500' :
                report.qualityFlag === 'attention' ? 'border-l-4 border-l-blue-500' :
                'border-l-4 border-l-green-500'
              )}
            >
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold">{report.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">{report.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {report.qualityFlag === 'reject' && <XCircle className="h-5 w-5 text-red-500" />}
                  {report.qualityFlag === 'critical' && <AlertTriangle className="h-5 w-5 text-orange-500" />}
                  {report.qualityFlag === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                  {report.qualityFlag === 'attention' && <AlertTriangle className="h-5 w-5 text-blue-500" />}
                  {report.qualityFlag === 'optimal' && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">{report.supplier}</p>
                    <p className="text-sm text-muted-foreground">Truck ID: {report.truckId}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      report.gcv < 2000 ? 'bg-red-50 text-red-700' :
                      report.gcv < 2400 ? 'bg-orange-50 text-orange-700' :
                      report.gcv < 2800 ? 'bg-yellow-50 text-yellow-700' :
                      'bg-green-50 text-green-700'
                    )}>
                      <p className="text-xs font-medium">GCV</p>
                      <p className="text-lg font-semibold">{report.gcv}</p>
                      <p className="text-xs">kcal/kg</p>
                    </div>
                    
                    <div className={cn(
                      "p-3 rounded-lg",
                      report.moisture > 14 ? 'bg-red-50 text-red-700' :
                      report.moisture > 12 ? 'bg-orange-50 text-orange-700' :
                      report.moisture > 10 ? 'bg-yellow-50 text-yellow-700' :
                      'bg-green-50 text-green-700'
                    )}>
                      <p className="text-xs font-medium">Moisture</p>
                      <p className="text-lg font-semibold">{report.moisture}%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      report.fineness > 5 ? 'bg-yellow-50 text-yellow-700' :
                      'bg-green-50 text-green-700'
                    )}>
                      <p className="text-xs font-medium">Fineness</p>
                      <p className="text-lg font-semibold">{report.fineness}%</p>
                    </div>
                    
                    <div className={cn(
                      "p-3 rounded-lg",
                      report.totalAsh > 8 ? 'bg-red-50 text-red-700' :
                      report.totalAsh > 7 ? 'bg-yellow-50 text-yellow-700' :
                      'bg-green-50 text-green-700'
                    )}>
                      <p className="text-xs font-medium">Total Ash</p>
                      <p className="text-lg font-semibold">{report.totalAsh}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      report.status === 'pass' ? 'bg-green-100 text-green-700' :
                      report.status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    )}>
                      {report.status.toUpperCase()}
                    </span>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      report.priceAdjustment === 'none' ? 'bg-green-100 text-green-700' :
                      report.priceAdjustment === 'fineness' ? 'bg-blue-100 text-blue-700' :
                      report.priceAdjustment === 'gcv-75' ? 'bg-yellow-100 text-yellow-700' :
                      report.priceAdjustment === 'gcv-50' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    )}>
                      {report.priceAdjustment === 'none' ? 'No Adjustment' :
                       report.priceAdjustment === 'fineness' ? 'Fineness Adj.' :
                       report.priceAdjustment === 'gcv-75' ? '75% Price' :
                       report.priceAdjustment === 'gcv-50' ? '50% Price' :
                       'Rejected'}
                    </span>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 