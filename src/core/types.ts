export interface Transaction {
  id: string;               // UUIDv4
  date: Date;               // ISO8601
  amount: number;           // €, negative for expenses
  description: string;      // Raw bank text
  category: string;         // e.g. "groceries"
  source: "aib" | "revolut" | "manual";
}

export interface Asset {
  id: string;
  name: string;
  value: number;
  isHomeEquity: boolean;
  date: Date;
}

export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate?: number;
  date: Date;
}

export interface NetWorthSnapshot {
  date: Date;
  totalAssets: number;      // Including home equity
  liquidAssets: number;     // Excluding home
  debts: {
    mortgage: number;
    other: number;
  };
  totalNetWorth: number;
  liquidNetWorth: number;
}

export interface FinancialHealthScore {
  score: number;            // 0-100
  savingsRate: number;      // 0-100%
  debtRatio: number;        // 0-100%
  emergencyMonths: number;  // Months of expenses saved
  grade: "excellent" | "good" | "needs_improvement" | "poor";
}

export interface AIRecommendation {
  id: string;
  type: "quick_win" | "strategic" | "long_term";
  title: string;
  description: string;
  impact: number;           // € impact
  priority: number;         // 1-10
  category: string;
} 