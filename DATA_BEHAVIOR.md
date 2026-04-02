# Data Behavior & Persistence Documentation

## Overview

The Finance Dashboard implements a complete frontend-only CRUD system with automatic localStorage persistence using Zustand state management. All data changes are instantly persisted and survive page refreshes.

## Data Persistence Architecture

### Storage System
- **Storage Backend**: localStorage
- **Storage Key**: `finance-storage` (automatically managed by Zustand persist middleware)
- **Data Format**: JSON with custom serialization for Date objects
- **Persistence Level**: Automatic on every state change

### Initialization Flow

1. **First Visit**: 
   - Check localStorage for existing data
   - If not found, initialize with default mock data (12 transactions spanning 3 months)
   - Display data immediately

2. **Subsequent Visits**:
   - Zustand persist middleware automatically loads from localStorage
   - Data is deserialized with Date objects properly converted
   - No additional initialization needed

3. **Custom Hook - `useTransactionInit`**:
   - Used in all main pages (Dashboard, Transactions, Insights)
   - Ensures mock data is available on first visit
   - Automatically handles Date deserialization from storage

## Mock Data

Default transactions include:
- 8 diverse transactions (income, food, utilities, entertainment, shopping, healthcare)
- Spanning January to March 2024
- Categories: Income, Food, Transportation, Utilities, Entertainment, Healthcare, Shopping
- Mix of income ($5000, $1200, $2000 salary/freelance) and various expenses

## CRUD Operations

### Create - Add Transaction
```typescript
const { addTransaction } = useFinanceStore()

addTransaction({
  date: new Date(),
  description: 'Grocery Store',
  category: 'Food',
  type: 'expense',
  amount: 150,
})
```
- Automatically generates unique ID
- Instantly adds to state
- Persists to localStorage
- Updates UI immediately
- UI: Add Transaction Modal in Transactions page (Admin only)

### Read - View Transactions
- All pages subscribe to store transactions via `useFinanceStore()`
- Automatic re-render on data changes
- Supports filtering, sorting, searching
- No manual cache invalidation needed

### Update - Edit Transaction
```typescript
const { updateTransaction } = useFinanceStore()

updateTransaction(transactionId, {
  description: 'Updated description',
  amount: 200,
  // ... other fields to update
})
```
- Partial updates supported
- Instantly reflected in UI
- Persists to localStorage
- Date serialization handled automatically
- UI: Edit Modal (pencil icon, Admin only)

### Delete - Remove Transaction
```typescript
const { deleteTransaction } = useFinanceStore()

deleteTransaction(transactionId)
```
- Instantly removes from state
- Persists to localStorage
- Updates all calculated metrics (balance, income, expenses)
- UI: Delete action in dropdown menu (Admin only)

## Role-Based Behavior

### Admin Role
- Can view all transactions
- Can add new transactions
- Can edit existing transactions
- Can delete transactions
- Sees all action buttons (edit, delete)

### Viewer Role
- Can view transactions (read-only)
- Cannot add transactions (Add button hidden)
- Cannot edit transactions (Edit button hidden)
- Cannot delete transactions (Delete button hidden)
- Only sees data visualization

### Role Management
- Toggle via sidebar "View Mode" buttons
- Selection persisted in localStorage
- Affects UI conditionally via `isEditable` flag

## Data Synchronization

### Real-Time Updates
- Store state changes trigger React re-renders instantly
- All subscribed components update automatically
- No need for manual refetching

### Cross-Tab Sync
- Not implemented (localStorage is per-tab in most browsers)
- Each tab maintains independent state

### State Management
- **Library**: Zustand
- **Middleware**: persist (with custom serialization)
- **Storage Format**: JSON
- **Date Handling**: Automatic ISO string serialization/deserialization

## Data Validation

### Add Transaction
- Description: Required, non-empty
- Category: Required, must match predefined list
- Type: Required (income/expense)
- Amount: Required, positive number

### Edit Transaction
- All fields validated same as Add
- Date field added for edit (optional, defaults to today)
- Partial updates allowed

### Filtering
- Real-time filter application (no "Apply" button needed)
- Multiple filters work together (AND logic)
- Clear button resets all filters

## Storage Structure

### localStorage Entry
```json
{
  "state": {
    "userRole": "admin",
    "transactions": [
      {
        "id": "abc123",
        "date": "2024-01-15T00:00:00.000Z",
        "description": "Salary Deposit",
        "category": "Income",
        "type": "income",
        "amount": 5000
      }
    ],
    "theme": "light"
  },
  "version": 0
}
```

## Performance Considerations

- **Small Dataset**: 12+ transactions, lightweight calculations
- **No Server Calls**: Everything runs client-side
- **Instant Updates**: No loading states needed
- **No Network Latency**: Changes apply immediately
- **Storage Limit**: localStorage typically 5-10MB (not a concern for this app)

## Code Quality & Architecture

### File Structure
```
lib/
  ├── store.ts           # Zustand store with persist middleware
  ├── data.ts           # Calculation utilities
  ├── hooks/
  │   └── use-transaction-init.ts  # Initialization hook
  └── types.ts          # TypeScript interfaces
components/
  ├── transactions/
  │   ├── add-transaction-modal.tsx
  │   ├── edit-transaction-modal.tsx
  │   ├── table.tsx
  │   └── filters.tsx
  └── ...
```

### Key Features
- Clean separation of concerns (logic vs UI)
- Reusable hooks for data access
- Type-safe with full TypeScript support
- No prop drilling via Zustand hooks
- Modular, maintainable code

## Error Handling

- Form validation with console logging
- Graceful fallback to mock data if localStorage fails
- Type-safe state updates
- No unhandled promise rejections

## Testing Data

To test the application:
1. **Fresh Start**: Clear localStorage and refresh
   - App initializes with default 12 mock transactions
   
2. **Add New**: Use Add Transaction modal
   - Creates with unique ID
   - Persists on refresh
   
3. **Edit**: Click pencil icon on any transaction
   - Change fields and save
   - Persists instantly
   
4. **Delete**: Click delete from menu
   - Removes instantly
   - All metrics update automatically
   
5. **Filter**: Use search/category/type filters
   - Auto-applies while typing
   - Clear button resets

## Future Enhancement Ideas

- Multi-tab synchronization via BroadcastChannel API
- Export data as CSV
- Import from file
- Undo/Redo functionality
- Data backup to cloud
- Advanced analytics with date ranges
