# Finance Tracker - Project Structure

## Overview
This is a modern, scalable Finance Dashboard built with Next.js, React, Tailwind CSS, and Zustand for state management. The codebase follows best practices for organization, maintainability, and human-written code standards.

## Folder Structure

```
├── app/
│   ├── layout.tsx                 # Root layout with theme provider
│   ├── globals.css               # Global styles and design tokens
│   ├── page.tsx                  # Dashboard home page
│   ├── transactions/
│   │   └── page.tsx              # Transactions management page
│   └── insights/
│       └── page.tsx              # Analytics and insights page
│
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx           # Left navigation sidebar
│   │   └── navbar.tsx            # Top header navbar
│   ├── dashboard/
│   │   ├── summary-card.tsx      # Metric summary cards
│   │   └── charts.tsx            # Dashboard charts (balance, spending)
│   ├── transactions/
│   │   ├── table.tsx             # Transactions data table
│   │   ├── filters.tsx           # Filter and search controls
│   │   └── add-transaction-modal.tsx  # Add transaction form
│   ├── insights/
│   │   └── analytics.tsx         # Analytics cards and charts
│   └── ui/                       # shadcn/ui components
│
├── lib/
│   ├── store.ts                  # Zustand state management
│   ├── data.ts                   # Business logic and calculations
│   ├── format.ts                 # Text/number formatting utilities
│   ├── types.ts                  # TypeScript type definitions
│   ├── constants.ts              # App-wide constants
│   └── utils.ts                  # General utility functions (cn helper)
│
├── hooks/                        # Custom React hooks
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
└── tailwind.config.ts            # Tailwind CSS configuration
```

## Architecture Overview

### State Management (Zustand)
- **Location**: `lib/store.ts`
- **Purpose**: Central store for transactions, user role, and theme
- **Features**: DevTools integration, localStorage persistence
- **Usage**: Use `useFinanceStore()` hook in components

### Data & Business Logic
- **Location**: `lib/data.ts`
- **Purpose**: Pure functions for calculations (balance, spending, trends)
- **Functions**: 
  - `calculateBalance()` - Total balance from transactions
  - `calculateTotalIncome()` - Sum of all income
  - `calculateTotalExpense()` - Sum of all expenses
  - `getSpendingByCategory()` - Categorized expenses
  - `getMonthlyBalance()` - Historical data for charts
  - `getTopSpendingCategory()` - Highest spending category

### Components Organization

#### Layout Components
- `Sidebar` - Navigation and role switching
- `Navbar` - Page title, search, theme toggle

#### Dashboard Components
- `SummaryCard` - KPI metric display
- `BalanceChart` - Line chart for balance trends
- `SpendingChart` - Pie chart for category breakdown

#### Transactions Components
- `TransactionsTable` - Data grid with sorting/actions
- `TransactionFilters` - Search and filtering interface
- `AddTransactionModal` - Form for new transactions

#### Insights Components
- `AnalyticsOverview` - Key metrics cards
- `MonthlyComparisonChart` - Bar chart comparison
- `TopSpendingCard` - Highest spending category

## Key Features

### 1. Role-Based Access
- **Admin**: Can add, edit, delete transactions
- **Viewer**: Read-only access to all data
- Toggle in sidebar to switch roles

### 2. Financial Calculations
- Real-time balance calculations
- Income and expense tracking
- Savings rate computation
- Category-based spending analysis
- Monthly trend analysis

### 3. Data Visualization
- Line charts for balance trends
- Pie charts for category distribution
- Bar charts for monthly comparisons
- Responsive to all screen sizes

### 4. User Experience
- Dark/Light mode toggle
- Search and filtering
- Sorting (date, amount)
- Empty states
- Loading states
- Hover effects and transitions
- Responsive design (mobile, tablet, desktop)

### 5. Persistence
- Transactions saved to localStorage via Zustand
- Automatic state hydration on app load

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.2
- **Components**: shadcn/ui
- **State Management**: Zustand 5.0
- **Charts**: Recharts 2.15
- **Icons**: Lucide React 0.564
- **Theme**: next-themes
- **Forms**: React Hook Form
- **Validation**: Zod
- **Analytics**: Vercel Analytics

## Development Patterns

### Component Structure
Each component follows a consistent pattern:
1. 'use client' directive at top
2. Import statements organized (React, lib, components, ui, icons)
3. Type definitions
4. Component function with clear responsibilities
5. JSX with semantic HTML

### Naming Conventions
- Components: PascalCase (e.g., `SummaryCard`)
- Files: kebab-case (e.g., `summary-card.tsx`)
- Functions: camelCase (e.g., `calculateBalance`)
- Constants: UPPER_SNAKE_CASE (e.g., `SPENDING_COLORS`)
- Types: PascalCase (e.g., `Transaction`)

### Styling Guidelines
- Tailwind utility classes only
- Design tokens in `globals.css`
- Responsive prefixes (md:, lg:, etc.)
- Dark mode via next-themes
- No arbitrary values - use Tailwind scale

### State Updates
- Zustand actions for state mutations
- Components use hooks for derived state
- Props for one-way data flow
- Avoid prop drilling with global store

## Adding Features

### Adding a New Page
1. Create folder under `app/` with `page.tsx`
2. Add navigation link in `Sidebar`
3. Import and use `Sidebar` and `Navbar` components
4. Add data fetching/state hooks

### Adding a New Chart
1. Create component in `components/dashboard/`
2. Use Recharts for visualization
3. Pass transaction data as prop
4. Add to relevant page

### Adding Calculations
1. Add function to `lib/data.ts`
2. Use in components via import
3. Memoize if expensive
4. Add type definitions to `lib/types.ts`

## Styling Architecture

### Design Tokens
Located in `globals.css`:
- Primary, secondary colors
- Spacing scale (8px system)
- Typography rules
- Component variants

### Responsive Design
Mobile-first approach:
```tsx
// Example: 1 col on mobile, 2 on tablet, 4 on desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
```

## Performance Considerations

1. **Code Splitting**: Pages load only required code
2. **Component Memoization**: Prevent unnecessary re-renders
3. **Zustand DevTools**: Debug state changes
4. **Chart Optimization**: Use ResponsiveContainer for efficient rendering
5. **Data Caching**: Zustand persists state locally

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements
- CSV export functionality
- Budget alerts and notifications
- Recurring transactions
- Multi-currency support
- Advanced analytics
- Data visualization improvements
- Mobile app with React Native
