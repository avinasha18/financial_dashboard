'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFinanceStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { BarChart3, TrendingUp, PieChart } from 'lucide-react'
import { cn } from '@/lib/utils'

export const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/transactions', label: 'Transactions', icon: TrendingUp },
  { href: '/insights', label: 'Insights', icon: PieChart },
]

interface SidebarContentProps {
  onNavigate?: () => void
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname()
  const { userRole, setUserRole } = useFinanceStore()

  return (
    <div className="h-full border-r border-border bg-background flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-baseline gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Financio
          </h1>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Finance Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-8">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={onNavigate}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                    'group relative',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className={cn(
                    'h-5 w-5 transition-transform group-hover:scale-110',
                    isActive && 'text-primary-foreground'
                  )} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                  )}
                </button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-6 space-y-6">
        {/* Role Toggle */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            View Mode
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={userRole === 'admin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setUserRole('admin')
                onNavigate?.()
              }}
              className="text-xs"
            >
              Admin
            </Button>
            <Button
              variant={userRole === 'viewer' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setUserRole('viewer')
                onNavigate?.()
              }}
              className="text-xs"
            >
              Viewer
            </Button>
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate text-foreground">Tejassri Avinasha</p>
            <p className="text-xs text-muted-foreground truncate capitalize">
              {userRole}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 md:block">
      <SidebarContent />
    </aside>
  )
}
