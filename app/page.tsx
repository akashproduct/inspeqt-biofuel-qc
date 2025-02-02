"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Flame, Droplets, Users, MapPin, Bell, Plus, FileText, ClipboardCheck } from "lucide-react"
import { QualityMetricsChart } from "@/components/charts/quality-metrics-chart"
import MapComponent from "@/components/maps/map-component"
import dynamic from "next/dynamic"
import { QualityTestForm } from "@/components/forms/quality-test-form"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

const Chart = dynamic(
  () => import('recharts').then((mod) => {
    const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = mod
    return function Chart({ data }: { data: any[] }) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="GCV" stroke="#8884d8" />
            <Line type="monotone" dataKey="Moisture" stroke="#82ca9d" />
            <Line type="monotone" dataKey="QualityScore" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      )
    }
  }),
  { ssr: false }
)

const mockChartData = [
  { name: 'Mon', GCV: 4100, Moisture: 8.2, QualityScore: 95 },
  { name: 'Tue', GCV: 4150, Moisture: 8.0, QualityScore: 97 },
  { name: 'Wed', GCV: 4080, Moisture: 8.4, QualityScore: 94 },
  { name: 'Thu', GCV: 4200, Moisture: 7.9, QualityScore: 98 },
  { name: 'Fri', GCV: 4120, Moisture: 8.1, QualityScore: 96 },
]

const recentActivities = [
  {
    type: 'quality_test',
    title: 'Quality Test Completed',
    description: 'Supplier: Green Pellets Inc.',
    time: '5m ago',
    status: 'success'
  },
  {
    type: 'delivery',
    title: 'New Delivery Arrived',
    description: 'Truck ID: BPT-2024-089',
    time: '15m ago',
    status: 'info'
  },
  {
    type: 'alert',
    title: 'Quality Alert',
    description: 'High moisture content detected',
    time: '1h ago',
    status: 'warning'
  }
]

const topSuppliers = [
  {
    name: 'Green Pellets Inc.',
    qualityScore: '98%',
    type: 'Premium'
  },
  {
    name: 'Bio Energy Solutions',
    qualityScore: '95%',
    type: 'Premium'
  },
  {
    name: 'EcoPellet Corp',
    qualityScore: '92%',
    type: 'Standard'
  }
]

const systemAlerts = [
  {
    title: 'Quality Threshold Violation',
    description: '3 deliveries pending review',
    action: 'Review',
    severity: 'high'
  },
  {
    title: 'Delayed Deliveries',
    description: '2 trucks running late',
    action: 'Track',
    severity: 'medium'
  },
  {
    title: 'Pending Approvals',
    description: '5 documents awaiting review',
    action: 'Process',
    severity: 'low'
  }
]

export default function Home() {
  const [showQualityTestForm, setShowQualityTestForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/10 dark:to-background">
      <div className="container py-8 px-4 mx-auto max-w-7xl">
        {/* Page Title */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Inspeqt Biofuel</h1>
          <p className="text-muted-foreground">
            Your comprehensive quality control management system for biofuel testing.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Dialog open={showQualityTestForm} onOpenChange={setShowQualityTestForm}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Quality Test
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogTitle>New Quality Test</DialogTitle>
              <QualityTestForm onSuccess={() => setShowQualityTestForm(false)} />
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Truck className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Daily Deliveries</p>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="text-2xl font-bold">48</h3>
                      <span className="text-sm text-purple-600">↑12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Flame className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average GCV</p>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="text-2xl font-bold">4,250</h3>
                      <span className="text-sm text-purple-600">↑3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Droplets className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Moisture</p>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="text-2xl font-bold">8.2%</h3>
                      <span className="text-sm text-red-600">↓2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Users className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Suppliers</p>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="text-2xl font-bold">156</h3>
                      <span className="text-sm text-purple-600">↑8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map and Quality Metrics */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Real-time Delivery Map</CardTitle>
              <Button variant="ghost" size="sm" className="text-purple-700 hover:text-purple-800 hover:bg-purple-100">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <MapComponent />
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Quality Metrics</CardTitle>
              <Button variant="ghost" size="sm" className="text-purple-700 hover:text-purple-800 hover:bg-purple-100">
                View Details
              </Button>
            </CardHeader>
            <CardContent>
              <Chart data={mockChartData} />
            </CardContent>
          </Card>
        </div>

        {/* Activities, Suppliers, and Alerts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
              <Button variant="ghost" size="sm" className="text-purple-700 hover:text-purple-800 hover:bg-purple-100">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className={`mt-0.5 rounded-full p-1 ${
                      activity.status === 'success' ? 'bg-purple-100 text-purple-600' :
                      activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.status === 'success' ? <ClipboardCheck className="h-4 w-4" /> :
                       activity.status === 'warning' ? <Bell className="h-4 w-4" /> :
                       <Truck className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">Top Suppliers</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-700 hover:text-purple-800 hover:bg-purple-100"
                onClick={() => window.location.href = '/suppliers'}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSuppliers.map((supplier, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{supplier.name}</p>
                      <p className="text-sm text-muted-foreground">Quality Score: {supplier.qualityScore}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      supplier.type === 'Premium' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {supplier.type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">System Alerts</CardTitle>
              <Button variant="ghost" size="sm" className="text-purple-700 hover:text-purple-800 hover:bg-purple-100">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`h-2 w-2 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-500' :
                          alert.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`} />
                        <p className="text-sm font-medium">{alert.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-purple-700 hover:text-purple-800 hover:bg-purple-100">
                      {alert.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
