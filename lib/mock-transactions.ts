import type { Transaction } from './store'

function createDate(monthOffset: number, day: number): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + monthOffset, day)
}

export function getDefaultMockTransactions(): Transaction[] {
  return [
    { id: '1', date: createDate(-5, 2), description: 'Monthly Salary', category: 'Income', type: 'income', amount: 5200 },
    { id: '2', date: createDate(-5, 5), description: 'Freelance Dashboard Project', category: 'Income', type: 'income', amount: 900 },
    { id: '3', date: createDate(-5, 8), description: 'Apartment Rent', category: 'Other', type: 'expense', amount: 1400 },
    { id: '4', date: createDate(-5, 11), description: 'Groceries', category: 'Food', type: 'expense', amount: 290 },
    { id: '5', date: createDate(-4, 2), description: 'Monthly Salary', category: 'Income', type: 'income', amount: 5200 },
    { id: '6', date: createDate(-4, 9), description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 125 },
    { id: '7', date: createDate(-4, 13), description: 'Ride Share & Fuel', category: 'Transportation', type: 'expense', amount: 180 },
    { id: '8', date: createDate(-4, 16), description: 'Online Shopping', category: 'Shopping', type: 'expense', amount: 260 },
    { id: '9', date: createDate(-3, 2), description: 'Monthly Salary', category: 'Income', type: 'income', amount: 5400 },
    { id: '10', date: createDate(-3, 6), description: 'Performance Bonus', category: 'Income', type: 'income', amount: 1200 },
    { id: '11', date: createDate(-3, 10), description: 'Internet + Mobile', category: 'Utilities', type: 'expense', amount: 95 },
    { id: '12', date: createDate(-3, 15), description: 'Medical Checkup', category: 'Healthcare', type: 'expense', amount: 210 },
    { id: '13', date: createDate(-2, 2), description: 'Monthly Salary', category: 'Income', type: 'income', amount: 5400 },
    { id: '14', date: createDate(-2, 5), description: 'Course Subscription', category: 'Education', type: 'expense', amount: 149 },
    { id: '15', date: createDate(-2, 12), description: 'Weekend Dining', category: 'Food', type: 'expense', amount: 175 },
    { id: '16', date: createDate(-2, 21), description: 'Movie + Streaming', category: 'Entertainment', type: 'expense', amount: 88 },
    { id: '17', date: createDate(-1, 2), description: 'Monthly Salary', category: 'Income', type: 'income', amount: 5600 },
    { id: '18', date: createDate(-1, 8), description: 'Freelance Consulting', category: 'Income', type: 'income', amount: 750 },
    { id: '19', date: createDate(-1, 14), description: 'Supermarket', category: 'Food', type: 'expense', amount: 320 },
    { id: '20', date: createDate(-1, 18), description: 'Utility Bills', category: 'Utilities', type: 'expense', amount: 140 },
    { id: '21', date: createDate(0, 2), description: 'Monthly Salary', category: 'Income', type: 'income', amount: 5600 },
    { id: '22', date: createDate(0, 7), description: 'Investment Dividend', category: 'Income', type: 'income', amount: 410 },
    { id: '23', date: createDate(0, 13), description: 'Metro Card Recharge', category: 'Transportation', type: 'expense', amount: 120 },
    { id: '24', date: createDate(0, 20), description: 'Household Shopping', category: 'Shopping', type: 'expense', amount: 280 },
  ]
}
