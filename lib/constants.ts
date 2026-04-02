export const APP_NAME = 'Finance Tracker'
export const APP_DESCRIPTION = 'Modern finance dashboard for managing income, expenses, and insights'

export const TRANSACTION_TYPES = ['income', 'expense'] as const
export const USER_ROLES = ['admin', 'viewer'] as const

export const CURRENCY_SYMBOL = '$'
export const CURRENCY_CODE = 'USD'

export const DEFAULT_PAGE_SIZE = 50
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#22c55e',
  DANGER: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#06b6d4',
  SECONDARY: '#8b5cf6',
  MUTED: '#6b7280',
} as const

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const
