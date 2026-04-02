'use client'

import { useState, useEffect } from 'react'
import { useFinanceStore } from '@/lib/store'
import { useTransactionInit } from '@/lib/hooks/use-transaction-init'
import { Navbar } from '@/components/layout/navbar'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { TransactionsTable } from '@/components/transactions/table'
import { TransactionFilters } from '@/components/transactions/filters'
import { AddTransactionModal } from '@/components/transactions/add-transaction-modal'

export default function TransactionsPage() {
  useTransactionInit()
  const { transactions, userRole, globalSearchQuery, setGlobalSearchQuery } = useFinanceStore()
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const isEditable = userRole === 'admin'

  // Sync filtered transactions when store transactions change
  useEffect(() => {
    setFilteredTransactions(transactions)
  }, [transactions])

  const handleFiltered = (filtered: typeof transactions) => {
    setFilteredTransactions(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar title="Transactions" />

      <main className="px-4 pt-20 pb-10 sm:px-6 md:pl-72 lg:pr-8 lg:pt-24 lg:pb-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <Card className="border border-border/50">
            <CardContent className="px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Current mode:{' '}
                <span className="font-semibold text-foreground capitalize">{userRole}</span>
                {isEditable
                  ? ' - You can add, edit, and delete transactions.'
                  : ' - Read-only access. Switch to Admin from View Mode to manage transactions.'}
              </p>
            </CardContent>
          </Card>

          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Transactions
              </h1>
              <p className="text-base text-muted-foreground">
                Manage and track all your income and expenses
              </p>
            </div>
            {isEditable && <AddTransactionModal />}
          </div>

          {/* Filters Card */}
          <Card className="border border-border/50 overflow-hidden shadow-sm">
            <CardHeader className="pb-6 px-8 pt-8 border-b border-border/30 bg-muted/50">
              <CardTitle className="text-base font-bold text-foreground">Filter & Search</CardTitle>
              <CardDescription className="text-sm">Find transactions quickly</CardDescription>
            </CardHeader>
            <CardContent className="px-8 py-8">
              <TransactionFilters
                transactions={transactions}
                onFiltered={handleFiltered}
                externalSearchTerm={globalSearchQuery}
                onSearchTermChange={setGlobalSearchQuery}
              />
            </CardContent>
          </Card>

          {/* Table Card */}
          <Card className="border border-border/50 overflow-hidden shadow-sm">
            <CardHeader className="pb-6 px-8 pt-8 border-b border-border/30 bg-muted/50">
              <CardTitle className="text-base font-bold text-foreground">
                {filteredTransactions.length} Transaction
                {filteredTransactions.length !== 1 ? 's' : ''}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 py-0">
              <TransactionsTable
                transactions={filteredTransactions}
                isEditable={isEditable}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
