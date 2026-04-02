'use client'

import { useFinanceStore } from '@/lib/store'
import { useTransactionInit } from '@/lib/hooks/use-transaction-init'
import { Navbar } from '@/components/layout/navbar'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AnalyticsOverview,
  MonthlyComparisonChart,
  TopSpendingCard,
} from '@/components/insights/analytics'

export default function InsightsPage() {
  useTransactionInit()
  const { transactions } = useFinanceStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar title="Insights" />

      <main className="px-4 pt-20 pb-10 sm:px-6 md:pl-72 lg:pr-8 lg:pt-24 lg:pb-16">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Insights
            </h1>
            <p className="text-base text-muted-foreground">
              Deep dive into your financial analytics
            </p>
          </div>

          {/* Analytics Overview */}
          <section>
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground">Overview</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Key financial metrics at a glance
              </p>
            </div>
            <AnalyticsOverview transactions={transactions} />
          </section>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MonthlyComparisonChart transactions={transactions} />
            </div>
            <div>
              <TopSpendingCard transactions={transactions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
