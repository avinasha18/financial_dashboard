'use client'

import { useState } from 'react'
import { Transaction } from '@/lib/store'
import { useFinanceStore } from '@/lib/store'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditTransactionModal } from './edit-transaction-modal'

interface TransactionsTableProps {
  transactions: Transaction[]
  isEditable: boolean
}

export function TransactionsTable({
  transactions,
  isEditable,
}: TransactionsTableProps) {
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const { deleteTransaction } = useFinanceStore()

  const sortedTransactions = [...transactions].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1
    if (sortBy === 'date') {
      return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime())
    }
    return multiplier * (a.amount - b.amount)
  })

  const handleSort = (key: 'date' | 'amount') => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortOrder('desc')
    }
  }

  if (sortedTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8">
        <div className="text-center space-y-2">
          <p className="text-lg text-muted-foreground font-medium">No transactions yet</p>
          {isEditable && (
            <p className="text-sm text-muted-foreground">
              Add your first transaction to get started
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-border/50 overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/50 border-b border-border/30">
          <TableRow className="hover:bg-transparent">
            <TableHead
              className="cursor-pointer hover:text-foreground px-8 py-4 font-semibold text-xs uppercase tracking-wider"
              onClick={() => handleSort('date')}
            >
              Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="px-8 py-4 font-semibold text-xs uppercase tracking-wider">
              Description
            </TableHead>
            <TableHead className="px-8 py-4 font-semibold text-xs uppercase tracking-wider">
              Category
            </TableHead>
            <TableHead className="px-8 py-4 font-semibold text-xs uppercase tracking-wider">
              Type
            </TableHead>
            <TableHead
              className="text-right cursor-pointer hover:text-foreground px-8 py-4 font-semibold text-xs uppercase tracking-wider"
              onClick={() => handleSort('amount')}
            >
              Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </TableHead>
            {isEditable && <TableHead className="text-right px-8 py-4 font-semibold text-xs uppercase tracking-wider">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              className="border-b border-border/30 hover:bg-muted/40 transition-colors"
            >
              <TableCell className="text-sm px-8 py-5 text-muted-foreground font-medium">
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell className="font-medium text-foreground px-8 py-5">
                {transaction.description}
              </TableCell>
              <TableCell className="px-8 py-5">
                <Badge variant="outline" className="text-xs font-medium">{transaction.category}</Badge>
              </TableCell>
              <TableCell className="px-8 py-5">
                <Badge
                  variant={transaction.type === 'income' ? 'default' : 'destructive'}
                  className={cn(
                    'text-xs font-semibold',
                    transaction.type === 'income'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  )}
                >
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell
                className={cn(
                  'text-right font-bold px-8 py-5',
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                )}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(transaction.amount)}
              </TableCell>
              {isEditable && (
                <TableCell className="text-right px-8 py-5">
                  <div className="flex items-center justify-end gap-1">
                    <EditTransactionModal transaction={transaction} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="px-2 py-1 h-auto text-xs rounded-lg hover:bg-muted"
                        >
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-lg">
                        <DropdownMenuItem
                          className="text-red-600 cursor-pointer focus:bg-red-50"
                          onClick={() => deleteTransaction(transaction.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
