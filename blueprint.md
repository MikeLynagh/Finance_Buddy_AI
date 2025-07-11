Agentic Finance Tracker
Version 1.0

📌 Core Objectives
Automate expense tracking from AIB/Revolut CSVs

Track dual net worth (with/without home equity)

Generate financial health scores and AI-driven recommendations

Zero cloud dependency – 100% local execution

flowchart TD  
    A[CSV Input] --> B[Parser Engine]  
    B --> C[Transaction DB]  
    D[Manual Entry] --> C  
    C --> E[Net Worth Calculator]  
    E --> F[Projection Engine]  
    F --> G[AI Agent]  
    G --> H[Dashboard UI] 

   ##  project structure 

    /finance-agent  
├── /src  
│   ├── /core               # Business logic  
│   │   ├── parser.ts       # CSV parsing  
│   │   ├── calculator.ts   # Net worth math  
│   │   └── agent.ts        # DeepSeek integration  
│   ├── /ui                 # React components  
│   │   ├── Dashboard.tsx  
│   │   ├── NetWorthCard.tsx  
│   │   └── CSVImporter.tsx  
│   ├── /hooks              # Custom hooks  
│   │   ├── useTransactions.ts  
│   │   └── useNetWorth.ts  
│   └── /lib                # Utilities  
│       ├── crypto.ts       # Encryption  
│       └── sql.ts          # DB wrapper  
├── /test                   # Jest tests  
│   ├── parser.test.ts  
│   └── calculator.test.ts  
└── SPECIFICATION.md        # This file  


## Data Model 

interface Transaction {  
  id: string;               // UUIDv4  
  date: Date;               // ISO8601  
  amount: number;           // €, negative for expenses  
  description: string;      // Raw bank text  
  category: string;         // e.g. "groceries"  
  source: "aib" | "revolut" | "manual";  
}  

## Net Worth Snapshot 

interface NetWorthSnapshot {  
  date: Date;  
  totalAssets: number;      // Including home equity  
  liquidAssets: number;     // Excluding home  
  debts: {  
    mortgage: number;  
    other: number;  
  };  
}  


## Key Components 

1. CSV Parse (TDD Exampe)

// test/parser.test.ts  
test("AIB CSV parses correctly", () => {  
  const csv = `Date,Description,Amount  
  01/01/2024,"TESCO STORE 123",€-50.00`;  
  const result = parseAIB(csv);  
  expect(result[0]).toEqual({  
    date: new Date("2024-01-01"),  
    description: "TESCO STORE 123",  
    amount: -50,  
    category: "groceries"  
  });  
});  

### implementation 

// src/core/parser.ts  
export function parseAIB(csv: string): Transaction[] {  
  return csv.split('\n')  
    .slice(1) // Skip header  
    .map(line => {  
      const [date, desc, amount] = line.split(',');  
      return {  
        date: new Date(date.split('/').reverse().join('-')),  
        description: desc.replace(/"/g, ''),  
        amount: parseFloat(amount.replace('€', '')),  
        category: categorize(desc) // Uses AI fallback  
      };  
    });  
}  


2. Net Worth Calculator 

// src/core/calculator.ts  
export function calculateNetWorth(  
  assets: Asset[],  
  debts: Debt[]  
): { total: number; liquid: number } {  
  const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);  
  const liquidAssets = assets.filter(a => !a.isHomeEquity).reduce((sum, a) => sum + a.value, 0);  
  const totalDebts = debts.reduce((sum, d) => sum + d.balance, 0);  
  return {  
    total: totalAssets - totalDebts,  
    liquid: liquidAssets - totalDebts  
  };  
}  

test case, 

test("Calculates net worth without home equity", () => {  
  const assets = [  
    { name: "home", value: 300_000, isHomeEquity: true },  
    { name: "savings", value: 50_000, isHomeEquity: false }  
  ];  
  const debts = [{ name: "mortgage", balance: 200_000 }];  
  const { liquid } = calculateNetWorth(assets, debts);  
  expect(liquid).toBe(-150_000); // 50k - 200k  
});  

## UI Components 

// src/ui/CSVImporter.tsx  
export function CSVImporter() {  
  const { setTransactions } = useTransactions();  

  const handleDrop = (files: File[]) => {  
    const reader = new FileReader();  
    reader.onload = (e) => {  
      const transactions = parseAIB(e.target!.result as string);  
      setTransactions(transactions);  
    };  
    reader.readAsText(files[0]);  
  };  

  return (  
    <Card>  
      <CardHeader>  
        <CardTitle>Import Statements</CardTitle>  
      </CardHeader>  
      <CardContent>  
        <Dropzone onDrop={handleDrop} accept={{ 'text/csv': ['.csv'] }}>  
          {/* shadcn UI elements */}  
        </Dropzone>  
      </CardContent>  
    </Card>  
  );  
}  

Agentic Features 

1. Financial Health Score 

Algorithm: 

Score = (SavingsRate * 40) + (DebtToIncome * 30) + (EmergencyFund * 30)  

suggested implemntation 

// src/core/agent.ts  
export function calculateHealthScore(  
  savingsRate: number, // 0-100%  
  debtRatio: number,  // 0-100%  
  emergencyMonths: number // Months of expenses saved  
): number {  
  return Math.min(  
    100,  
    savingsRate * 0.4 +  
    (100 - debtRatio) * 0.3 +  
    Math.min(emergencyMonths, 6) * 16.67  
  );  
}  

Security 


// src/lib/sql.ts  
import { Database } from 'sql.js';  
import { encrypt, decrypt } from './crypto';  

const db = new Database(  
  decrypt(localStorage.getItem('db')!),  
  { key: process.env.DB_KEY }  
);  

// Auto-encrypt on save  
window.addEventListener('beforeunload', () => {  
  localStorage.setItem('db', encrypt(db.export()));  
});  


Memory Safety, 

function handleSensitiveData(data: string) {  
  const buffer = new TextEncoder().encode(data);  
  // ...  
  buffer.fill(0); // Zero memory after use  
}  

This file is the blueprint, You can update it to have a checklist of tasks to complete. 

Here should be the flow. Whenever a step is completed and confirmed by me, push to github repo. 

## Build Checklist

### Phase 1: Project Setup ✅
- [x] Initialize Vite + React + TypeScript project
- [x] Install core dependencies (sql.js, lucide-react, uuid)
- [x] Install development dependencies (vitest, tailwindcss, testing libraries)
- [x] Configure Tailwind CSS
- [x] Set up project structure (/src/core, /src/ui, /src/hooks, /src/lib)
- [x] Configure vitest for testing
- [x] Set up GitHub repository connection

### Phase 2: Mock Data & UI Development (NEW PRIORITY)
- [x] Create comprehensive mock financial data
- [x] Build dashboard layout and navigation
- [x] Create net worth display cards
- [x] Implement CSV importer UI component
- [ ] Create settings/configuration panel (PRIORITY)
  - [ ] Asset management forms (savings, investments, home)
  - [ ] Debt management forms (mortgage, loans, credit cards)
  - [ ] Monthly value entry interface
  - [ ] TDD: Write tests for settings components first
- [ ] Build transaction list/table component
- [ ] Add charts and visualizations
- [ ] Implement month-to-month comparison views
- [ ] Add password protection UI (mock for now)

### Phase 3: Core Logic Implementation
- [ ] CSV parser implementation (AIB/Revolut)
- [ ] Net worth calculator logic
- [ ] Transaction categorization system
- [ ] Manual transaction entry
- [ ] Cash transaction tracking

### Phase 4: AI Integration
- [ ] DeepSeek API integration
- [ ] Spending pattern analysis
- [ ] Financial health score calculation
- [ ] AI recommendation engine
- [ ] Behavioral insights generation

### Phase 5: Database & Data Persistence (MOVED LATER)
- [ ] Database setup (SQL.js with encryption)
- [ ] Password protection system (real implementation)
- [ ] Data models and TypeScript interfaces
- [ ] Local storage encryption
- [ ] Data export/import functionality
- [ ] Backup/restore features

### Phase 6: Testing & Polish
- [ ] Unit tests for all components
- [ ] Integration tests
- [ ] Performance optimization
- [ ] Error handling
- [ ] Documentation

### Phase 7: Deployment Prep
- [ ] Build optimization
- [ ] Environment variable setup
- [ ] Deployment configuration
- [ ] Final testing

## Current Status
**Phase:** 2 - Mock Data & UI Development
**Branch:** feature/settings-and-net-worth-entry
**Last Updated:** [Current Date]
**Next Step:** Create settings page with TDD approach for net worth data entry

## Development Strategy Update
**NEW APPROACH:** Build UI first with mock data → Get visual feedback → Implement core logic → Add database persistence
**TDD APPROACH:** Write tests first for each component, then implement
**SETTINGS PRIORITY:** Dedicated settings page for monthly net worth data entry
**HOME VALUE:** Default to previous month's value, minimal updates needed

## Git Commit Strategy
- Each completed checklist item gets its own commit
- Commit messages follow format: `feat: [component] - [description]`
- Example: `feat: csv-parser - implement AIB CSV parsing with tests`
- Tag major milestones with version numbers

## Rollback Points
- After each phase completion
- Before major feature additions
- Before breaking changes 