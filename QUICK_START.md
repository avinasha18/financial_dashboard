# Quick Start Guide

## Getting Started

### 1. First Visit
- App loads with 12 default mock transactions
- Dashboard shows balance overview, charts, and metrics
- All data is ready to explore immediately

### 2. Navigation

**Three Main Pages:**
- **Dashboard** - Overview with summary cards and charts
- **Transactions** - Full transaction list with filtering
- **Insights** - Analytics with monthly comparisons

**Sidebar:**
- Click page links to navigate
- Toggle "View Mode" to switch between Admin/Viewer
- No logout/login needed (demo app)

### 3. Core Features

#### Add a Transaction
1. Go to Transactions page
2. Click "Add Transaction" button (top right)
3. Fill in: Description, Type (Income/Expense), Category, Amount
4. Click "Add Transaction"
5. See it appear instantly in the table

#### Edit a Transaction
1. Go to Transactions page
2. Find the transaction in the table
3. Click the pencil icon
4. Update any fields (including date)
5. Click "Save Changes"
6. See it update instantly

#### Delete a Transaction
1. Go to Transactions page
2. Find the transaction
3. Click the three-dot menu (right side)
4. Click "Delete"
5. See it removed instantly

#### Search & Filter
1. Go to Transactions page
2. Use the search box to find by description
3. Use dropdowns to filter by category or type
4. Filters apply instantly as you type
5. Click "Clear Filters" to reset

### 4. Role-Based Access

**Admin Mode:**
- Add, edit, delete buttons visible
- Full data manipulation capabilities
- Default on first visit

**Viewer Mode:**
- Read-only access
- No add/edit/delete buttons
- Can still view data and use filters
- Toggle in sidebar

### 5. Data Persistence

- All changes save automatically
- Data persists across page refreshes
- Each browser has independent data
- Clear localStorage to reset (in DevTools)

### 6. Dashboard Overview

**Summary Cards (4 cards):**
- Total Balance: Income - Expenses
- Total Income: Sum of all income
- Total Expenses: Sum of all expenses
- Savings Rate: (Income - Expenses) / Income %

**Charts:**
- Balance Chart: 6-month income vs expense trend
- Spending Chart: Expense breakdown by category

### 7. Insights Page

**Analytics Cards:**
- Total Income
- Total Expenses
- Net Balance

**Charts:**
- Monthly Comparison: Bar chart comparing income vs expenses
- Top Spending: Card showing highest expense category

### 8. Keyboard Shortcuts

- N/A (no custom shortcuts)
- Standard browser shortcuts work (Ctrl+F, etc.)

### 9. Tips & Tricks

**Filtering Tips:**
- Filters apply in real-time
- Multiple filters work together (AND logic)
- Search is case-insensitive
- Clear all filters to see everything again

**Editing Tips:**
- You can change the date of a transaction when editing
- All fields are validated
- Empty fields show error on submit
- Modal closes after successful save

**Navigation Tips:**
- Sidebar is fixed, doesn't disappear
- Top navbar shows current page
- Clicking page title again scrolls to top

### 10. Example Workflows

#### Workflow 1: Track New Expense
```
1. Transactions page
2. Add Transaction button
3. Description: "Coffee"
4. Category: "Food"
5. Amount: "4.50"
6. Add → See in table immediately
```

#### Workflow 2: Correct a Mistake
```
1. Transactions page
2. Find the wrong transaction
3. Click pencil icon
4. Change amount or description
5. Save → See update immediately
```

#### Workflow 3: Analyze Spending
```
1. Dashboard page
2. View Spending Chart (pie chart)
3. See which category costs most
4. Go to Transactions page
5. Filter by that category
6. Analyze individual transactions
```

#### Workflow 4: Switch Roles
```
1. Click "Viewer" in sidebar
2. Notice Add/Edit/Delete buttons disappear
3. Can still view all data
4. Click "Admin" to restore editing
```

## Common Questions

### Q: Where is my data stored?
**A:** In your browser's localStorage. Open DevTools → Storage → localStorage → search for "finance-storage"

### Q: What happens if I clear my browser data?
**A:** Your transactions will be deleted. The app will reinitialize with default mock data on next visit.

### Q: Can I export my data?
**A:** Not yet. The data is stored in localStorage as JSON and can be manually copied from DevTools.

### Q: Is there a server/backend?
**A:** No, everything runs client-side. No internet connection needed after first load.

### Q: Can I access from another device?
**A:** No, data is local to each browser. Each device/browser has independent data.

### Q: What browsers are supported?
**A:** All modern browsers (Chrome, Firefox, Safari, Edge). Requires localStorage support.

### Q: Can I undo a delete?
**A:** Not yet. Once deleted, it's gone. Be careful with delete operations.

### Q: What if I find a bug?
**A:** Check browser console (F12) for error messages. Report with description and steps to reproduce.

## Troubleshooting

### Data doesn't persist
- Check if localStorage is enabled in browser
- Try a different browser
- Clear cache and reload

### Can't add transaction
- Check all required fields are filled
- Verify amount is a positive number
- Look for error messages in console

### Buttons missing
- You're probably in Viewer mode
- Switch to Admin in sidebar
- Check role setting

### Charts not showing
- Need transactions to chart
- Add a few transactions first
- Refresh page

### Filters not working
- Make sure you're on Transactions page
- Try clearing filters first
- Refresh and try again

## Best Practices

✓ Do:
- Add multiple transactions to see charts
- Try both Admin and Viewer modes
- Use filters to find specific transactions
- Check the Insights page for analytics
- Explore each page to understand features

✗ Don't:
- Don't expect cloud sync (no backend)
- Don't expect undo/redo (irreversible)
- Don't clear browser data if you want to keep transactions
- Don't use on multiple devices expecting sync
- Don't use production data (it's a demo)

## Next Steps

1. **Explore the Dashboard**
   - See summary cards and charts
   - Understand your financial overview

2. **Add Some Transactions**
   - Create income and expense entries
   - Try different categories
   - Experiment with amounts

3. **Use Filters**
   - Search by description
   - Filter by category
   - Sort by amount or date

4. **Check Insights**
   - View analytics cards
   - See monthly comparison
   - Identify spending patterns

5. **Try Admin/Viewer**
   - Toggle between modes
   - See how UI changes
   - Understand role-based access

## Support

For questions or issues:
1. Check this guide first
2. Open browser DevTools (F12)
3. Check console for error messages
4. Refresh page and try again
5. Clear cache and localStorage if needed
