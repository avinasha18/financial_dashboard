'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Transaction, SPENDING_COLORS, getMonthlyBalance, getSpendingByCategory } from '@/lib/data'

interface ChartsProps {
  transactions: Transaction[]
}

export function BalanceChart({ transactions }: ChartsProps) {
  const data = getMonthlyBalance(transactions)

  return (
    <Card className="border border-border/50 overflow-hidden shadow-sm">
      <CardHeader className="pb-6 px-8 pt-8 border-b border-border/30">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold text-foreground">Balance Overview</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            6-month income and expense trends
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-8 py-8">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '13px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '13px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '12px',
              }}
              formatter={(value) =>
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(value as number)
              }
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{ paddingTop: '24px' }} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#16a34a"
              strokeWidth={3}
              dot={false}
              name="Income"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#dc2626"
              strokeWidth={3}
              dot={false}
              name="Expenses"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function SpendingChart({ transactions }: ChartsProps) {
  const data = getSpendingByCategory(transactions)

  return (
    <Card className="border border-border/50 overflow-hidden shadow-sm">
      <CardHeader className="pb-6 px-8 pt-8 border-b border-border/30">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold text-foreground">Spending by Category</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Distribution of your expenses
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-8 py-8">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="45%"
                cy="50%"
                outerRadius={85}
                innerRadius={50}
                label={false}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell
                    key={`cell-${entry.category}`}
                    fill={SPENDING_COLORS[entry.category as keyof typeof SPENDING_COLORS] || '#9ca3af'}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(value as number)
                }
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-72 text-muted-foreground">
            <div className="text-center">
              <p className="text-base">No expense data available</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
