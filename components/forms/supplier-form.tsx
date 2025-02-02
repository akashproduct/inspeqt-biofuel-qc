"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const supplierFormSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  type: z.enum(["premium", "standard"], {
    required_error: "Please select a supplier type",
  }),
  contactPerson: z.string().min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[0-9+\s-]{10,}$/, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.enum(["punjab", "haryana", "delhi", "rajasthan", "up"], {
    required_error: "Please select a state",
  }),
  pincode: z.string().regex(/^[0-9]{6}$/, "Please enter a valid 6-digit PIN code"),
  gstNumber: z.string().regex(/^[0-9A-Z]{15}$/, "Please enter a valid 15-character GST number"),
  capacity: z.number().min(1, "Capacity must be greater than 0"),
  biomassType: z.enum(["paddy-straw", "wheat-straw", "corn-stalk", "sugarcane-bagasse"], {
    required_error: "Please select a biomass type",
  }),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
})

type SupplierFormData = z.infer<typeof supplierFormSchema>

interface SupplierFormProps {
  onSuccess?: () => void
}

export function SupplierForm({ onSuccess }: SupplierFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      capacity: 0,
    },
  })

  const onSubmit = async (data: SupplierFormData) => {
    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create supplier")
      }

      const result = await response.json()
      console.log("Supplier created:", result)
      
      toast({
        title: "Success",
        description: "Supplier registered successfully",
      })

      // Reset form
      reset()
      onSuccess?.()
    } catch (error) {
      console.error("Error creating supplier:", error)
      toast({
        title: "Error",
        description: "Failed to register supplier. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-700">New Supplier Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  placeholder="Enter company name"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Supplier Type</Label>
                <Select
                  onValueChange={(value) => setValue("type", value as "premium" | "standard")}
                >
                  <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  placeholder="Enter contact person name"
                  {...register("contactPerson")}
                  className={errors.contactPerson ? "border-red-500" : ""}
                />
                {errors.contactPerson && (
                  <p className="text-sm text-red-500">{errors.contactPerson.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  {...register("phone")}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  placeholder="Enter GST number"
                  {...register("gstNumber")}
                  className={errors.gstNumber ? "border-red-500" : ""}
                />
                {errors.gstNumber && (
                  <p className="text-sm text-red-500">{errors.gstNumber.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Address</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter street address"
                  {...register("address")}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    {...register("city")}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    onValueChange={(value) => setValue("state", value as "punjab" | "haryana" | "delhi" | "rajasthan" | "up")}
                  >
                    <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="up">Uttar Pradesh</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-sm text-red-500">{errors.state.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    placeholder="Enter PIN code"
                    {...register("pincode")}
                    className={errors.pincode ? "border-red-500" : ""}
                  />
                  {errors.pincode && (
                    <p className="text-sm text-red-500">{errors.pincode.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Supply Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700">Supply Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="biomassType">Biomass Type</Label>
                <Select
                  onValueChange={(value) => setValue("biomassType", value as "paddy-straw" | "wheat-straw" | "corn-stalk" | "sugarcane-bagasse")}
                >
                  <SelectTrigger className={errors.biomassType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select biomass type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paddy-straw">Paddy Straw</SelectItem>
                    <SelectItem value="wheat-straw">Wheat Straw</SelectItem>
                    <SelectItem value="corn-stalk">Corn Stalk</SelectItem>
                    <SelectItem value="sugarcane-bagasse">Sugarcane Bagasse</SelectItem>
                  </SelectContent>
                </Select>
                {errors.biomassType && (
                  <p className="text-sm text-red-500">{errors.biomassType.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Monthly Capacity (MT)</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Enter monthly capacity"
                  {...register("capacity", { valueAsNumber: true })}
                  className={errors.capacity ? "border-red-500" : ""}
                />
                {errors.capacity && (
                  <p className="text-sm text-red-500">{errors.capacity.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Register Supplier
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 