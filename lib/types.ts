export type UserRole = 'admin' | 'viewer'
export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  date: Date
  description: string
  category: string
  type: TransactionType
  amount: number
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface FinanceMetrics {
  totalBalance: number
  totalIncome: number
  totalExpenses: number
  savingsRate: number
}

export interface CategorySpending {
  category: string
  amount: number
}

export interface MonthlyData {
  month: string
  income: number
  expense: number
}

export interface FilterOptions {
  searchTerm?: string
  category?: string
  type?: TransactionType
  dateFrom?: Date
  dateTo?: Date
}
