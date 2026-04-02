'use client'

import { useEffect, useState } from 'react'
import { Transaction } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORIES } from '@/lib/data'
import { X } from 'lucide-react'

interface TransactionFiltersProps {
  transactions: Transaction[]
  onFiltered: (filtered: Transaction[]) => void
  externalSearchTerm?: string
  onSearchTermChange?: (value: string) => void
}

export function TransactionFilters({
  transactions,
  onFiltered,
  externalSearchTerm = '',
  onSearchTermChange,
}: TransactionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')

  const applyFilters = (
    search: string = searchTerm,
    category: string = selectedCategory,
    type: string = selectedType
  ) => {
    let filtered = transactions

    if (search) {
      filtered = filtered.filter((t) =>
        t.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category && category !== 'all') {
      filtered = filtered.filter((t) => t.category === category)
    }

    if (type && type !== 'all') {
      filtered = filtered.filter((t) => t.type === type)
    }

    onFiltered(filtered)
  }

  const clearFilters = () => {
    setSearchTerm('')
    onSearchTermChange?.('')
    setSelectedCategory('')
    setSelectedType('')
    onFiltered(transactions)
  }

  const hasActiveFilters =
    searchTerm || selectedCategory || selectedType

  // Auto-apply filters when any filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onSearchTermChange?.(value)
    applyFilters(value, selectedCategory, selectedType)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    applyFilters(searchTerm, value, selectedType)
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    applyFilters(searchTerm, selectedCategory, value)
  }

  useEffect(() => {
    setSearchTerm(externalSearchTerm)
    applyFilters(externalSearchTerm, selectedCategory, selectedType)
    // Sync table when top navbar search changes or data updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalSearchTerm, transactions])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder="Search description..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Category Filter */}
        <Select
          value={selectedCategory}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full md:w-auto"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}
