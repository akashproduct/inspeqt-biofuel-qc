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
    totalAsh: 0,
    photos: null,
    date: new Date().toISOString().split('T')[0],
    truckId: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
            <Select
              value={formData.supplier}
              onValueChange={(value) => setFormData({ ...formData, supplier: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="punjab-biomass">Punjab Biomass Ltd</SelectItem>
                <SelectItem value="haryana-biofuels">Haryana Biofuels</SelectItem>
                <SelectItem value="delhi-green">Delhi Green Energy</SelectItem>
                <SelectItem value="rajasthan-biomass">Rajasthan Biomass Corp</SelectItem>
                <SelectItem value="ludhiana-pellets">Ludhiana Pellets Inc</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quality Parameters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Quality Parameters</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gcv">GCV (kcal/kg)</Label>
                <Input
                  id="gcv"
                  type="number"
                  placeholder="Enter GCV"
                  value={formData.gcv || ""}
                  onChange={(e) => setFormData({ ...formData, gcv: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="moisture">Moisture (%)</Label>
                <Input
                  id="moisture"
                  type="number"
                  step="0.1"
                  placeholder="Enter moisture"
                  value={formData.moisture || ""}
                  onChange={(e) => setFormData({ ...formData, moisture: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalAsh">Total Ash (%)</Label>
                <Input
                  id="totalAsh"
                  type="number"
                  step="0.1"
                  placeholder="Enter total ash"
                  value={formData.totalAsh || ""}
                  onChange={(e) => setFormData({ ...formData, totalAsh: parseFloat(e.target.value) })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Photo Evidence */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Photo Evidence</h3>
            <div className="border-2 border-dashed border-purple-200 rounded-lg p-6">
              <div className="flex flex-col items-center space-y-4">
                <Camera className="h-12 w-12 text-purple-400" />
                <div className="text-center">
                  <Label
                    htmlFor="photos"
                    className="text-sm text-purple-600 hover:text-purple-700 cursor-pointer"
                  >
                    Upload Photos
                  </Label>
                  <p className="text-sm text-gray-500">Upload up to 5 photos</p>
                </div>
                <Input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
                {formData.photos && (
                  <div className="text-sm text-purple-600">
                    {formData.photos.length} file(s) selected
                  </div>
                )}
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