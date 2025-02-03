"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MapPin, Mail, Phone, Search, Plus } from "lucide-react"

const suppliers = [
  {
    id: "SUP-001",
    name: "Green Pellets Inc.",
    type: "Premium",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "+91 98765 43210",
    email: "contact@greenpellets.com",
    metrics: {
      avgGCV: "4,250 kcal/kg",
      avgMoisture: "8.2%",
      qualityScore: "98"
    }
  },
  {
    id: "SUP-002",
    name: "Bio Energy Solutions",
    type: "Premium",
    city: "Delhi",
    state: "Delhi",
    phone: "+91 98765 43211",
    email: "info@bioenergy.com",
    metrics: {
      avgGCV: "4,150 kcal/kg",
      avgMoisture: "8.5%",
      qualityScore: "95"
    }
  },
  {
    id: "SUP-003",
    name: "EcoPellet Corp",
    type: "Standard",
    city: "Bangalore",
    state: "Karnataka",
    phone: "+91 98765 43212",
    email: "support@ecopellet.com",
    metrics: {
      avgGCV: "3,950 kcal/kg",
      avgMoisture: "8.8%",
      qualityScore: "92"
    }
  }
]

export default function SuppliersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/10 dark:to-background">
      <div className="container py-8 px-4 mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">
            Manage and view all your biopellet suppliers in one place.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                className="pl-10 max-w-sm"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Supplier
            </Button>
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-semibold">{supplier.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{supplier.id}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  supplier.type === 'Premium' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {supplier.type}
                </span>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-purple-50/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Avg. GCV</p>
                      <p className="font-semibold">{supplier.metrics.avgGCV}</p>
                    </div>
                    <div className="text-center border-x border-purple-100">
                      <p className="text-sm text-muted-foreground">Moisture</p>
                      <p className="font-semibold">{supplier.metrics.avgMoisture}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Quality</p>
                      <p className="font-semibold">{supplier.metrics.qualityScore}%</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{`${supplier.city}, ${supplier.state}`}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{supplier.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{supplier.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 