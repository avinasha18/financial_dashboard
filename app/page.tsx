'use client'

import { useFinanceStore } from '@/lib/store'
import { useTransactionInit } from '@/lib/hooks/use-transaction-init'
import { calculateBalance, calculateTotalIncome, calculateTotalExpense } from '@/lib/data'
import { Navbar } from '@/components/layout/navbar'
import { Sidebar } from '@/components/layout/sidebar'
import { SummaryCard } from '@/components/dashboard/summary-card'
import { BalanceChart, SpendingChart } from '@/components/dashboard/charts'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'

export default function Dashboard() {
  useTransactionInit()
  const { transactions } = useFinanceStore()

  const balance = calculateBalance(transactions)
  const income = calculateTotalIncome(transactions)
  const expenses = calculateTotalExpense(transactions)
  const savingsRate = income > 0 ? ((1 - expenses / income) * 100).toFixed(1) : '0.0'

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar title="Dashboard" />

      <main className="px-4 pt-20 pb-10 sm:px-6 md:pl-[19rem] lg:pr-8 lg:pt-24 lg:pb-16">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Dashboard
            </h1>
            <p className="text-base text-muted-foreground">
              Welcome back! Here&apos;s your financial overview.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              title="Total Balance"
              value={balance}
              trend={5}
              icon={<Wallet className="h-5 w-5 text-muted-foreground" />}
              isPositive={balance >= 0}
            />
            <SummaryCard
              title="Total Income"
              value={income}
              trend={8}
              icon={<TrendingUp className="h-5 w-5 text-green-600" />}
              isPositive
            />
            <SummaryCard
              title="Total Expenses"
              value={expenses}
              trend={3}
              icon={<TrendingDown className="h-5 w-5 text-red-600" />}
              isPositive={false}
            />
            <SummaryCard
              title="Savings Rate"
              value={`${savingsRate}%`}
              icon={<Wallet className="h-5 w-5 text-primary" />}
              isPositive={true}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BalanceChart transactions={transactions} />
            </div>
            <div>
              <SpendingChart transactions={transactions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
