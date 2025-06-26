import type { Asset, Debt, NetWorthSnapshot } from '../core/types';

const STORAGE_KEYS = {
  ASSETS: 'finance_buddy_assets',
  DEBTS: 'finance_buddy_debts',
  NET_WORTH_SNAPSHOTS: 'finance_buddy_net_worth_snapshots',
} as const;

// Generic storage functions
function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save to localStorage (${key}):`, error);
  }
}

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch (error) {
    console.error(`Failed to load from localStorage (${key}):`, error);
  }
  return defaultValue;
}

// Asset storage
export function saveAssets(assets: Asset[]): void {
  saveToStorage(STORAGE_KEYS.ASSETS, assets);
}

export function loadAssets(): Asset[] {
  const assets = loadFromStorage<Asset[]>(STORAGE_KEYS.ASSETS, []);
  // Convert date strings back to Date objects
  return assets.map(asset => ({
    ...asset,
    date: new Date(asset.date)
  }));
}

// Debt storage
export function saveDebts(debts: Debt[]): void {
  saveToStorage(STORAGE_KEYS.DEBTS, debts);
}

export function loadDebts(): Debt[] {
  const debts = loadFromStorage<Debt[]>(STORAGE_KEYS.DEBTS, []);
  // Convert date strings back to Date objects
  return debts.map(debt => ({
    ...debt,
    date: new Date(debt.date)
  }));
}

// Net worth snapshots storage
export function saveNetWorthSnapshots(snapshots: NetWorthSnapshot[]): void {
  saveToStorage(STORAGE_KEYS.NET_WORTH_SNAPSHOTS, snapshots);
}

export function loadNetWorthSnapshots(): NetWorthSnapshot[] {
  const snapshots = loadFromStorage<NetWorthSnapshot[]>(STORAGE_KEYS.NET_WORTH_SNAPSHOTS, []);
  // Convert date strings back to Date objects
  return snapshots.map(snapshot => ({
    ...snapshot,
    date: new Date(snapshot.date)
  }));
}

// Calculate and save current net worth snapshot
export function saveCurrentNetWorthSnapshot(assets: Asset[], debts: Debt[]): void {
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const liquidAssets = assets.filter(asset => !asset.isHomeEquity).reduce((sum, asset) => sum + asset.value, 0);
  const totalDebts = debts.reduce((sum, debt) => sum + debt.balance, 0);
  
  // Separate mortgage from other debts
  const mortgageDebts = debts.filter(debt => 
    debt.name.toLowerCase().includes('mortgage') || 
    debt.name.toLowerCase().includes('home loan')
  );
  const otherDebts = debts.filter(debt => 
    !debt.name.toLowerCase().includes('mortgage') && 
    !debt.name.toLowerCase().includes('home loan')
  );
  
  const snapshot: NetWorthSnapshot = {
    date: new Date(),
    totalAssets,
    liquidAssets,
    debts: {
      mortgage: mortgageDebts.reduce((sum, debt) => sum + debt.balance, 0),
      other: otherDebts.reduce((sum, debt) => sum + debt.balance, 0)
    },
    totalNetWorth: totalAssets - totalDebts,
    liquidNetWorth: liquidAssets - totalDebts
  };

  const existingSnapshots = loadNetWorthSnapshots();
  
  // Check if we already have a snapshot for today
  const today = new Date().toDateString();
  const todaySnapshotIndex = existingSnapshots.findIndex(
    s => new Date(s.date).toDateString() === today
  );

  if (todaySnapshotIndex >= 0) {
    // Update existing snapshot for today
    existingSnapshots[todaySnapshotIndex] = snapshot;
  } else {
    // Add new snapshot
    existingSnapshots.push(snapshot);
  }

  saveNetWorthSnapshots(existingSnapshots);
}

// Clear all data (for testing/reset)
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// Export all data as JSON
export function exportData(): string {
  const data = {
    assets: loadAssets(),
    debts: loadDebts(),
    netWorthSnapshots: loadNetWorthSnapshots(),
    exportDate: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
}

// Import data from JSON
export function importData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.assets) saveAssets(data.assets);
    if (data.debts) saveDebts(data.debts);
    if (data.netWorthSnapshots) saveNetWorthSnapshots(data.netWorthSnapshots);
    
    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
} 