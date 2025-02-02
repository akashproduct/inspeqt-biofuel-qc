"use client"

import { useEffect, useState } from "react"
import { SupplierForm } from "@/components/forms/supplier-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Star, TrendingUp, MapPin, Phone, Mail } from "lucide-react"

interface Supplier {
  id: string
  name: string
  type: string
  rating: number
  deliveries: number
  city: string
  state: string
  phone: string
  email: string
  metrics: {
    avgGCV: number
    avgMoisture: number
    qualityScore: number
  }
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("/api/suppliers")
      const data = await response.json()
      setSuppliers(data)
    } catch (error) {
      console.error("Error fetching suppliers:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || supplier.type.toLowerCase() === typeFilter.toLowerCase()
    return matchesSearch && matchesType
  })

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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={setTypeFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {showForm ? "View Suppliers" : "Add New Supplier"}
          </Button>
        </div>

        {showForm ? (
          <SupplierForm onSuccess={() => {
            setShowForm(false)
            fetchSuppliers()
          }} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700 mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading suppliers...</p>
              </div>
            ) : filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <Card key={supplier.id} className="bg-white/50 backdrop-blur-sm border-purple-100 dark:border-purple-900/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{supplier.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            supplier.type === "premium" 
                              ? "bg-purple-100 text-purple-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {supplier.type.charAt(0).toUpperCase() + supplier.type.slice(1)}
                          </span>
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm">{supplier.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-purple-700 hover:text-purple-800 hover:bg-purple-100">
                        View Details
                      </Button>
                    </div>
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
                          <p className="font-semibold">{supplier.metrics.avgMoisture}%</p>
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

                      {/* Deliveries */}
                      <div className="flex items-center justify-between pt-4 border-t border-purple-100">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                          <span className="text-sm font-medium">Total Deliveries</span>
                        </div>
                        <span className="text-sm font-semibold">{supplier.deliveries}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No suppliers found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || typeFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Click 'Add New Supplier' to get started"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 