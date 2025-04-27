import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface AudioChartProps {
  employeeId: number
}

const AudioChart: React.FC<AudioChartProps> = ({ employeeId }) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://hackathon-backend-szk8.onrender.com/result/audio/${employeeId}`)
        if (!response.ok) throw new Error('Ошибка при загрузке данных')
        const result = await response.json()

        // Добавляем mock даты
        const chartData = result.map((item: any, index: number) => ({
          ...item,
          date: `2025-01-${String(index + 1).padStart(2, '0')}`,
        }))

        setData(chartData)
      } catch (err: any) {
        setError(err.message || 'Ошибка при загрузке данных')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [employeeId])

  return (
    <Card className="w-full gap-4">
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle>График стресса (Аудио)</CardTitle>
        {loading && <Spinner>Загрузка данных...</Spinner>}
        {error && <div>Ошибка: {error}</div>}
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#ffc658" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default AudioChart
