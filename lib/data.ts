import { Transaction } from './store'

export const CATEGORIES = [
  'Income',
  'Food',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Shopping',
  'Healthcare',
  'Education',
  'Other',
]

export const SPENDING_COLORS = {
  Food: '#3b82f6',
  Transportation: '#ef4444',
  Utilities: '#f59e0b',
  Entertainment: '#8b5cf6',
  Shopping: '#ec4899',
  Healthcare: '#06b6d4',
  Education: '#10b981',
  Income: '#22c55e',
  Other: '#6b7280',
}

export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount
  }, 0)
}

export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)
}

export function calculateTotalExpense(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)
}

export function getSpendingByCategory(
  transactions: Transaction[]
): { category: string; amount: number }[] {
  const spending: Record<string, number> = {}

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      spending[t.category] = (spending[t.category] || 0) + t.amount
    })

  return Object.entries(spending)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}

export function getMonthlyBalance(
  transactions: Transaction[],
  monthsBack: number = 6
): { month: string; income: number; expense: number }[] {
  const months: Record<string, { income: number; expense: number }> = {}

  const latestTransactionDate =
    transactions.length > 0
      ? new Date(
          Math.max(...transactions.map((t) => new Date(t.date).getTime()))
        )
      : new Date()

  for (let i = monthsBack - 1; i >= 0; i--) {
    const date = new Date(
      latestTransactionDate.getFullYear(),
      latestTransactionDate.getMonth() - i,
      1
    )
    const key = date.toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
    })
    months[key] = { income: 0, expense: 0 }
  }

  transactions.forEach((t) => {
    const key = new Date(t.date).toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
    })
    if (key in months) {
      if (t.type === 'income') {
        months[key].income += t.amount
      } else {
        months[key].expense += t.amount
      }
    }
  })

  return Object.entries(months).map(([month, data]) => ({
    month,
    ...data,
  }))
}

export function getTopSpendingCategory(
  transactions: Transaction[]
): { category: string; amount: number } | null {
  const spending = getSpendingByCategory(transactions)
  return spending.length > 0 ? spending[0] : null
}
