'use client'

import { useState } from 'react'
import { useFinanceStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Bell, Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarContent } from './sidebar'

interface NavbarProps {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme, userRole, globalSearchQuery, setGlobalSearchQuery } = useFinanceStore()
  const { setTheme: setSystemTheme } = useTheme()
  const notifications = [
    'Budget alert: Food spending is 12% higher this month',
    'Salary credited successfully',
    '3 transactions need category review',
  ]

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setSystemTheme(newTheme)
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md md:left-72">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Page Title */}
        <div className="flex items-center gap-3">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] p-0 sm:max-w-xs">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <SidebarContent onNavigate={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <h2 className="text-base text-muted-foreground uppercase tracking-wider font-medium">{title}</h2>
          <Badge variant={userRole === 'admin' ? 'default' : 'secondary'} className="capitalize">
            {userRole}
          </Badge>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Search */}
          <div className="relative hidden lg:flex w-72">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search transactions..."
              className="pl-11 pr-4 py-2 text-sm bg-muted border-0 rounded-lg focus:ring-2 focus:ring-primary"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
            />
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={handleThemeToggle}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Sun className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-muted rounded-lg transition-colors relative"
                aria-label="Open notifications"
              >
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] leading-4 text-center">
                  {notifications.length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((item) => (
                <DropdownMenuItem key={item} className="whitespace-normal py-2">
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
