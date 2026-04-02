'use client'

import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactNode } from 'react'

interface SummaryCardProps {
  title: string
  value: string | number
  trend?: number
  icon: ReactNode
  isPositive?: boolean
}

export function SummaryCard({
  title,
  value,
  trend,
  icon,
  isPositive = true,
}: SummaryCardProps) {
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600'
  const trendBgColor = isPositive ? 'bg-green-50' : 'bg-red-50'
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight

  return (
    <Card className="overflow-hidden bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50">
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </CardTitle>
          </div>
          <div className="p-2.5 rounded-lg bg-muted text-muted-foreground">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-3">
          <p className="text-4xl font-bold tracking-tight text-foreground">
            {typeof value === 'number'
              ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value)
              : value}
          </p>
          {trend !== undefined && (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md ${trendBgColor} ${trendColor}`}>
              <TrendIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">{Math.abs(trend)}% {isPositive ? 'increase' : 'decrease'}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
