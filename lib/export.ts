import type { Transaction } from './store'

function formatDate(value: Date | string): string {
  return new Date(value).toISOString().split('T')[0]
}

function escapeCsv(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}

function triggerDownload(content: string, fileName: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function exportTransactionsToCsv(transactions: Transaction[]): void {
  const header = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map((t) => [
    formatDate(t.date),
    t.description,
    t.category,
    t.type,
    t.amount.toFixed(2),
  ])

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => escapeCsv(String(cell))).join(','))
    .join('\n')

  const dateSuffix = new Date().toISOString().split('T')[0]
  triggerDownload(csv, `transactions-${dateSuffix}.csv`, 'text/csv;charset=utf-8;')
}

export function exportTransactionsToJson(transactions: Transaction[]): void {
  const normalized = transactions.map((t) => ({
    ...t,
    date: formatDate(t.date),
  }))

  const content = JSON.stringify(normalized, null, 2)
  const dateSuffix = new Date().toISOString().split('T')[0]
  triggerDownload(content, `transactions-${dateSuffix}.json`, 'application/json;charset=utf-8;')
}
