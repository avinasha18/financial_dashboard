import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getDefaultMockTransactions } from './mock-transactions'

export type UserRole = 'admin' | 'viewer'

export interface Transaction {
  id: string
  date: Date
  description: string
  category: string
  type: 'income' | 'expense'
  amount: number
}

interface FinanceState {
  userRole: UserRole
  transactions: Transaction[]
  theme: 'light' | 'dark'
  globalSearchQuery: string

  // Actions
  setUserRole: (role: UserRole) => void
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  setInitialTransactions: (transactions: Transaction[]) => void
  setGlobalSearchQuery: (query: string) => void
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      userRole: 'viewer',
      theme: 'light',
      globalSearchQuery: '',
      transactions: getDefaultMockTransactions(),

      setUserRole: (role) => set({ userRole: role }),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: Math.random().toString(36).substr(2, 9),
            },
            ...state.transactions,
          ],
        })),

      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      setTheme: (theme) => set({ theme }),

      setInitialTransactions: (transactions) => set({ transactions }),

      setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),
    }),
    {
      name: 'finance-storage',
      serialize: (state) =>
        JSON.stringify({
          state: {
            ...state.state,
            transactions: state.state.transactions.map((t) => ({
              ...t,
              date:
                t.date instanceof Date
                  ? t.date.toISOString()
                  : t.date,
            })),
          },
          version: state.version,
        }),
      deserialize: (str) => {
        const parsed = JSON.parse(str)
        return {
          state: {
            ...parsed.state,
            transactions: parsed.state.transactions.map(
              (t: any) => ({
                ...t,
                date: new Date(t.date),
              })
            ),
          },
          version: parsed.version,
        }
      },
    }
  )
)
