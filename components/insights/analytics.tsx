'use client'

import { Transaction } from '@/lib/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  calculateTotalIncome,
  calculateTotalExpense,
  getTopSpendingCategory,
  getMonthlyBalance,
} from '@/lib/data'

interface AnalyticsProps {
  transactions: Transaction[]
}

export function TopSpendingCard({ transactions }: AnalyticsProps) {
  const topCategory = getTopSpendingCategory(transactions)

  return (
    <Card className="border border-border/50 overflow-hidden shadow-sm">
      <CardHeader className="pb-6 px-8 pt-8 border-b border-border/30">
        <CardTitle className="text-lg font-bold text-foreground">Highest Spending</CardTitle>
      </CardHeader>
      <CardContent className="px-8 py-8">
        {topCategory ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                Category
              </p>
              <p className="text-3xl font-bold text-foreground">
                {topCategory.category}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                Total Amount
              </p>
              <p className="text-4xl font-bold text-red-600">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(topCategory.amount)}
              </p>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Total spent in this category
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No spending data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function AnalyticsOverview({ transactions }: AnalyticsProps) {
  const totalIncome = calculateTotalIncome(transactions)
  const totalExpense = calculateTotalExpense(transactions)
  const balance = totalIncome - totalExpense

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card className="border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all">
        <CardHeader className="pb-4 px-6 pt-6 border-b border-border/30">
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Income
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <p className="text-4xl font-bold text-green-600">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(totalIncome)}
          </p>
        </CardContent>
      </Card>

      <Card className="border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all">
        <CardHeader className="pb-4 px-6 pt-6 border-b border-border/30">
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <p className="text-4xl font-bold text-red-600">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(totalExpense)}
          </p>
        </CardContent>
      </Card>

      <Card className="border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all">
        <CardHeader className="pb-4 px-6 pt-6 border-b border-border/30">
          <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Net Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <p className={`text-4xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(balance)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function MonthlyComparisonChart({ transactions }: AnalyticsProps) {
  const data = getMonthlyBalance(transactions)

  return (
    <Card className="border border-border/50 overflow-hidden shadow-sm">
      <CardHeader className="pb-6 px-8 pt-8 border-b border-border/30">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold text-foreground">Monthly Comparison</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Income vs Expenses over the past 6 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-8 py-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
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
            <Bar dataKey="income" fill="#16a34a" name="Income" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expense" fill="#dc2626" name="Expenses" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
