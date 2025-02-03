"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Camera, Upload } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface QualityTestFormData {
  supplier: string
  gcv: number
  moisture: number
  fineness: number
  totalAsh: number
  photos: FileList | null
  date: string
  truckId: string
}

interface QualityTestFormProps {
  onSuccess?: () => void
}

export function QualityTestForm({ onSuccess }: QualityTestFormProps) {
  const [formData, setFormData] = useState<QualityTestFormData>({
    supplier: "",
    gcv: 0,
    moisture: 0,
    fineness: 0,
    totalAsh: 0,
    photos: null,
    date: new Date().toISOString().split('T')[0],
    truckId: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate critical parameters
    if (formData.gcv < 2800) {
      toast({
        title: "Warning",
        description: "GCV is below minimum threshold (2800)",
        variant: "destructive",
      })
    }
    
    if (formData.fineness > 5) {
      toast({
        title: "Warning",
        description: "Fineness is above maximum threshold (5%)",
        variant: "destructive",
      })
    }

    try {
      // TODO: Implement form submission
      console.log(formData)
      toast({
        title: "Success",
        description: "Quality test submitted successfully",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Error submitting quality test:", error)
      toast({
        title: "Error",
        description: "Failed to submit quality test. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, photos: e.target.files })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-700">New Quality Test</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Test Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="truckId">Truck ID</Label>
              <Input
                id="truckId"
                placeholder="Enter truck ID"
                value={formData.truckId}
                onChange={(e) => setFormData({ ...formData, truckId: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Supplier Selection */}
          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, supplier: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="green-pellets">Green Pellets Inc.</SelectItem>
                <SelectItem value="bio-energy">Bio Energy Solutions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quality Parameters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Quality Parameters</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gcv">GCV (kcal/kg)</Label>
                <Input
                  id="gcv"
                  type="number"
                  placeholder="Enter GCV value"
                  value={formData.gcv}
                  onChange={(e) => setFormData({ ...formData, gcv: parseFloat(e.target.value) })}
                  required
                  className={formData.gcv < 2800 ? "border-red-500" : ""}
                />
                {formData.gcv < 2800 && (
                  <p className="text-sm text-red-500">GCV is below minimum threshold</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="moisture">Moisture (%)</Label>
                <Input
                  id="moisture"
                  type="number"
                  step="0.1"
                  placeholder="Enter moisture content"
                  value={formData.moisture}
                  onChange={(e) => setFormData({ ...formData, moisture: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fineness">Fineness (%)</Label>
                <Input
                  id="fineness"
                  type="number"
                  step="0.1"
                  placeholder="Enter fineness value"
                  value={formData.fineness}
                  onChange={(e) => setFormData({ ...formData, fineness: parseFloat(e.target.value) })}
                  required
                  className={formData.fineness > 5 ? "border-red-500" : ""}
                />
                {formData.fineness > 5 && (
                  <p className="text-sm text-red-500">Fineness is above maximum threshold</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalAsh">Total Ash (%)</Label>
                <Input
                  id="totalAsh"
                  type="number"
                  step="0.1"
                  placeholder="Enter total ash content"
                  value={formData.totalAsh}
                  onChange={(e) => setFormData({ ...formData, totalAsh: parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Sample Photos</h3>
            <div className="grid place-items-center border-2 border-dashed rounded-lg p-4">
              <div className="text-center space-y-2">
                <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                <div className="space-y-1">
                  <Button variant="outline" onClick={() => document.getElementById('photo-upload')?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                  <input
                    id="photo-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <p className="text-sm text-muted-foreground">Upload sample photos (optional)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Submit Quality Test
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 