import type { Transaction, Asset, Debt, NetWorthSnapshot, FinancialHealthScore, AIRecommendation } from './types'

// Mock Transactions (6 months of data)
export const mockTransactions: Transaction[] = [
  // January 2024
  { id: '1', date: new Date('2024-01-02'), amount: -85.50, description: 'TESCO STORE 123', category: 'groceries', source: 'aib' },
  { id: '2', date: new Date('2024-01-03'), amount: -45.00, description: 'DUNNES STORES', category: 'groceries', source: 'aib' },
  { id: '3', date: new Date('2024-01-05'), amount: -120.00, description: 'SHELL GARAGE', category: 'transport', source: 'aib' },
  { id: '4', date: new Date('2024-01-07'), amount: -65.00, description: 'RESTAURANT XYZ', category: 'dining', source: 'revolut' },
  { id: '5', date: new Date('2024-01-10'), amount: -200.00, description: 'ATM WITHDRAWAL', category: 'cash', source: 'aib' },
  { id: '6', date: new Date('2024-01-12'), amount: -89.99, description: 'NETFLIX SUBSCRIPTION', category: 'entertainment', source: 'revolut' },
  { id: '7', date: new Date('2024-01-15'), amount: -150.00, description: 'ELECTRICITY BILL', category: 'utilities', source: 'aib' },
  { id: '8', date: new Date('2024-01-18'), amount: -75.00, description: 'PHARMACY', category: 'health', source: 'aib' },
  { id: '9', date: new Date('2024-01-20'), amount: -95.00, description: 'RESTAURANT ABC', category: 'dining', source: 'revolut' },
  { id: '10', date: new Date('2024-01-25'), amount: -180.00, description: 'SHOPPING CENTRE', category: 'shopping', source: 'aib' },
  { id: '11', date: new Date('2024-01-28'), amount: -110.00, description: 'GAS BILL', category: 'utilities', source: 'aib' },
  { id: '12', date: new Date('2024-01-30'), amount: 3500.00, description: 'SALARY', category: 'income', source: 'aib' },

  // February 2024
  { id: '13', date: new Date('2024-02-01'), amount: -90.00, description: 'TESCO STORE 123', category: 'groceries', source: 'aib' },
  { id: '14', date: new Date('2024-02-03'), amount: -55.00, description: 'DUNNES STORES', category: 'groceries', source: 'aib' },
  { id: '15', date: new Date('2024-02-05'), amount: -130.00, description: 'SHELL GARAGE', category: 'transport', source: 'aib' },
  { id: '16', date: new Date('2024-02-08'), amount: -80.00, description: 'RESTAURANT XYZ', category: 'dining', source: 'revolut' },
  { id: '17', date: new Date('2024-02-10'), amount: -250.00, description: 'ATM WITHDRAWAL', category: 'cash', source: 'aib' },
  { id: '18', date: new Date('2024-02-12'), amount: -89.99, description: 'NETFLIX SUBSCRIPTION', category: 'entertainment', source: 'revolut' },
  { id: '19', date: new Date('2024-02-15'), amount: -160.00, description: 'ELECTRICITY BILL', category: 'utilities', source: 'aib' },
  { id: '20', date: new Date('2024-02-18'), amount: -85.00, description: 'PHARMACY', category: 'health', source: 'aib' },
  { id: '21', date: new Date('2024-02-20'), amount: -100.00, description: 'RESTAURANT ABC', category: 'dining', source: 'revolut' },
  { id: '22', date: new Date('2024-02-25'), amount: -200.00, description: 'SHOPPING CENTRE', category: 'shopping', source: 'aib' },
  { id: '23', date: new Date('2024-02-28'), amount: -120.00, description: 'GAS BILL', category: 'utilities', source: 'aib' },
  { id: '24', date: new Date('2024-02-29'), amount: 3500.00, description: 'SALARY', category: 'income', source: 'aib' },

  // March 2024
  { id: '25', date: new Date('2024-03-01'), amount: -95.00, description: 'TESCO STORE 123', category: 'groceries', source: 'aib' },
  { id: '26', date: new Date('2024-03-03'), amount: -60.00, description: 'DUNNES STORES', category: 'groceries', source: 'aib' },
  { id: '27', date: new Date('2024-03-05'), amount: -140.00, description: 'SHELL GARAGE', category: 'transport', source: 'aib' },
  { id: '28', date: new Date('2024-03-08'), amount: -90.00, description: 'RESTAURANT XYZ', category: 'dining', source: 'revolut' },
  { id: '29', date: new Date('2024-03-10'), amount: -180.00, description: 'ATM WITHDRAWAL', category: 'cash', source: 'aib' },
  { id: '30', date: new Date('2024-03-12'), amount: -89.99, description: 'NETFLIX SUBSCRIPTION', category: 'entertainment', source: 'revolut' },
  { id: '31', date: new Date('2024-03-15'), amount: -170.00, description: 'ELECTRICITY BILL', category: 'utilities', source: 'aib' },
  { id: '32', date: new Date('2024-03-18'), amount: -90.00, description: 'PHARMACY', category: 'health', source: 'aib' },
  { id: '33', date: new Date('2024-03-20'), amount: -110.00, description: 'RESTAURANT ABC', category: 'dining', source: 'revolut' },
  { id: '34', date: new Date('2024-03-25'), amount: -220.00, description: 'SHOPPING CENTRE', category: 'shopping', source: 'aib' },
  { id: '35', date: new Date('2024-03-28'), amount: -130.00, description: 'GAS BILL', category: 'utilities', source: 'aib' },
  { id: '36', date: new Date('2024-03-31'), amount: 3500.00, description: 'SALARY', category: 'income', source: 'aib' },

  // April 2024
  { id: '37', date: new Date('2024-04-01'), amount: -100.00, description: 'TESCO STORE 123', category: 'groceries', source: 'aib' },
  { id: '38', date: new Date('2024-04-03'), amount: -65.00, description: 'DUNNES STORES', category: 'groceries', source: 'aib' },
  { id: '39', date: new Date('2024-04-05'), amount: -150.00, description: 'SHELL GARAGE', category: 'transport', source: 'aib' },
  { id: '40', date: new Date('2024-04-08'), amount: -95.00, description: 'RESTAURANT XYZ', category: 'dining', source: 'revolut' },
  { id: '41', date: new Date('2024-04-10'), amount: -220.00, description: 'ATM WITHDRAWAL', category: 'cash', source: 'aib' },
  { id: '42', date: new Date('2024-04-12'), amount: -89.99, description: 'NETFLIX SUBSCRIPTION', category: 'entertainment', source: 'revolut' },
  { id: '43', date: new Date('2024-04-15'), amount: -180.00, description: 'ELECTRICITY BILL', category: 'utilities', source: 'aib' },
  { id: '44', date: new Date('2024-04-18'), amount: -95.00, description: 'PHARMACY', category: 'health', source: 'aib' },
  { id: '45', date: new Date('2024-04-20'), amount: -120.00, description: 'RESTAURANT ABC', category: 'dining', source: 'revolut' },
  { id: '46', date: new Date('2024-04-25'), amount: -240.00, description: 'SHOPPING CENTRE', category: 'shopping', source: 'aib' },
  { id: '47', date: new Date('2024-04-28'), amount: -140.00, description: 'GAS BILL', category: 'utilities', source: 'aib' },
  { id: '48', date: new Date('2024-04-30'), amount: 3500.00, description: 'SALARY', category: 'income', source: 'aib' },

  // May 2024
  { id: '49', date: new Date('2024-05-01'), amount: -105.00, description: 'TESCO STORE 123', category: 'groceries', source: 'aib' },
  { id: '50', date: new Date('2024-05-03'), amount: -70.00, description: 'DUNNES STORES', category: 'groceries', source: 'aib' },
  { id: '51', date: new Date('2024-05-05'), amount: -160.00, description: 'SHELL GARAGE', category: 'transport', source: 'aib' },
  { id: '52', date: new Date('2024-05-08'), amount: -100.00, description: 'RESTAURANT XYZ', category: 'dining', source: 'revolut' },
  { id: '53', date: new Date('2024-05-10'), amount: -250.00, description: 'ATM WITHDRAWAL', category: 'cash', source: 'aib' },
  { id: '54', date: new Date('2024-05-12'), amount: -89.99, description: 'NETFLIX SUBSCRIPTION', category: 'entertainment', source: 'revolut' },
  { id: '55', date: new Date('2024-05-15'), amount: -190.00, description: 'ELECTRICITY BILL', category: 'utilities', source: 'aib' },
  { id: '56', date: new Date('2024-05-18'), amount: -100.00, description: 'PHARMACY', category: 'health', source: 'aib' },
  { id: '57', date: new Date('2024-05-20'), amount: -130.00, description: 'RESTAURANT ABC', category: 'dining', source: 'revolut' },
  { id: '58', date: new Date('2024-05-25'), amount: -260.00, description: 'SHOPPING CENTRE', category: 'shopping', source: 'aib' },
  { id: '59', date: new Date('2024-05-28'), amount: -150.00, description: 'GAS BILL', category: 'utilities', source: 'aib' },
  { id: '60', date: new Date('2024-05-31'), amount: 3500.00, description: 'SALARY', category: 'income', source: 'aib' },

  // June 2024
  { id: '61', date: new Date('2024-06-01'), amount: -110.00, description: 'TESCO STORE 123', category: 'groceries', source: 'aib' },
  { id: '62', date: new Date('2024-06-03'), amount: -75.00, description: 'DUNNES STORES', category: 'groceries', source: 'aib' },
  { id: '63', date: new Date('2024-06-05'), amount: -170.00, description: 'SHELL GARAGE', category: 'transport', source: 'aib' },
  { id: '64', date: new Date('2024-06-08'), amount: -105.00, description: 'RESTAURANT XYZ', category: 'dining', source: 'revolut' },
  { id: '65', date: new Date('2024-06-10'), amount: -280.00, description: 'ATM WITHDRAWAL', category: 'cash', source: 'aib' },
  { id: '66', date: new Date('2024-06-12'), amount: -89.99, description: 'NETFLIX SUBSCRIPTION', category: 'entertainment', source: 'revolut' },
  { id: '67', date: new Date('2024-06-15'), amount: -200.00, description: 'ELECTRICITY BILL', category: 'utilities', source: 'aib' },
  { id: '68', date: new Date('2024-06-18'), amount: -105.00, description: 'PHARMACY', category: 'health', source: 'aib' },
  { id: '69', date: new Date('2024-06-20'), amount: -140.00, description: 'RESTAURANT ABC', category: 'dining', source: 'revolut' },
  { id: '70', date: new Date('2024-06-25'), amount: -280.00, description: 'SHOPPING CENTRE', category: 'shopping', source: 'aib' },
  { id: '71', date: new Date('2024-06-28'), amount: -160.00, description: 'GAS BILL', category: 'utilities', source: 'aib' },
  { id: '72', date: new Date('2024-06-30'), amount: 3500.00, description: 'SALARY', category: 'income', source: 'aib' },
]

// Mock Assets
export const mockAssets: Asset[] = [
  { id: '1', name: 'Primary Home', value: 450000, isHomeEquity: true, date: new Date('2024-06-30') },
  { id: '2', name: 'Savings Account', value: 25000, isHomeEquity: false, date: new Date('2024-06-30') },
  { id: '3', name: 'Investment Portfolio', value: 35000, isHomeEquity: false, date: new Date('2024-06-30') },
  { id: '4', name: 'Emergency Fund', value: 15000, isHomeEquity: false, date: new Date('2024-06-30') },
  { id: '5', name: 'Car', value: 12000, isHomeEquity: false, date: new Date('2024-06-30') },
]

// Mock Debts
export const mockDebts: Debt[] = [
  { id: '1', name: 'Mortgage', balance: 320000, interestRate: 3.2, date: new Date('2024-06-30') },
  { id: '2', name: 'Car Loan', balance: 8000, interestRate: 6.2, date: new Date('2024-06-30') },
  { id: '3', name: 'Credit Card', balance: 2500, interestRate: 18.9, date: new Date('2024-06-30') },
]

// Mock Net Worth Snapshots (monthly)
export const mockNetWorthSnapshots: NetWorthSnapshot[] = [
  { date: new Date('2024-01-31'), totalAssets: 525000, liquidAssets: 75000, debts: { mortgage: 325000, other: 12000 }, totalNetWorth: 188000, liquidNetWorth: -262000 },
  { date: new Date('2024-02-29'), totalAssets: 530000, liquidAssets: 80000, debts: { mortgage: 324000, other: 11000 }, totalNetWorth: 195000, liquidNetWorth: -255000 },
  { date: new Date('2024-03-31'), totalAssets: 535000, liquidAssets: 85000, debts: { mortgage: 323000, other: 10500 }, totalNetWorth: 201500, liquidNetWorth: -248500 },
  { date: new Date('2024-04-30'), totalAssets: 540000, liquidAssets: 90000, debts: { mortgage: 322000, other: 10000 }, totalNetWorth: 208000, liquidNetWorth: -242000 },
  { date: new Date('2024-05-31'), totalAssets: 545000, liquidAssets: 95000, debts: { mortgage: 321000, other: 9500 }, totalNetWorth: 214500, liquidNetWorth: -235500 },
  { date: new Date('2024-06-30'), totalAssets: 550000, liquidAssets: 100000, debts: { mortgage: 320000, other: 9000 }, totalNetWorth: 221000, liquidNetWorth: -229000 },
]

// Mock Financial Health Score
export const mockFinancialHealthScore: FinancialHealthScore = {
  score: 69,
  savingsRate: 32,
  debtRatio: 22,
  emergencyMonths: 3,
  grade: 'needs_improvement'
}

// Mock AI Recommendations
export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'quick_win',
    title: 'Cancel Unused Subscriptions',
    description: 'You have €29/month in unused subscriptions that can be cancelled immediately',
    impact: 348,
    priority: 9,
    category: 'expense_reduction'
  },
  {
    id: '2',
    type: 'strategic',
    title: 'Refinance Car Loan',
    description: 'Current rate 6.2% vs market 4.5%. Could save €180/month',
    impact: 2160,
    priority: 8,
    category: 'debt_optimization'
  },
  {
    id: '3',
    type: 'long_term',
    title: 'Max Out Pension Contributions',
    description: 'Increase pension contributions to get €1,200/year in tax savings',
    impact: 1200,
    priority: 7,
    category: 'tax_optimization'
  },
  {
    id: '4',
    type: 'quick_win',
    title: 'Reduce Dining Out',
    description: 'Dining out increased 40% MoM. Cut back to save €200/month',
    impact: 2400,
    priority: 8,
    category: 'expense_reduction'
  },
  {
    id: '5',
    type: 'strategic',
    title: 'Automate ETF Investments',
    description: 'Set up €500/month automatic transfers to ETFs',
    impact: 6000,
    priority: 6,
    category: 'investment'
  }
]

// Helper function to get transactions by month
export const getTransactionsByMonth = (year: number, month: number): Transaction[] => {
  return mockTransactions.filter(t => 
    t.date.getFullYear() === year && t.date.getMonth() === month
  )
}

// Helper function to get current month's transactions
export const getCurrentMonthTransactions = (): Transaction[] => {
  const now = new Date()
  return getTransactionsByMonth(now.getFullYear(), now.getMonth())
}

// Helper function to calculate monthly spending by category
export const getMonthlySpendingByCategory = (year: number, month: number) => {
  const transactions = getTransactionsByMonth(year, month)
  const spending = transactions.filter(t => t.amount < 0)
  
  return spending.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount)
    return acc
  }, {} as Record<string, number>)
} 