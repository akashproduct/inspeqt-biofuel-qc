"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const mockChartData = [
  { name: 'Mon', GCV: 4100, Moisture: 8.2, QualityScore: 95 },
  { name: 'Tue', GCV: 4200, Moisture: 8.1, QualityScore: 96 },
  { name: 'Wed', GCV: 4150, Moisture: 8.3, QualityScore: 94 },
  { name: 'Thu', GCV: 4250, Moisture: 8.0, QualityScore: 97 },
  { name: 'Fri', GCV: 4180, Moisture: 8.2, QualityScore: 95 },
  { name: 'Sat', GCV: 4220, Moisture: 8.1, QualityScore: 96 },
  { name: 'Sun', GCV: 4200, Moisture: 8.2, QualityScore: 95 },
]

export function QualityMetricsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="GCV" stroke="#8884d8" name="GCV" />
          <Line type="monotone" dataKey="Moisture" stroke="#82ca9d" name="Moisture" />
          <Line type="monotone" dataKey="QualityScore" stroke="#ffc658" name="Quality Score" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 