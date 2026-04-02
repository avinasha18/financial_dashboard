'use client'

import { useEffect } from 'react'
import { useFinanceStore } from '@/lib/store'
import { getDefaultMockTransactions } from '@/lib/mock-transactions'

export function useTransactionInit() {
  const { transactions, setInitialTransactions } = useFinanceStore()

  useEffect(() => {
    // Initialize with mock data only on first mount if no transactions exist
    // This ensures users always have data to view, even on first visit
    if (transactions.length === 0) {
      setInitialTransactions(getDefaultMockTransactions())
    }
  }, [transactions.length, setInitialTransactions])
}
