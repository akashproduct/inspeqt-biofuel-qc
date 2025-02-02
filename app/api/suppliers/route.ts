import { NextResponse } from "next/server"

let suppliers = [
  {
    id: "1",
    name: "Green Pellets Inc.",
    type: "premium",
    rating: 4.8,
    deliveries: 156,
    city: "Ludhiana",
    state: "punjab",
    phone: "+91 98765 43210",
    email: "contact@greenpellets.com",
    metrics: {
      avgGCV: 4250,
      avgMoisture: 8.2,
      qualityScore: 98
    }
  },
  {
    id: "2",
    name: "Bio Energy Solutions",
    type: "premium",
    rating: 4.6,
    deliveries: 142,
    city: "Chandigarh",
    state: "punjab",
    phone: "+91 98765 43211",
    email: "info@bioenergy.com",
    metrics: {
      avgGCV: 4150,
      avgMoisture: 8.5,
      qualityScore: 95
    }
  }
]

export async function GET() {
  return NextResponse.json(suppliers)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newSupplier = {
      id: (suppliers.length + 1).toString(),
      ...data,
      rating: 0,
      deliveries: 0,
      metrics: {
        avgGCV: 0,
        avgMoisture: 0,
        qualityScore: 0
      }
    }
    suppliers.push(newSupplier)
    return NextResponse.json(newSupplier, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create supplier" },
      { status: 500 }
    )
  }
} 